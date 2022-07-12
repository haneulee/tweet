import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "lib/server/withHandler";
import { withApiSession } from "lib/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    await req.session.destroy();

    return res.json({
        ok: true,
    });
}

export default withApiSession(
    withHandler({ methods: ["POST"], handler, isPrivate: false })
);
