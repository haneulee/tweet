import { Tweet } from "@prisma/client";

export interface EnterForm {
    email: string;
    password: string;
}

export interface CreateForm {
    name: string;
    email: string;
    password: string;
}

export interface MutationResult {
    ok: boolean;
}

interface TweetWithCount extends Tweet {
    _count: {
        fav: number;
    };
}

export interface TweetsResponse extends MutationResult {
    tweets: TweetWithCount[];
}
