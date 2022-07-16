import type { NextPage } from "next";
import Link from "next/link";
import Layout from "components/Layout";
import useUser from "lib/client/useUser";
import Image from "next/image";
import UserImg from "public/user.svg";
import Tweet from "public/tweet.svg";
import Like from "public/like.svg";
import Answer from "public/answer.svg";
import TweetItem from "components/TweetItem";
import moment from "moment";

const Profile: NextPage = () => {
    const { user } = useUser();
    console.log(user);
    return (
        <Layout hasTabBar title="Profile">
            <div className=" pb-10">
                <div className="mt-4 flex items-center space-x-3 ">
                    <div className="h-14 w-14 justify-center flex">
                        <Image src={UserImg} width={"100%"} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">{user?.name}</span>
                        <Link href="/profile/edit">
                            <a className="text-sm">Edit profile &rarr;</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex  items-center border-b">
                <div className="flex  h-12 w-12 items-center justify-center text-white">
                    <Image src={Tweet} width={"100%"} />
                </div>
                <span className="text-md font-medium pl-2">My tweets</span>
            </div>
            <div className="flex flex-col space-y-5 divide-y border-b-blue-100 m-5">
                {user?.tweets.map((tweet) => (
                    <TweetItem
                        id={tweet.id}
                        key={tweet.id}
                        title={tweet.title}
                        text={tweet.text}
                        favs={tweet._count.fav}
                        answers={tweet._count.answers}
                        userName={user.name}
                        userEmail={user.email || ""}
                    />
                ))}
            </div>
            <div className="flex items-center border-b">
                <div className="flex h-12 w-12 items-center justify-center text-white">
                    <Image src={Like} width={"100%"} />
                </div>
                <span className="text-md font-medium pl-2">Favorites</span>
            </div>
            <div className="flex flex-col space-y-5 divide-y border-b-blue-100 m-5">
                {user?.fav.map((fav) => (
                    <TweetItem
                        id={fav.tweet.id}
                        key={fav.tweet.id}
                        title={fav.tweet.title}
                        text={fav.tweet.text}
                        favs={fav.tweet._count.fav}
                        answers={fav.tweet._count.answers}
                        userName={fav.tweet.user.name}
                        userEmail={fav.tweet.user.email || ""}
                    />
                ))}
            </div>
            <div className="flex items-center border-b">
                <div className="flex h-12 w-12 items-center justify-center text-white">
                    <Image src={Answer} width={"100%"} />
                </div>
                <span className="text-md font-medium pl-2">Answers</span>
            </div>
            <div className="flex flex-col space-y-5 divide-y border-b-blue-100 m-5">
                {user?.answers.map((answer) => (
                    <Link href={`/tweet/${answer.tweetId}`}>
                        <a className="flex-col cursor-pointer justify-between p-2 border-none ">
                            <div className="flex flex-col ">
                                <p className="text-xs">
                                    {moment(answer.createdAt).format(
                                        "MMMM DD, YYYY"
                                    )}
                                </p>
                                <h3 className="text-sm font-medium">
                                    {answer.answer}
                                </h3>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>
    );
};

export default Profile;
