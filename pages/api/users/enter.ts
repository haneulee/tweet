import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "lib/server/withHandler";
import { withApiSession } from "lib/server/withSession";
import client from "lib/db";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ ok: false });

    const user = await client.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) return res.status(400).json({ ok: false });

    req.session.user = {
        id: user.id,
    };

    await req.session.save();

    return res.json({
        ok: true,
        user,
    });
}

export default withApiSession(
    withHandler({ methods: ["POST"], handler, isPrivate: false })
);
