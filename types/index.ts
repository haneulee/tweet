import { Answer, Tweet, User } from "@prisma/client";

export interface EnterForm {
    email: string;
    password: string;
}

export interface CreateForm {
    name: string;
    email: string;
    password: string;
}

export interface TweetForm {
    title: string;
    text: string;
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

export interface CreateTweetMutation extends MutationResult {
    tweet: Tweet;
}

interface AnswerWithUser extends Answer {
    user: User;
}

interface TweetWithUser extends Tweet {
    user: User;
    _count: {
        favs: number;
        answers: number;
    };
    answers: AnswerWithUser[];
}

export interface TweetItemResponse extends MutationResult {
    tweet: TweetWithUser;
    isLike: boolean;
}

export interface AnswerForm {
    answer: string;
}

export interface AnswerResponse {
    ok: boolean;
    response: Answer;
}
