import type { NextPage } from "next";
import Button from "components/Button";
import Input from "components/Input";
import Layout from "components/Layout";
import TextArea from "components/Textarea";
import { useForm } from "react-hook-form";
import useMutation from "lib/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { TweetForm, CreateTweetMutation } from "types";

const Upload: NextPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<TweetForm>();

    const [createTweet, { loading, data }] =
        useMutation<CreateTweetMutation>("/api/tweet");

    const onValid = async ({ title, text }: TweetForm) => {
        if (loading) return;
        createTweet({ title, text });
    };

    useEffect(() => {
        if (data?.ok) {
            router.push(`/tweet/${data.tweet.id}`);
        }
    }, [data, router]);
    return (
        <Layout canGoBack title="Create Tweet">
            <form className="space-y-4 p-4" onSubmit={handleSubmit(onValid)}>
                <Input
                    register={register("title", { required: true })}
                    required
                    label="Title"
                    name="title"
                    type="text"
                />
                <TextArea
                    register={register("text", { required: true })}
                    name="text"
                    label="Text"
                    required
                />
                <Button text={loading ? "Loading..." : "Create Tweet"} />
            </form>
        </Layout>
    );
};

export default Upload;
