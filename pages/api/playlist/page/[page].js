import { getSession } from "next-auth/client";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () {
    return this.toString();
};

export default async (req, res) => {
    if (req.method === "GET") {
        const session = await getSession({ req });
        const { page } = req.query;
        const elementPerPage = 12;
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
                const { user_id } = hasSession;
                const getAll =
                    await prisma.$queryRaw`SELECT playlist.id, playlist.list, playlist.lastTimeWatched, playlist.title, ROUND((100 / playlist.duration) * SUM(video.timeWatched), 2) AS 'progress', video.v, COUNT(video.id) AS 'amount' FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} GROUP BY playlist.id ORDER BY playlist.title LIMIT 6 OFFSET ${
                        page * elementPerPage
                    }`;

                res.status(200).json(getAll);
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Database Error" });
            return;
        }
    }
};
