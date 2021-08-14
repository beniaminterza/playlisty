import { PlayIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import moment from "moment";

function VerticalVideo({
    thumbnail,
    title,
    lastWatched,
    percentage,
    videoAmount,
    id,
}) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Link href={`/library/${id}`}>
            <div className="click relative videoContainer group border-2 border-transparent hover:border-gray rounded-st transition-all">
                {/*Thumbnail: padding bottom is for 16:9 ratio*/}
                <div className="relative w-full pb-56.25">
                    <Image
                        src={thumbnail}
                        layout="fill"
                        objectFit="cover"
                        blurDataURL={thumbnail}
                        placeholder="blur"
                        className="rounded-t-st"
                    />

                    {/*Darken the image when hovering*/}
                    <div className="absolute w-full h-full bg-black opacity-0 group-hover:opacity-80 transition-all"></div>

                    {/*playIcon when hovering*/}
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all flex justify-center items-center w-12 h-12 centerAbsolute rounded-full border-4 border-white">
                        <div className="w-full h-full relative top-0 left-0 m-3 ml-4">
                            <Image
                                src="/play_white.svg"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>

                    {/*progress bar*/}
                    {percentage && percentage > 0 && (
                        <Fragment>
                            <div className="w-full progressBg absolute bottom-0 h-2 bg-gray opacity-50 group-hover:opacity-90"></div>
                            <div
                                className="absolute bottom-0 h-2 bg-primary"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </Fragment>
                    )}
                </div>

                {/*Infos for the playlist */}
                <div className="transition-all p-4 bg-bgLight2 h-6.75 group-hover:bg-bgLight0 rounded-b-st flex flex-col gap-2">
                    <h6
                        className="text-white font-semibold h-12 min-h-12 overflow-hidden group-hover:h-auto"
                        title={title}
                    >
                        {title}
                    </h6>
                    <div className="flex justify-between">
                        {lastWatched === null ? (
                            <p className="text-grayLight text-sm">
                                Never watched
                            </p>
                        ) : (
                            <p className="text-grayLight text-sm">
                                {capitalizeFirstLetter(
                                    moment(lastWatched).fromNow()
                                )}
                            </p>
                        )}
                        <p className="text-grayLight text-sm">
                            {videoAmount} videos
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default VerticalVideo;
