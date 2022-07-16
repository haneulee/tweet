import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "lib/server/withHandler";
import client from "lib/db";
import { withApiSession } from "lib/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    if (req.method === "GET") {
        if (req.session.user?.id) {
            const profile = await client.user.findUnique({
                where: { id: req.session.user?.id },
                include: {
                    tweets: {
                        select: {
                            id: true,
                            title: true,
                            text: true,
                            _count: {
                                select: {
                                    fav: true,
                                    answers: true,
                                },
                            },
                        },
                    },
                    fav: {
                        include: {
                            tweet: {
                                select: {
                                    id: true,
                                    title: true,
                                    text: true,
                                    _count: {
                                        select: {
                                            fav: true,
                                            answers: true,
                                        },
                                    },
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    answers: {
                        select: {
                            answer: true,
                            tweetId: true,
                            createdAt: true,
                        },
                    },
                },
            });
            res.json({
                ok: true,
                profile,
            });
        } else {
            return res.json({
                ok: false,
                error: "No Session Users",
            });
        }
    }
    if (req.method === "POST") {
        const {
            session: { user },
            body: { email, password, name },
        } = req;
        const currentUser = await client.user.findUnique({
            where: {
                id: user?.id,
            },
        });
        if (email && email !== currentUser?.email) {
            const alreadyExists = Boolean(
                await client.user.findUnique({
                    where: {
                        email,
                    },
                    select: {
                        id: true,
                    },
                })
            );
            if (alreadyExists) {
                return res.json({
                    ok: false,
                    error: "Email already taken.",
                });
            }
            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    email,
                },
            });
        }
        if (name) {
            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    name,
                },
            });
        }
        if (password) {
            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    avatar: password,
                },
            });
        }
        res.json({ ok: true });
    }
}

export default withApiSession(
    withHandler({
        methods: ["GET", "POST"],
        handler,
    })
);
