import Layout from "components/Layout";
import Head from "next/head";

import useSWR from "swr";
import FloatingButton from "components/FloatingButton";
import TweetItem from "components/TweetItem";
import { TweetsResponse } from "types";

export default () => {
    const { data } = useSWR<TweetsResponse>("/api/tweet");

    console.log(data);

    return (
        <Layout title="Tweet" hasTabBar>
            <Head>
                <title>Tweet</title>
            </Head>
            <div className="flex flex-col space-y-5 divide-y border-b-orange-100">
                {data?.tweets?.map((tweet) => (
                    <TweetItem
                        id={tweet.id}
                        key={tweet.id}
                        title={tweet.title}
                        text={tweet.text}
                        favs={tweet._count.fav}
                    />
                ))}
                <FloatingButton href="/tweet/upload">
                    <svg
                        className="h-6 w-6"
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </FloatingButton>
            </div>
        </Layout>
    );
};
