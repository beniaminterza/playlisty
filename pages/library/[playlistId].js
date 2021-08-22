import {
    BookmarkIcon,
    CheckIcon,
    FolderRemoveIcon,
} from "@heroicons/react/outline";
import { useState, useEffect, useRef } from "react";
import HorizontalLine from "../../components/HorizontalLine";
import Label from "../../components/Label";
import ProgressBar from "../../components/ProgressBar";
import VideoElement from "../../components/VideoElement";
import AddLabel from "../../components/AddLabel";
import NewLabel from "../../components/NewLabel";
import { getSession } from "next-auth/client";
import Layout from "../../components/Layout";
import moment from "moment";
import { PrismaClient } from "@prisma/client";
import YouTube from "react-youtube";
import axios from "axios";
import { MinusSmIcon } from "@heroicons/react/solid";
import dynamic from "next/dynamic";
import Delete from "../../components/Delete";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const interval = 30;
const timeoutTime = 60;
let updateTimeout;
let typingTimeout;
let changeNoteTimeout;

function Playlist({
    session,
    info,
    getVideos,
    allLabels,
    playlistLabels,
    playlistId,
    index,
}) {
    const [showAddLabel, setShowAddLabel] = useState(false);
    const [showNewLabel, setShowNewLabel] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [videos, setVideos] = useState(getVideos);
    const [curVideo, setCurVideo] = useState("");
    const [videoInfo, setVideoInfo] = useState({});

    const [curVideoPos, setCurVideoPos] = useState(index);

    const [allLabelsState, setAllLabels] = useState(allLabels);
    const [playlistLabelsState, setPlaylistLabels] = useState(playlistLabels);

    const [showDescription, setShowDescription] = useState(false);

    const [startedVideo, setStartedVideo] = useState(false);
    const [lastStoredTime, setLastStoredTime] = useState(
        getVideos[index].timeWatched
    );

    const [notes, setNotes] = useState("");
    const [typing, setTyping] = useState(false);

    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, getVideos.length);
    }, []);

    useEffect(() => {
        itemsRef.current[curVideoPos]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });

        changeNoteTimeout = setTimeout(() => {
            clearTimeout(typingTimeout);
        }, 1000);
        setStartedVideo(false);
        setNotes(
            videos[curVideoPos].note === null ? "" : videos[curVideoPos].note
        );
        setLastStoredTime(videos[curVideoPos].timeWatched);
        clearTimeout(updateTimeout);
        if (typing) {
            clearTimeout(typingTimeout);
            setTyping(false);
        }
    }, [curVideoPos]);

    function writeNoteHandler(value) {
        setNotes(value);
        let array = [...videos];
        array[curVideoPos].note = value;
        setVideos(array);
        if (typing) {
            clearTimeout(typingTimeout);
        } else {
            setTyping(true);
        }

        typingTimeout = setTimeout(() => {
            //Is saving the note the after 2 seconds after typing
            console.log("Update in Database");
            updateNoteInDatabase();
            setTyping(false);
        }, 2000);
    }

    function updateNoteInDatabase() {
        axios
            .put(`/api/video/${videos[curVideoPos].id}/note`, { note: notes })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function nextVideo() {
        updateWatchedTime();
        if (typing) {
            clearTimeout(typingTimeout);
            setTyping(false);
            updateNoteInDatabase();
        }
        if (curVideoPos < videos.length - 1) {
            setCurVideoPos((pos) => pos + 1);
        }
    }

    function onPlayHandler(e) {
        if (updateTimeout) clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            updateWatchedTime(e.target.getCurrentTime());
        }, timeoutTime * 1000);

        if (!startedVideo) {
            setStartedVideo(true);
            e.target.seekTo(videos[curVideoPos].timeWatched);
        }
    }

    function onPauseHandler(e) {
        const curTime = e.target.getCurrentTime();
        updateWatchedTime(curTime);
        clearTimeout(updateTimeout);
    }

    function updateWatchedTime(curTime, isEnd) {
        if (isEnd) {
            let array = [...videos];
            let duration = array[curVideoPos].duration;
            array[curVideoPos] = {
                ...array[curVideoPos],
                timeWatched: duration,
                hasWatched: true,
            };
            setVideos(array);
            if (Math.abs(lastStoredTime - curTime) > interval) {
                setLastStoredTime(curTime);
                axios
                    .post(`/api/video/${videos[curVideoPos].id}`, {
                        duration: duration,
                        hasWatched: true,
                    })
                    .then((res) => {
                        console.log(res.data);
                    });
            }
        } else {
            let array = [...videos];
            array[curVideoPos] = {
                ...array[curVideoPos],
                timeWatched: curTime,
                hasWatched: !videos[curVideoPos].hasWatched
                    ? videos[curVideoPos].duration - curTime < 60
                    : true,
            };
            setVideos(array);
            if (Math.abs(lastStoredTime - curTime) > interval) {
                setLastStoredTime(curTime);
                axios
                    .post(`/api/video/${videos[curVideoPos].id}`, {
                        duration: curTime,
                        hasWatched: !array[curVideoPos].hasWatched
                            ? videos[curVideoPos].duration - curTime < 60
                            : true,
                    })
                    .then((res) => {
                        console.log(res.data);
                    });
            }
        }
    }

    function updateWatchedValue() {
        let value = !videos[curVideoPos].hasWatched;
        axios
            .put(`/api/video/${videos[curVideoPos].id}/${value}`)
            .then((res) => {
                console.log(res.data);
            });

        let array = [...videos];
        array[curVideoPos] = {
            ...array[curVideoPos],
            hasWatched: value,
        };
        setVideos(array);
    }

    function onEndHandler(e) {
        nextVideo();
        updateWatchedTime(null, true);
    }

    function onReadyHandler(e) {}

    return (
        <Layout session={session} title={info?.title}>
            <main className="text-white res-width grid grid-cols-10 flex-grow gap-x-8">
                <div className="flex col-span-10 lg:col-span-6 2xl:col-span-7">
                    {/* Left side = video + description*/}
                    <div className="py-8 w-full">
                        {/*Youtube video*/}
                        <div className="relative pb-56.25">
                            <YouTube
                                videoId={`${curVideo}`}
                                className="w-full h-full absolute top-0 left-0 rounded-st"
                                onPlay={onPlayHandler}
                                onPause={onPauseHandler}
                                onEnd={onEndHandler}
                                onReady={onReadyHandler}
                                opts={{
                                    playerVars: {
                                        rel: 0,
                                        showinfo: 0,
                                        ecver: 2,
                                    },
                                }}
                            />
                        </div>

                        {/*action under the video*/}
                        <div className="flex my-4 gap-4 justify-between flex-col lg:flex-row lg:gap-8">
                            {/*left side */}
                            <div className="flex gap-8 flex-shrink-0">
                                <div
                                    onClick={updateWatchedValue}
                                    className="flex gap-2 items-center relative click text-grayLight hover:text-white"
                                >
                                    {videos[curVideoPos].hasWatched ? (
                                        <MinusSmIcon className="h-3 absolute left-1 top-2.5" />
                                    ) : null}
                                    <BookmarkIcon className="h-5" />
                                    <p>
                                        {videos[curVideoPos].hasWatched
                                            ? "Unmark"
                                            : "Mark"}{" "}
                                        as watched
                                    </p>
                                </div>
                                <div
                                    onClick={() => setShowDelete(true)}
                                    className="flex gap-2 items-center relative click text-grayLight hover:text-white"
                                >
                                    <FolderRemoveIcon className="h-5" />
                                    <p className="inline">Delete Playlist</p>
                                </div>
                            </div>
                            {/*right side = Labels*/}
                            <div className="flex gap-4 overflow-hidden transition-all">
                                <Label
                                    title="Add Label"
                                    addLabel={true}
                                    onClick={() => setShowAddLabel(true)}
                                />
                                {playlistLabelsState.map((element) => {
                                    return (
                                        <Label
                                            title={element.title}
                                            color={element.color}
                                            key={element.title}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <HorizontalLine />

                        {/*Infos about the video */}
                        <div className="mt-4 w-full">
                            <div className="flex lg:justify-between gap-4 flex-col lg:flex-row lg:items-center mb-4">
                                {videoInfo.title && (
                                    <p className="text-lg font-semibold">
                                        {videoInfo.title}
                                    </p>
                                )}
                                {curVideoPos < videos.length - 1 && (
                                    <button
                                        onClick={() => {
                                            nextVideo();
                                        }}
                                        className="btn whitespace-nowrap rounded-full py-1.5 border-primary text-primary hover:bg-bgLight3"
                                    >
                                        Next Video
                                    </button>
                                )}
                            </div>
                            <p
                                onClick={() =>
                                    setShowDescription((prev) => !prev)
                                }
                                className="text-gray click hover:underline hover:text-grayLight w-max"
                            >
                                {showDescription ? "Hide" : "Show"} description
                            </p>
                            {videoInfo.description && showDescription && (
                                <p className="text-gray font-sm mt-2 w-full whitespace-pre-wrap">
                                    {videoInfo.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/*Vertical Line to divide the left and right side*/}
                    <div className="hidden lg:block h-full pl-8 border-r-2 border-grayDark"></div>
                </div>

                {/*Right side */}
                <div
                    className="sticky -mt-8 lg:mt-0 top-16 p-8 px-0 pb-8 flex flex-col gap-4 col-span-10 lg:col-span-4 2xl:col-span-3"
                    style={{ height: "93vh" }}
                >
                    <HorizontalLine className="lg:hidden" />
                    <h6 className="font-semibold text-2xl">{info?.title}</h6>
                    <ProgressBar
                        progress={
                            (100 / info?.duration) *
                            videos
                                .map((item) => {
                                    return item.hasWatched
                                        ? item.duration
                                        : item.timeWatched
                                        ? item.timeWatched
                                        : 0;
                                })
                                .reduce((prev, next) => prev + next)
                        }
                    />
                    <QuillNoSSRWrapper
                        theme="snow"
                        value={notes}
                        onChange={writeNoteHandler}
                    />

                    <div className="w-full overflow-y-auto pb-4 transition-all group border-2 border-grayDark hover:border-gray rounded-st bg-bgLight3 hover:bg-bgLight3 flex flex-col">
                        <div className="flex px-4 py-3 w-full justify-between font-semibold font-white mb-2">
                            <p>All Videos</p>
                            {info && (
                                <p>
                                    {info.duration > 3599
                                        ? moment
                                              .utc(info.duration * 1000)
                                              .format("HH:mm:ss")
                                        : moment
                                              .utc(info.duration * 1000)
                                              .format("mm:ss")}
                                </p>
                            )}
                        </div>
                        <div className="overflow-y-auto smooth">
                            {videos?.map((element, index) => {
                                return (
                                    <VideoElement
                                        watched={element.hasWatched}
                                        title={element.title}
                                        length={element.duration}
                                        description={element.description}
                                        id={element.v}
                                        setCurVideo={setCurVideo}
                                        setVideoInfo={setVideoInfo}
                                        curVideoPos={curVideoPos}
                                        setCurVideoPos={setCurVideoPos}
                                        pos={index}
                                        key={element.id}
                                        refProp={itemsRef}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {showNewLabel ? (
                    <NewLabel
                        setShowAddLabel={setShowAddLabel}
                        setShowNewLabel={setShowNewLabel}
                        allLabels={allLabelsState}
                        playlistLabels={playlistLabelsState}
                        setAllLabels={setAllLabels}
                    />
                ) : (
                    showAddLabel && (
                        <AddLabel
                            setShowAddLabel={setShowAddLabel}
                            setShowNewLabel={setShowNewLabel}
                            allLabels={allLabelsState}
                            playlistLabels={playlistLabelsState}
                            setAllLabels={setAllLabels}
                            setPlaylistLabels={setPlaylistLabels}
                            playlistId={playlistId}
                        />
                    )
                )}
                {showDelete && (
                    <Delete setShowDelete={setShowDelete} id={playlistId} />
                )}
            </main>
        </Layout>
    );
}

export default Playlist;

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session && session.accessToken) {
        const { playlistId } = context.query;
        const prisma = new PrismaClient();
        const hasSession = await prisma.sessions.findUnique({
            where: {
                access_token: session.accessToken,
            },
        });
        const { user_id } = hasSession;
        const getVideos = await prisma.$queryRaw(
            `SELECT video.v, video.id, video.timeWatched, video.note, video.description, video.hasWatched, video.duration, video.title FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} AND playlist.id = ${playlistId}`
        );
        const getPlaylist = await prisma.$queryRaw(
            `SELECT playlist.title, playlist.duration FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} AND playlist.id = ${playlistId}`
        );
        let getAllLabels = await prisma.$queryRaw(
            `SELECT DISTINCT playlist.id, label.title, label.color FROM label JOIN labelplaylist ON labelplaylist.labelId = label.title JOIN playlist ON playlist.id = labelplaylist.playlistId WHERE playlist.userId = ${user_id} AND playlist.id != ${playlistId} GROUP BY label.title`
        );
        const getPlaylistLabels = await prisma.$queryRaw(
            `SELECT playlist.id, label.title, label.color FROM label JOIN labelplaylist ON labelplaylist.labelId = label.title JOIN playlist ON playlist.id = labelplaylist.playlistId WHERE playlist.userId = ${user_id} AND playlist.id = ${playlistId}`
        );
        let newArray = [];
        for (let i = 0; i < getAllLabels.length; i++) {
            if (
                !getPlaylistLabels.some(
                    (e) => e.title === getAllLabels[i].title
                )
            ) {
                newArray.push(getAllLabels[i]);
            }
        }

        getAllLabels = newArray;

        let index = 0;
        for (let i = 0; i < getVideos.length; i++) {
            if (!getVideos[i].hasWatched) {
                index = i;
                break;
            }
        }

        return {
            props: {
                session: session,
                getVideos: getVideos,
                info: getPlaylist[0],
                allLabels: getAllLabels,
                playlistLabels: getPlaylistLabels,
                playlistId: parseInt(playlistId),
                index: index,
            },
        };
    }

    return {
        redirect: {
            destination: "/signin",
            permanent: false,
        },
    };
}
