import { useState, useEffect, Fragment } from "react";
import SearchBar from "../../components/SearchBar";
import Label from "../../components/Label";
import Layout from "../../components/Layout";
import { getSession } from "next-auth/client";
import VideoSection from "../../components/VideoSection";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
const contentPerPage = 12;

function index({ session, data, labels }) {
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [labelPlaylists, setLabelPlaylists] = useState([]);
    const [searchPlaylists, setSearchPlalyist] = useState([]);
    const [loadingLabel, setLoadingLabel] = useState(false);
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [page, setPage] = useState(0);
    const [loadMorePlaylists, setLoadMorePlaylists] = useState([]);
    const [lastPage, setLastPage] = useState(false);

    useEffect(() => {
        if (selectedLabels.length > 0) {
            setLoadingLabel(true);
            let labelsArray = [...selectedLabels].map(
                (element) => labels[element].title
            );
            let cancel;
            let stringify = JSON.stringify(labelsArray);
            console.log(stringify);
            axios
                .get(`/api/playlist/label/${stringify}`, {
                    cancelToken: new axios.CancelToken((c) => (cancel = c)),
                })
                .then((res) => {
                    setLabelPlaylists(res.data);
                    setLoadingLabel(false);
                })
                .catch((e) => {
                    if (axios.isCancel(e)) return;
                });

            return () => cancel();
        }
    }, [selectedLabels]);

    useEffect(() => {
        if (search.length > 0) {
            setLoadingSearch(true);
            let cancel;
            axios
                .get(`/api/playlist/search/${search}`, {
                    cancelToken: new axios.CancelToken((c) => (cancel = c)),
                })
                .then((res) => {
                    setSearchPlalyist(res.data);
                    setLoadingSearch(false);
                })
                .catch((e) => {
                    if (axios.isCancel(e)) return;
                });
            return () => cancel();
        }
    }, [search]);

    function clearFilter() {
        setSearch("");
        setSelectedLabels([]);
    }

    async function loadMore() {
        const res = await axios.get(`/api/playlist/page/${page + 1}`);
        console.log(res.data);
        setLoadMorePlaylists((prev) => [...prev, ...res.data]);
        setPage((prev) => prev + 1);
        if (res.data.length < contentPerPage) setLastPage(true);
    }

    return (
        <Layout title="Library - Playlisty" session={session}>
            <main className="res-width pt-4 mb-8">
                {/*Bar on the top*/}
                <div className="flex gap-4">
                    <SearchBar search={search} setSearch={setSearch} />
                </div>

                {/*Labels come here*/}
                <div className="my-4 flex gap-4 items-center">
                    {labels.map((element, index) => {
                        return (
                            <Label
                                title={element.title}
                                color={element.color}
                                select={selectedLabels.includes(index)}
                                index={index}
                                filter={true}
                                setSelectedLabels={setSelectedLabels}
                                key={element.title}
                                selectedLabels={selectedLabels}
                            />
                        );
                    })}
                </div>

                {/*Videos come here */}

                {search !== "" ? (
                    <VideoSection
                        title={`Searching for: ${search}`}
                        data={searchPlaylists}
                        loading={loadingSearch}
                        reset={searchPlaylists.length === 0}
                        clearFilter={clearFilter}
                    />
                ) : selectedLabels.length > 0 ? (
                    <VideoSection
                        title={`Searching for: ${selectedLabels
                            .sort()
                            .map((element) => labels[element].title)
                            .toString()}`}
                        data={labelPlaylists}
                        loading={loadingLabel}
                        reset={labelPlaylists.length === 0}
                        clearFilter={clearFilter}
                    />
                ) : (
                    <Fragment>
                        {data?.continueWatching &&
                            data.continueWatching.length > 0 && (
                                <VideoSection
                                    data={data.continueWatching}
                                    title={`Continue Watching for ${session.user.name}`}
                                    carousel={true}
                                />
                            )}
                        {data?.recentlyUploaded &&
                            data.recentlyUploaded.length > 0 && (
                                <VideoSection
                                    data={data.recentlyUploaded}
                                    title="Recently Uploaded"
                                    carousel={true}
                                />
                            )}
                        {data?.all && data.all.length > 0 && (
                            <Fragment>
                                <VideoSection
                                    data={[...data.all, ...loadMorePlaylists]}
                                    title="All Playlists"
                                />
                                {!lastPage &&
                                    data.all.length === contentPerPage && (
                                        <div className="w-full flex justify-center mt-6">
                                            <button
                                                onClick={loadMore}
                                                className="rounded-full click px-6 py-2 font-semibold border-2 border-gray text-white hover:border-grayLight hover:bg-bgLight3 transition-all"
                                            >
                                                Load more
                                            </button>
                                        </div>
                                    )}
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </main>
        </Layout>
    );
}

export default index;

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session && session.accessToken) {
        const prisma = new PrismaClient();
        const hasSession = await prisma.sessions.findUnique({
            where: {
                access_token: session.accessToken,
            },
        });
        const { user_id } = hasSession;
        const getContinueWatching = await prisma.$queryRaw(
            `SELECT playlist.id, playlist.list, playlist.lastTimeWatched, playlist.title, (100 / playlist.duration) * SUM(CASE When video.hasWatched=1 Then video.duration Else video.timeWatched End) AS 'progress', video.v, COUNT(video.id) AS 'amount' FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} AND playlist.lastTimeWatched IS NOT NULL GROUP BY playlist.id ORDER BY playlist.lastTimeWatched DESC LIMIT 16`
        );
        const getRecentylUploaded = await prisma.$queryRaw(
            `SELECT playlist.id, playlist.list, playlist.lastTimeWatched, playlist.title, (100 / playlist.duration) * SUM(CASE When video.hasWatched=1 Then video.duration Else video.timeWatched End) AS 'progress', video.v, COUNT(video.id) AS 'amount' FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} GROUP BY playlist.id ORDER BY playlist.createdAt DESC LIMIT 16`
        );
        const getAll = await prisma.$queryRaw(
            `SELECT playlist.id, playlist.list, playlist.lastTimeWatched, playlist.title, (100 / playlist.duration) * SUM(CASE When video.hasWatched=1 Then video.duration Else video.timeWatched End) AS 'progress', video.v, COUNT(video.id) AS 'amount' FROM playlist JOIN video ON video.playlistId = playlist.id WHERE playlist.userId = ${user_id} GROUP BY playlist.id ORDER BY playlist.title LIMIT ${contentPerPage} OFFSET 0` //18
        );
        const getAllLabels = await prisma.$queryRaw(
            `SELECT DISTINCT  label.title, label.color FROM label JOIN labelplaylist ON labelplaylist.labelId = label.title JOIN playlist ON playlist.id = labelplaylist.playlistId WHERE playlist.userId = ${user_id}`
        );

        return {
            props: {
                session: session,
                data: {
                    continueWatching: getContinueWatching,
                    recentlyUploaded: getRecentylUploaded,
                    all: getAll,
                },
                labels: getAllLabels,
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
