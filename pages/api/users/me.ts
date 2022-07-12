import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "lib/server/withHandler";
import client from "lib/db";
import { withApiSession } from "lib/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    if (req.session.user?.id) {
        const profile = await client.user.findUnique({
            where: { id: req.session.user?.id },
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

export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
    })
);
