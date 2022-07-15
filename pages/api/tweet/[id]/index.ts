import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "lib/server/withHandler";
import client from "lib/db";
import { withApiSession } from "lib/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        query: { id },
        session: { user },
    } = req;

    const tweet = await client.tweet.findUnique({
        where: {
            id: +id.toString(),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                },
            },
            answers: {
                select: {
                    answer: true,
                    id: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    answers: true,
                    fav: true,
                },
            },
        },
    });

    const isLike = Boolean(
        await client.fav.findFirst({
            where: {
                tweetId: tweet?.id,
                userId: user?.id,
            },
            select: {
                id: true,
            },
        })
    );

    res.json({
        ok: true,
        tweet,
        isLike,
    });
}

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
    })
);
