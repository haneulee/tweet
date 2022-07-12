import { Tweet } from "@prisma/client";

export interface EnterForm {
    email?: string;
    name?: string;
}

export interface CreateForm {
    name: string;
    email: string;
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
