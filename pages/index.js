import Image from "next/image";
import Link from "next/link";
import HorizontalLine from "../components/HorizontalLine";
import FadeInWhenVisible from "../components/FadeInWhenVisible";
import FadeIn from "../components/FadeIn";
import { useRef } from "react";
import { ArrowCircleUpIcon } from "@heroicons/react/outline";
import { getSession } from "next-auth/client";
import Layout from "../components/Layout";
import Tilt from "react-parallax-tilt";

export default function Home() {
    const section2Ref = useRef(null);

    const scrollToSection2 = () => section2Ref.current.scrollIntoView();
    const scrollToTop = () => window.scrollTo(0, 0);

    return (
        <Layout opacity={0.9}>
            <main>
                <section className="relative">
                    <div className="z-10 res-width flex screenMinusHeader items-start">
                        <Image
                            src="/homepage_img.jpg"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="z-10 filter blur"
                            blurDataURL="/homepage_img.jpg"
                            placeholder="blur"
                        />
                        <div
                            className="absolute z-10 top-0 left-0 h-full w-full"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(35, 30, 35, 0.3) 0%, rgba(34, 32, 34, 0.7) 89.06%)",
                            }}
                        ></div>
                        <div className="flex z-20 flex-col w-full mt-36">
                            <div className="font-bold text-center text-white text-6xl">
                                <FadeIn delay={0.1}>
                                    <h1>Enjoy YouTube playlists</h1>
                                    <h1 className="mt-4">in a better way.</h1>
                                </FadeIn>
                            </div>
                            <FadeIn delay={2}>
                                <p className="text-white text-center text-2xl mt-8">
                                    Free and easy to use.
                                </p>
                            </FadeIn>
                            <div className="flex gap-8 justify-center mt-16">
                                <FadeIn delay={1.6}>
                                    <Link href="/signin">
                                        <button className="py-3 px-8 border-2 border-transparent bg-primary hover:bg-transparent hover:text-primary hover:border-primary transition-all text-white rounded-full font-semibold text-lg">
                                            Get Started
                                        </button>
                                    </Link>
                                </FadeIn>
                                <FadeIn delay={1.75}>
                                    <button
                                        onClick={scrollToSection2}
                                        className="py-3 px-8 transition-all hover:text-grayLight hover:border-grayLight text-gray border-2 border-gray rounded-full font-medium text-lg"
                                    >
                                        Explore More
                                    </button>
                                </FadeIn>
                            </div>
                        </div>
                    </div>

                    {/*Waves on the bottom of the 1 Section */}
                    <FadeIn
                        className="absolute z-20 w-full bottom-0 h-19.875"
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
                        className="absolute z-20 w-full h-13.5 bottom-0"
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

                {/*Demo*/}
                <section
                    className="relative bg-bgDark2 pb-56 pt-36"
                    ref={section2Ref}
                >
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

                    <div className="res-width">
                        <FadeInWhenVisible
                            className="mx-auto mt-20 text-center"
                            threshold={0.8}
                        >
                            <h3 className="w-full font-semibold text-3xl text-white mb-2">
                                Demo of the Website
                            </h3>
                            <p className="text-gray mb-12">
                                Example of how our website looks when watching a
                                playlist.
                            </p>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible threshold={0.4}>
                            <Tilt perspective={3000}>
                                <div className="relative pb-50.5 2xl:pb-45.5 w-full 2xl:w-90 mx-auto border-4 border-gray hover:border-grayLight rounded-img">
                                    <Image
                                        src="/demo.jpg"
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded-img"
                                        blurDataURL="/demo.jpg"
                                        placeholder="blur"
                                    />
                                </div>
                            </Tilt>
                        </FadeInWhenVisible>
                        <FadeInWhenVisible
                            threshold={0.4}
                            className="text-center mt-4 mb-8"
                        >
                            <a
                                className="text-sm text-gray underline hover:text-grayLight"
                                href="https://www.youtube.com/watch?v=-atblwgc63E&list=PL0vfts4VzfNg__PkSVKhrYvdc35kHybBy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit this playlist on YT
                            </a>
                        </FadeInWhenVisible>
                    </div>

                    {/*Waves on the bottom of the 2 Section */}
                    <FadeInWhenVisible
                        className=" absolute w-full h-10.25 bottom-0"
                        threshold={0.2}
                    >
                        <div className="w-full h-full relative ">
                            <Image
                                src="/hp_wave_3.svg"
                                layout="fill"
                                objectFit="cover"
                                className="transform rotate-180"
                            />
                        </div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible
                        className="absolute w-full h-14.375 bottom-0"
                        threshold={0.8}
                    >
                        <div className="w-full h-full relative ">
                            <Image
                                src="/hp_wave_4.svg"
                                layout="fill"
                                objectFit="cover"
                                className="transform rotate-180"
                            />
                        </div>
                    </FadeInWhenVisible>
                </section>

                <section className="relative bg-bg">
                    {/*Waves on the top of the 3 Section */}
                    <FadeInWhenVisible
                        className="absolute w-full h-7.75 top-0"
                        threshold={0.2}
                    >
                        <div className="w-full h-full relative ">
                            <Image
                                src="/hp_wave_7.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible
                        className="absolute w-full top-0 h-16.5"
                        threshold={0.8}
                    >
                        <div className="w-full h-full relative ">
                            <Image
                                src="/hp_wave_8.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </FadeInWhenVisible>

                    <div className="res-width flex flex-col gap-24 z-10 relative">
                        {/*Question on top of this section*/}
                        <FadeInWhenVisible
                            className="mx-auto mt-64 flex gap-3"
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
                                className="relative mx-auto md:mx-0 w-23.4375 h-15.8125 flex-shrink-0"
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
                                    For you to stay concentraded, Playlisty will
                                    only show you the the video that you are
                                    watching. There won’t be any recomendations
                                    for you.
                                </p>
                            </FadeInWhenVisible>
                        </div>

                        {/*Horizontal line */}
                        <FadeInWhenVisible>
                            <HorizontalLine className="-my-4" />
                        </FadeInWhenVisible>

                        {/*Benefit 2 */}
                        <div className="text-white ml-auto flex flex-col-reverse md:flex-row-reverse gap-12 lg:gap-32">
                            <FadeInWhenVisible
                                className="relative mx-auto md:mx-0 w-26.9375 h-17.0625 flex-shrink-0 mr-0"
                                threshold={0.4}
                            >
                                <Image
                                    src="/progress.svg"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </FadeInWhenVisible>
                            <FadeInWhenVisible
                                className="flex flex-col 2xl:w-1/3 ml-auto mr-5"
                                threshold={0.4}
                                delay={0.4}
                            >
                                <h6 className="text-2xl mb-4">
                                    Track your progress
                                </h6>
                                <p className="text-gray">
                                    Since YouTube isn't tracking the progress
                                    for your playlists , we do it for you, so
                                    don't worry. You will be able to see your
                                    progress in percentage.
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
                                className="relative mb-10 md:mb-0 mx-auto md:mx-0 w-22.125 h-19.375 flex-shrink-0"
                                threshold={0.4}
                            >
                                <Image
                                    src="/editor.svg"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </FadeInWhenVisible>
                            <FadeInWhenVisible
                                threshold={0.4}
                                delay={0.4}
                                className="md:ml-5"
                            >
                                <h6 className="text-2xl mb-4">Add notes</h6>
                                <p className="text-gray 2xl:w-2/3">
                                    Add your personal notes to every single
                                    video in the playlist that you want. You
                                    will be the only one to see them.
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
