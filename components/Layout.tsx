import Link from "next/link";
import React from "react";
import { cls } from "lib/client/utils";
import { useRouter } from "next/router";

interface LayoutProps {
    title?: string;
    canGoBack?: boolean;
    hasTabBar?: boolean;
    children: React.ReactNode;
}

export default function Layout({
    title,
    canGoBack,
    hasTabBar,
    children,
}: LayoutProps) {
    const router = useRouter();
    const onClick = () => {
        router.back();
    };
    return (
        <div>
            <div className="fixed top-0 flex h-24 w-full max-w-xl items-center justify-around  border-b  px-10 text-2xl  font-medium ">
                {canGoBack ? (
                    <button onClick={onClick} className="absolute left-4">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                    </button>
                ) : null}
                {title ? (
                    <span className={cls(canGoBack ? "mx-auto" : "", "")}>
                        {title}
                    </span>
                ) : null}
            </div>
            <div className={cls("pt-40", hasTabBar ? "pb-24" : "")}>
                {children}
            </div>
            {hasTabBar ? (
                <nav className="fixed bottom-0 flex w-full max-w-xl justify-around border-t px-10 pb-5 pt-3 text-md ">
                    <Link href="/">
                        <a
                            className={cls(
                                "flex flex-col items-center space-y-2 ",
                                router.pathname === "/"
                                    ? "text-blue-400"
                                    : "transition-colors hover:text-black"
                            )}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                ></path>
                            </svg>
                            <span>홈</span>
                        </a>
                    </Link>
                    <Link href="/profile">
                        <a
                            className={cls(
                                "flex flex-col items-center space-y-2 ",
                                router.pathname === "/profile"
                                    ? "text-blue-400"
                                    : "transition-colors hover:text-black"
                            )}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                ></path>
                            </svg>
                            <span>프로필</span>
                        </a>
                    </Link>
                </nav>
            ) : null}
        </div>
    );
}
