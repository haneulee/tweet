import Link from "next/link";

interface ItemProps {
    id: number;
    title: string;
    text: string;
    favs: number;
}

export default function TweetItem({ title, text, favs, id }: ItemProps) {
    return (
        <Link href={`/tweet/${id}`}>
            <a className="flex cursor-pointer justify-between px-4 p-5 border rounded-md border-white">
                <div className="flex space-x-4">
                    <div className="flex flex-col pt-2">
                        <h3 className="text-md font-medium ">{title}</h3>
                        <p>{text}</p>
                    </div>
                </div>
                <div className="flex items-end justify-end space-x-2">
                    <div className="flex items-center space-x-0.5 text-md text-white">
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
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                        <span>{favs}</span>
                    </div>
                </div>
            </a>
        </Link>
    );
}
