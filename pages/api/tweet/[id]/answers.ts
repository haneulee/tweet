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
        body: { answer },
    } = req;

    const newAnswer = await client.answer.create({
        data: {
            user: {
                connect: {
                    id: user?.id,
                },
            },
            tweet: {
                connect: {
                    id: +id.toString(),
                },
            },
            answer,
        },
    });
    res.json({
        ok: true,
        answer: newAnswer,
    });
}

export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler,
    })
);
