import Image from "next/image";
import Link from "next/link";
import HorizontalLine from "../components/HorizontalLine";
import FadeInWhenVisible from "../components/FadeInWhenVisible";
import FadeIn from "../components/FadeIn";
import { useRef } from "react";
import { ArrowCircleUpIcon } from "@heroicons/react/outline";
import { getSession } from "next-auth/client";
import Layout from "../components/Layout";

export default function Home() {
    const section2Ref = useRef(null);

    const scrollToSection2 = () => section2Ref.current.scrollIntoView();
    const scrollToTop = () => window.scrollTo(0, 0);

    return (
        <Layout>
            <main>
                <section className="relative">
                    <div className="res-width flex screenMinusHeader items-start">
                        {/*Left Side of the first part of the HomePage */}
                        <div className="flex gap-12 flex-col flex-grow w-full mr-20 mt-44">
                            <div className="font-bold text-white text-6xl flex flex-col gap-4">
                                <FadeIn delay={0.1}>
                                    <h1>
                                        Enjoy{" "}
                                        <span className="text-gray">
                                            YouTube
                                        </span>{" "}
                                    </h1>
                                </FadeIn>
                                <FadeIn delay={0.15}>
                                    <h1>
                                        playlists like{" "}
                                        <span className="text-primary">
                                            never
                                        </span>
                                    </h1>
                                </FadeIn>
                                <FadeIn delay={0.2}>
                                    <h1>before.</h1>
                                </FadeIn>
                            </div>
                            <FadeIn delay={2}>
                                <p className="text-grayLight">
                                    Have you ever wanted to watch YouTube
                                    playlists, without being distracted? A bit
                                    more text here... Have you ever wanten
                                </p>
                            </FadeIn>
                            <div className="flex gap-8">
                                <FadeIn delay={1.6}>
                                    <Link href="/signin">
                                        <button className=" hover:shadow-glow py-3 px-8 border-2 border-primary text-primary rounded-st font-semibold text-lg">
                                            Free Sign Up
                                        </button>
                                    </Link>
                                </FadeIn>
                                <FadeIn delay={1.75}>
                                    <button
                                        onClick={scrollToSection2}
                                        className="py-3 px-8 hover:border-grayLight hover:text-white text-grayLight underline rounded-st font-medium text-lg"
                                    >
                                        Explore More
                                    </button>
                                </FadeIn>
                            </div>
                        </div>

                        {/*Right Side of the first part of the HomePage -> Illustration */}
                        <FadeIn
                            className="w-full h-full relative flex-grow ml-8 hidden lg:block"
                            delay={1.0}
                            yOffset={50}
                        >
                            <Image
                                src="/undraw_online_video_ivvq.svg"
                                layout="fill"
                            />
                        </FadeIn>
                    </div>

                    {/*Waves on the bottom of the 1 Section */}
                    <FadeIn
                        className="absolute w-full h-14.25 bottom-0"
                        delay={0.6}
                        yOffset={50}
                    >
                        <div className="w-full h-full relative bottom-0">
                            <Image
                                src="/hp_wave_1.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </FadeIn>
                    <FadeIn
                        className="absolute w-full h-10.625 bottom-0"
                        delay={0.9}
                        yOffset={50}
                    >
                        <div className="w-full h-full relative bottom-0">
                            <Image
                                src="/hp_wave_2.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </FadeIn>
                </section>

                <section className="relative" ref={section2Ref}>
                    {/*Waves on the top of the 2 Section */}
                    <FadeInWhenVisible
                        className="absolute w-full h-10.25 top-0"
                        threshold={0.2}
                    >
                        <div className="w-full h-full relative ">
                            <Image
                                src="/hp_wave_3.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible
                        className="absolute w-full h-14.375 top-0"
                        threshold={0.8}
                    >
                        <div className="w-full h-full relative ">
                            <Image
                                src="/hp_wave_4.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </FadeInWhenVisible>

                    <div className="res-width flex flex-col gap-24 z-10 relative">
                        {/*Question on top of this section*/}
                        <FadeInWhenVisible
                            className="mx-auto mt-56 flex gap-3"
                            threshold={0.8}
                        >
                            <h3 className=" font-semibold text-3xl text-white mb-2">
                                Why should you use
                            </h3>
                            <Image
                                src="/Playlisty_Logo.svg"
                                width="120"
                                height="40"
                                className="mt-4"
                            />
                            <h3 className="-ml-2 font-semibold text-3xl text-white mb-2">
                                ?
                            </h3>
                        </FadeInWhenVisible>

                        {/*Benefit 1 */}
                        <div className="text-white flex flex-col-reverse md:flex-row gap-12 lg:gap-28">
                            <FadeInWhenVisible
                                className="relative mx-auto w-23.4375 h-15.8125 flex-shrink-0"
                                threshold={0.4}
                            >
                                <Image
                                    src="/undraw_working_late_pukg.svg"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </FadeInWhenVisible>
                            <FadeInWhenVisible delay={0.4} threshold={0.4}>
                                <h6 className="text-2xl mb-4">
                                    No distraction
                                </h6>
                                <p className="text-gray 2xl:w-2/3">
                                    Playlisty will only show you the the video
                                    that you are watching, so that you stay
                                    concentradet. There won’t be any
                                    recomendations for you.
                                </p>
                            </FadeInWhenVisible>
                        </div>

                        {/*Horizontal line */}
                        <FadeInWhenVisible>
                            <HorizontalLine className="-my-4" />
                        </FadeInWhenVisible>

                        {/*Benefit 2 */}
                        <div className="text-white flex flex-col-reverse md:flex-row-reverse gap-12 lg:gap-28">
                            <FadeInWhenVisible
                                className="relative mx-auto w-32.25 h-17.125 flex-shrink-0"
                                threshold={0.4}
                            >
                                <Image
                                    src="/undraw_Sorting_thoughts_re_fgli.svg"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </FadeInWhenVisible>
                            <FadeInWhenVisible
                                className="inline-flex flex-col 2xl:w-1/3"
                                threshold={0.4}
                                delay={0.4}
                            >
                                <h6 className="text-2xl mb-4">
                                    Label your playlists
                                </h6>
                                <p className="text-gray">
                                    You will be able to label your playslists
                                    with labels that you created. This is not
                                    just limited to one label/playlist but you
                                    can add mutliple labels, so that you can
                                    find and sort your playlists the best way
                                    possible.
                                </p>
                            </FadeInWhenVisible>
                        </div>

                        {/*Horizontal line */}
                        <FadeInWhenVisible>
                            <HorizontalLine className="-my-4" />
                        </FadeInWhenVisible>

                        {/*Benefit 3 */}
                        <div
                            className="text-white flex flex-col-reverse md:flex-row gap-12 lg:gap-28"
                            threshold={0.4}
                        >
                            <FadeInWhenVisible
                                className="relative mb-10 md:mb-0 mx-auto w-23.4375 h-15.8125 flex-shrink-0"
                                threshold={0.4}
                            >
                                <Image
                                    src="/undraw_Progress_overview_re_tvcl.svg"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </FadeInWhenVisible>
                            <FadeInWhenVisible threshold={0.4} delay={0.4}>
                                <h6 className="text-2xl mb-4">
                                    No distraction
                                </h6>
                                <p className="text-gray 2xl:w-2/3">
                                    Playlisty will only show you the the video
                                    that you are watching, so that you stay
                                    concentradet. There won’t be any
                                    recomendations for you.
                                </p>
                            </FadeInWhenVisible>

                            {/*Arrow to go to the top*/}
                            <FadeInWhenVisible
                                threshold={0.5}
                                delay={2}
                                className="absolute centerX -bottom-28"
                            >
                                <ArrowCircleUpIcon
                                    onClick={scrollToTop}
                                    className="h-16 text-grayLight hover:text-white transition-all click animate-bounce"
                                />
                            </FadeInWhenVisible>
                        </div>
                    </div>

                    <div className="h-72"></div>

                    {/*Waves on the bottom of the 2 Section */}
                    <FadeInWhenVisible className="absolute w-full h-13.4375 bottom-0">
                        <div className="w-full h-full relative bottom-0">
                            <Image
                                src="/hp_wave_5.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible
                        className="absolute w-full h-25.875 bottom-0"
                        threshold={0.6}
                    >
                        <div className="w-full h-full relative bottom-0">
                            <Image
                                src="/hp_wave_6.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </FadeInWhenVisible>
                </section>
            </main>
        </Layout>
    );
}

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
        props: {},
    };
}
