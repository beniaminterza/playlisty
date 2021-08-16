import { getSession } from "next-auth/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method !== "PUT") {
        res.status(400).send({ message: "Only PUT requests allowed" });
        return;
    }

    const session = await getSession({ req });
    try {
        const hasSession = await prisma.sessions.findUnique({
            where: {
                access_token: session.accessToken,
            },
        });
        if (hasSession.length === 0) {
            res.status(401).json({
                message: "You are not allowed to use this method!",
            });
            //error
        } else {
            //get the playlist data here
            const { videoId } = req.query;
            const { note } = req.body;

            const updateVideo = await prisma.video.update({
                where: {
                    id: parseInt(videoId),
                },
                data: {
                    note: note,
                },
            });
            console.table(req.body);

            res.status(200).json({ status: "Ok" });

            return;
        }
    } catch (e) {
        res.status(500).json({ message: "Database Error" });
        return;
    }
};
