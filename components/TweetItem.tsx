import Image from "next/image";
import Link from "next/link";
import Like from "public/like.svg";
import Answer from "public/answer.svg";
import Tweet from "public/tweet.svg";

interface ItemProps {
    id: number;
    title: string;
    text: string;
    favs: number;
    answers: number;
    userName: string;
    userEmail: string;
}

export default function TweetItem({
    title,
    text,
    favs,
    answers,
    id,
    userName,
    userEmail,
}: ItemProps) {
    return (
        <Link href={`/tweet/${id}`}>
            <a className="flex-col cursor-pointer justify-between px-4 p-5 border rounded-md border-white">
                <div className="flex space-x-4">
                    <div className="flex flex-col items-start">
                        <div className="h-8 w-8 justify-center flex mb-2">
                            <Image src={Tweet} width={"100%"} />
                        </div>
                        <h3 className="text-sm font-medium ">{userName}</h3>
                        <p className="text-xs">{userEmail}</p>
                    </div>
                    <div className="flex flex-col h-full ">
                        <h3 className="text-2xl font-medium pb-1">{title}</h3>
                        <p>{text}</p>
                        <div className="flex ">
                            <div className="flex items-center text-md text-white">
                                <div className="flex h-10 w-10 items-center justify-center ">
                                    <Image src={Answer} width={"100%"} />
                                </div>
                                <span>{answers}</span>
                            </div>
                            <div className="flex items-center text-md text-white">
                                <div className="flex h-10 w-10 items-center justify-center ">
                                    <Image src={Like} width={"100%"} />
                                </div>
                                <span>{favs}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
}
