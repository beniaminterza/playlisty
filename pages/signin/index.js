import Image from "next/image";
import Head from "next/head";
import FadeIn from "../../components/FadeIn";
import { providers, signIn, getSession } from "next-auth/client";

function index({ providers }) {
    return (
        <div className="text-white w-full">
            <Head>
                <title>Sign In - Playlisty</title>
                <meta
                    name="description"
                    content="Watch YouTube playlists with no distraction"
                />
                <link rel="icon" href="/favicon_black.svg" />
            </Head>

            {/*signin Container*/}
            <div className="p-12 bg-bgLight2 rounded-st fixed centerAbsolute w-96">
                <FadeIn yOffset={25}>
                    <h6 className="text-2xl text-white font-semibold">
                        Welcome
                    </h6>
                </FadeIn>
                <FadeIn yOffset={25}>
                    <p className="text-sm mt-2 mb-10 text-grayLight">
                        By logging in you accept our{" "}
                        <a
                            href="/Privacy"
                            className="text-blue1 font-semibold hover:underline"
                        >
                            Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                            href="/terms"
                            className="text-blue1 font-semibold hover:underline"
                        >
                            Terms of Service
                        </a>
                        .
                    </p>
                </FadeIn>
                {/*Google signin */}
                <div className="flex flex-col gap-6">
                    {/*Github signin */}
                    <FadeIn yOffset={25}>
                        <button
                            className="signinBtn"
                            onClick={() => signIn(providers.github.id)}
                        >
                            <div
                                className="absolute h-max left-8 centerY"
                                style={{ marginTop: "3px" }}
                            >
                                <Image
                                    src="/github_logo.svg"
                                    height="20"
                                    width="20"
                                />
                            </div>
                            <p>Continue with GitHub</p>
                        </button>
                    </FadeIn>
                    {/*<FadeIn yOffset={25}>
                        <button className="signinBtn">
                            <div className="absolute left-8 centerY">
                                <Image
                                    src="/google_icon.svg"
                                    height="16"
                                    width="16"
                                />
                            </div>
                            <p>Continue with Google</p>
                        </button>
    </FadeIn>*/}
                    {/*Google signin */}
                    <FadeIn yOffset={25}>
                        <button
                            className="signinBtn"
                            onClick={() => signIn(providers.facebook.id)}
                        >
                            <p>Continue with Facebook</p>
                            <div
                                className="absolute ml-1 left-7 centerY"
                                style={{ marginTop: "3px" }}
                            >
                                <Image
                                    src="/facebook_icon.svg"
                                    height="20"
                                    width="20"
                                />
                            </div>
                        </button>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}

export default index;

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session && session.accessToken) {
        return {
            redirect: {
                destination: "/library",
                permanent: false,
            },
        };
    }
    return {
        props: {
            providers: await providers(context),
        },
    };
}
