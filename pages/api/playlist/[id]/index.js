import { getSession } from "next-auth/client";
import playlist from "..";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/*
 */

export default async (req, res) => {
    if (req.method === "GET") {
        const session = await getSession({ req });
        const { id } = req.query;
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
                const { user_id } = hasSession;
                const getVideos = await prisma.$queryRaw(
                    `SELECT video.v, video.description, video.hasWatched, video.duration, video.title FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} AND playlist.id = ${id}`
                );
                const getPlaylist = await prisma.$queryRaw(
                    `SELECT playlist.title,(100 / playlist.duration) * SUM(video.timeWatched) AS 'progress', playlist.duration FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} AND playlist.id = ${id}`
                );
                res.status(200).json({
                    info: getPlaylist[0],
                    videos: getVideos,
                });
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Database Error" });
            return;
        }
    } else if (req.method === "PUT") {
        const session = await getSession({ req });
        const { id } = req.query;
        const { title, color } = req.body;
        console.log(title, color);
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
                const updateLabel = await prisma.playlist.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        labelplaylist: {
                            create: [
                                {
                                    label: {
                                        connectOrCreate: {
                                            where: { title: title },
                                            create: {
                                                title: title,
                                                color: color,
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                });
                console.log(updateLabel);

                res.status(200).json({
                    message: "OK",
                });
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Database Error" });
            return;
        }
    } else if (req.method === "DELETE") {
        const session = await getSession({ req });
        const { id } = req.query;
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
                const deletePlaylist = await prisma.$queryRaw(
                    `DELETE FROM playlist WHERE playlist.id = ${id}`
                );
                console.log(deletePlaylist);
                res.status(200).json({
                    message: "Ok",
                });
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Database Error" });
            return;
        }
    }
};
