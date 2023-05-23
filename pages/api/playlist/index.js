import { getSession } from "next-auth/client";
import set from "date-fns/set";
const { PrismaClient } = require("@prisma/client");
import axios from "axios";
const apiKey = process.env.YT_KEY;
const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const { parse, end, toSeconds, pattern } = require("iso8601-duration");

const prisma = new PrismaClient();

/*
Body requirement:
    {
        playlistId:String(after list in the url)
    }
*/

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
                //get the playlist data here
                const { user_id } = hasSession;
                const getContinueWatching =
                    await prisma.$queryRaw`SELECT playlist.id, playlist.list, playlist.lastTimeWatched, playlist.title, ROUND((100 / playlist.duration) * SUM(video.timeWatched), 2) AS 'progress', video.v, COUNT(video.id) AS 'amount' FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} AND playlist.lastTimeWatched IS NOT NULL GROUP BY playlist.id ORDER BY playlist.lastTimeWatched DESC LIMIT 6`;
                const getRecentylUploaded =
                    await prisma.$queryRaw`SELECT playlist.id, playlist.list, playlist.lastTimeWatched, playlist.title, ROUND((100 / playlist.duration) * SUM(video.timeWatched), 2) AS 'progress', video.v, COUNT(video.id) AS 'amount' FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} GROUP BY playlist.id ORDER BY playlist.createdAt DESC LIMIT 6`;
                const getAll =
                    await prisma.$queryRaw`SELECT playlist.id, playlist.list, playlist.lastTimeWatched, playlist.title, ROUND((100 / playlist.duration) * SUM(video.timeWatched), 2) AS 'progress', video.v, COUNT(video.id) AS 'amount' FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} GROUP BY playlist.id ORDER BY playlist.title`;

                res.status(200).json({
                    continueWatching: getContinueWatching,
                    recentlyUploaded: getRecentylUploaded,
                    all: getAll,
                });
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Database Error" });
            return;
        }
    }

    if (req.method !== "POST") {
        res.status(400).send({ message: "Only POST requests allowed" });
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
            const { playlistId } = req.body;
            const { user_id } = hasSession;

            const findPlaylist = await prisma.playlist.findMany({
                where: {
                    list: playlistId,
                    userId: user_id,
                },
            });
            if (findPlaylist.length > 0) {
                res.status(500).json({
                    message: "This Playlist exists already",
                });
                return;
            }

            const apiData = await callApis(playlistId);

            const createPlaylist = await prisma.playlist.create({
                data: {
                    ...apiData,
                    users: {
                        connect: { id: parseInt(user_id) },
                    },
                    labelPlaylist: {
                        create: [],
                    },
                },
            });
            res.status(200).json({ id: createPlaylist.id });
            return;
        }
    } catch (e) {
        res.status(500).json({ message: "Database Error" });
        return;
    }
};

async function callApis(playlistId) {
    try {
        let videos = [];
        let lastPage = false;
        let nextPageToken = undefined;
        //loop if there are multiple pages
        let responseData;
        const responseInfo = await axios
            .get(
                `${baseApiUrl}/playlists?key=${apiKey}&id=${playlistId}&part=id,snippet&fields=items(id,snippet(title,channelId,channelTitle))`
            )
            .catch(function (error) {
                return;
            });
        let title = responseInfo.data.items[0]?.snippet.title;
        while (!lastPage) {
            const response = await axios
                .get(`${baseApiUrl}/playlistItems`, {
                    params: {
                        part: "snippet",
                        maxResults: "50",
                        playlistId: playlistId,
                        key: apiKey,
                        pageToken: nextPageToken,
                    },
                })
                .catch(function (error) {
                    return;
                });
            videos = videos.concat(response.data.items);
            responseData = response.data;

            //when there is not a next page
            if (!response.data.nextPageToken) lastPage = true;
            else nextPageToken = response.data.nextPageToken;
        }

        let requests = [];
        let fullDuration = 0;
        let videoMap = new Map();
        //iterating through all the videos and adding a request for each video to the array
        for (let i = 0; i < videos.length; i++) {
            requests.push(
                axios.get(
                    `${baseApiUrl}/videos?part=contentDetails&id=${videos[i].snippet.resourceId.videoId}&key=${apiKey}`
                )
            );
            videoMap.set(videos[i].snippet.resourceId.videoId, {
                hasWatched: false,
                createdAt: new Date(videos[i].snippet.publishedAt),
                title: videos[i].snippet.title,
                description: videos[i].snippet.description,
                v: videos[i].snippet.resourceId.videoId,
                timeWatched: 0,
            });
        }

        //waiting for all the reponses to finish
        const responseArr = await axios.all(requests);
        //sum up all the videos
        for (let i = 0; i < responseArr.length; i++) {
            //only sum up if the duration is not undefined
            if (
                responseArr[i].data.items[0]?.contentDetails.duration !==
                undefined
            ) {
                fullDuration += toSeconds(
                    parse(responseArr[i].data.items[0]?.contentDetails.duration)
                );

                videoMap.set(responseArr[i].data.items[0]?.id, {
                    ...videoMap.get(responseArr[i].data.items[0]?.id),
                    duration: toSeconds(
                        parse(
                            responseArr[i].data.items[0]?.contentDetails
                                .duration
                        )
                    ),
                });
            }
        }
        //console.log(Array.from(videoMap.values()));

        let date = set(new Date(2014, 8, 20), {
            minutes: 30,
            seconds: 2,
            hours: 0,
        });
        return {
            list: playlistId,
            duration: fullDuration,
            title: title,
            video: { create: Array.from(videoMap.values()) },
        };
    } catch (e) {
        return;
    }
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
};
