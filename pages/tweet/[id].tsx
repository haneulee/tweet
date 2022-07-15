import type { NextPage } from "next";
import Link from "next/link";
import Layout from "components/Layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { AnswerForm, AnswerResponse, TweetItemResponse } from "types";
import TextArea from "components/Textarea";
import { useForm } from "react-hook-form";
import { cls } from "lib/client/utils";
import useMutation from "lib/client/useMutation";
import { useEffect } from "react";
import moment from "moment";

const TweetDetail: NextPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AnswerForm>();
    const [sendAnswer, { data: answerData, loading: answerLoading }] =
        useMutation<AnswerResponse>(`/api/tweet/${router.query.id}/answers`);
    const { data, mutate: boundMutate } = useSWR<TweetItemResponse>(
        router.query.id ? `/api/tweet/${router.query.id}` : null
    );
    const onValid = (form: AnswerForm) => {
        if (answerLoading) return;
        sendAnswer(form);
    };

    const [toggleFav] = useMutation(`/api/tweet/${router.query.id}/fav`);
    const onFavClick = () => {
        if (!data) return;
        boundMutate((prev) => prev && { ...prev, isLike: !prev.isLike }, false);
        toggleFav({});
    };

    useEffect(() => {
        if (answerData && answerData.ok) {
            reset();
            boundMutate();
        }
    }, [answerData, reset, boundMutate]);

    return (
        <Layout title="View Tweet" canGoBack>
            <div>
                <div className="mb-3 flex cursor-pointer items-center justify-between space-x-3  border-b px-4 pb-3">
                    <div className="flex">
                        <div className="h-10 w-10 rounded-full bg-slate-300 mr-5" />
                        <div>
                            <p className="text-sm font-medium ">
                                {data?.tweet.user.name}
                            </p>
                            <Link
                                href={`/users/profile/${data?.tweet?.user?.id}`}
                            >
                                <a className="text-xs font-medium ">
                                    View profile &rarr;
                                </a>
                            </Link>
                        </div>
                    </div>
                    <button
                        onClick={onFavClick}
                        className={cls(
                            "flex items-center justify-center rounded-md p-3",
                            data?.isLike
                                ? "text-red-500  hover:text-red-600"
                                : "text-white  hover:text-black"
                        )}
                    >
                        {data?.isLike ? (
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6 "
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <div>
                    <div className="mt-2 px-4 ">
                        <p className="font-medium text-xl text-blue-500 ">
                            {data?.tweet?.title}
                        </p>
                        <p>{data?.tweet?.text}</p>
                    </div>
                    <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5  ">
                        <span className="flex items-center space-x-2 text-sm">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                ></path>
                            </svg>
                            <span>답변 {data?.tweet._count.answers}</span>
                        </span>
                    </div>
                </div>
                <div className="my-5 space-y-5 px-4">
                    {data?.tweet.answers.map((answer) => (
                        <div
                            key={answer.id}
                            className="flex items-start space-x-3"
                        >
                            <div className="h-8 w-8 rounded-full bg-slate-200" />
                            <div>
                                <span className="block text-sm font-medium ">
                                    {answer.user.name}
                                </span>
                                <span className="block text-xs  ">
                                    {moment(answer.createdAt).format(
                                        "MMMM DD,  YYYY"
                                    )}
                                </span>
                                <p className="mt-2 ">{answer.answer} </p>
                            </div>
                        </div>
                    ))}
                </div>
                <form className="px-4" onSubmit={handleSubmit(onValid)}>
                    <TextArea
                        name="description"
                        placeholder="Answer this question!"
                        required
                        register={register("answer", {
                            required: {
                                value: true,
                                message: "답변을 입력해주세요!",
                            },
                            minLength: {
                                value: 5,
                                message: "최소 5자 이상 입력해주세요!",
                            },
                        })}
                    />
                    {errors?.answer?.message}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
                    >
                        {answerLoading ? "Loading..." : "Reply"}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default TweetDetail;
