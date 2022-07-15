import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "lib/server/withHandler";
import { withApiSession } from "lib/server/withSession";
import client from "lib/db";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ ok: false });

    const user = await client.user.findUnique({
        where: {
            email,
        },
    });

    if (!user)
        return res.json({
            ok: false,
            error: "해당 이메일 계정이 없습니다. 새로 가입해주세요.",
        });
    if (user.password !== password)
        return res.json({
            ok: false,
            error: "패스워드가 일치하지 않습니다.",
        });

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
