import { getSession } from "next-auth/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method === "GET") {
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
                const { labels } = req.query;
                const labelsArray = JSON.parse(labels);
                //get the playlist data here
                const { user_id } = hasSession;

                const getPlaylists = await prisma.$queryRaw(
                    `SELECT playlist.id, playlist.list, playlist.lastTimeWatched, playlist.title, ROUND((100 / playlist.duration) * SUM(video.timeWatched), 2) AS 'progress', video.v, COUNT(video.id) AS 'amount' FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.id IN (SELECT playlist.id FROM playlist JOIN labelplaylist ON labelplaylist.playlistId = playlist.id JOIN label ON labelplaylist.labelId = label.title WHERE playlist.userId = ${user_id} AND label.title IN (${arrayToSqlSyntax(
                        labelsArray
                    )}) GROUP BY playlist.id HAVING COUNT(*) = ${
                        labelsArray.length
                    }) GROUP BY playlist.id`
                );

                res.status(200).json(getPlaylists);
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Database Error" });
            return;
        }
    }
};

function arrayToSqlSyntax(array) {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        string += "'" + array[i] + "'";
        if (i !== array.length - 1) {
            string += ", ";
        }
    }
    return string;
}
