import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { UserResponse } from "types";

export default function useUser() {
    const { data, error, mutate } = useSWR<UserResponse>("api/users/me");
    const router = useRouter();

    useEffect(() => {
        if (data && !data.ok) {
            router.replace("/log-in");
        }
        if (data && data.ok && router.pathname === "/log-in") {
            router.replace("/");
        }
    }, [data]);

    return {
        user: data?.profile,
        isLoading: !error && !data,
        mutateUser: mutate,
    };
}
