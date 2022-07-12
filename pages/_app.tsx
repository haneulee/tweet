import useUser from "lib/client/useUser";
import { SWRConfig } from "swr";
import "../styles/globals.css";

function CustomUser() {
    const { user } = useUser();
    return null;
}

export default function App({ Component, pageProps }: any) {
    return (
        <SWRConfig
            value={{
                fetcher: (url: string) =>
                    fetch(url).then((response) => response.json()),
            }}
        >
            <div className="mx-auto w-full max-w-xl">
                <CustomUser />
                <Component {...pageProps} />
            </div>
        </SWRConfig>
    );
}
