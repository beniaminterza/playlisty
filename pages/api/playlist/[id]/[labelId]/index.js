import { getSession } from "next-auth/client";
import playlist from "..";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method === "DELETE") {
        const session = await getSession({ req });
        const { id, labelId } = req.query;
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
                const deleteRelation = await prisma.labelplaylist.delete({
                    where: {
                        playlistId_labelId: {
                            playlistId: parseInt(id),
                            labelId: labelId,
                        },
                    },
                });
                console.log(deleteRelation);

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
    }
};
