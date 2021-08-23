import { useState, useEffect } from "react";
import Head from "next/head";
import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Upload from "../Upload/index";
import { useRouter } from "next/router";

const Layout = ({ children, session, title, state, opacity }) => {
    const [showUpload, setShowUpload] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (state > 0) {
            setShowUpload(true);
        }
    }, [state]);

    return (
        <Fragment>
            <Head>
                <title>{`${title ? title : "Playlisty"}`}</title>
                <meta
                    name="description"
                    content="Watch YouTube playlists in a better way"
                />
                <link rel="icon" href="/favicon_black.svg" />
            </Head>

            <Header
                setShowUpload={setShowUpload}
                session={session}
                opacity={opacity}
            />
            {children}
            {showUpload && <Upload setShowUpload={setShowUpload} />}

            <Footer />
        </Fragment>
    );
};

export default Layout;
