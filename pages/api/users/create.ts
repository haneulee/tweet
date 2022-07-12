import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "lib/server/withHandler";
import client from "lib/db";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        body: { email, name },
    } = req;
    if (!email || !name) return res.status(400).json({ ok: false });

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

    await client.user.create({
        data: {
            email,
            name,
        },
    });

    res.json({ ok: true });
}

export default withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
});
