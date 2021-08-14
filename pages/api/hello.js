// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async (req, res) => {
    //check if the user is the user that he claims to be
    console.log(req.header);
    const session = await getSession({ req });
    const hasSession = await prisma.sessions.findMany({
        where: {
            AND: [
                {
                    user_id: 2,
                },
                { access_token: session.accessToken },
            ],
        },
    });
    if (hasSession.length === 0) {
        res.status(401).json({
            con: "You are not allowed to use this method!",
        });
        //error
    } else {
        //do something
        res.status(200).json({ name: "John Doe" });
    }
};
