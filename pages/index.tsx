import Layout from "components/Layout";
import useMutation from "lib/client/useMutation";
import useUser from "lib/client/useUser";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import useSWR from "swr";
import FloatingButton from "components/FloatingButton";
import TweetItem from "components/TweetItem";
import { TweetsResponse } from "types";

export default () => {
    // const { user } = useUser();
    const router = useRouter();
    const [logout, { loading, data: logoutData }] =
        useMutation("/api/users/logout");
    const { data } = useSWR<TweetsResponse>("/api/tweet");

    // if (!user) return <div>Loading...</div>;
    // const onLogout = () => {
    //     if (loading) return;
    //     logout({
    //         user,
    //     });
    // };
    // useEffect(() => {
    //     if (data && data.ok) {
    //         router.push("/log-in");
    //     }
    // }, [data]);
    return (
        <Layout title="홈" hasTabBar>
            <Head>
                <title>Home</title>
            </Head>
            <div className="flex flex-col space-y-5 divide-y">
                {data?.tweets?.map((tweet) => (
                    <TweetItem
                        id={tweet.id}
                        key={tweet.id}
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
            {/* <Image src={Sample} placeholder="blur" quality={10} /> */}
        </Layout>
    );
};
