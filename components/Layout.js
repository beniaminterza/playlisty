import { useState } from "react";
import Head from "next/head";
import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Upload from "./Upload";
import { useRouter } from "next/router";
import FadeIn from "./FadeIn";

const Layout = ({ children, session, title }) => {
    const [showUpload, setShowUpload] = useState(false);
    const router = useRouter();

    return (
        <Fragment>
            <Head>
                <title>{`${title ? title : "Playlisty"}`}</title>
                <meta
                    name="description"
                    content="Watch YouTube playlists with no distraction"
                />
                <link rel="icon" href="/favicon_black.svg" />
            </Head>

            <Header setShowUpload={setShowUpload} session={session} />
            {children}
            {showUpload && <Upload setShowUpload={setShowUpload} />}

            <Footer />
        </Fragment>
    );
};

export default Layout;
