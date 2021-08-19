import { useEffect } from "react";
import { CheckIcon } from "@heroicons/react/outline";
import { PauseIcon } from "@heroicons/react/solid";
import { PlayIcon } from "@heroicons/react/solid";
import moment from "moment";
import Image from "next/image";

function VideoElement({
    watched,
    title,
    length,
    id,
    setCurVideo,
    setVideoInfo,
    description,
    setCurVideoPos,
    curVideoPos,
    pos,
    refProp,
}) {
    function onClickHandler() {
        setCurVideoPos(pos);
    }
    useEffect(() => {
        if (curVideoPos === pos) {
            setCurVideo(id);
            setVideoInfo({
                description: description,
                title: title,
            });
        }
    }, [curVideoPos]);

    return (
        <div
            className={`flex group gap-3 py-3 px-4 font-semibold hover:bg-bgDark1 transition-all click text-sm ${
                pos === curVideoPos
                    ? "text-blue1"
                    : watched
                    ? "text-gray hover:text-grayLight"
                    : "text-white"
            }`}
            onClick={onClickHandler}
            ref={(el) => (refProp.current[pos] = el)}
        >
            {pos === curVideoPos ? (
                <div className="h-7 flex-shrink-0 rounded-full flex w-7 items-center justify-center bg-blue1Dark">
                    <Image src="/stop_blue.svg" width="12" height="12" />
                </div>
            ) : watched ? (
                <div className="bg-turqoiseDark h-7 w-7 flex-shrink-0 justify-center items-center rounded-full flex">
                    <Image src="/correct_green.svg" width="14" height="14" />
                </div>
            ) : (
                <div className="h-7 flex-shrink-0 rounded-full flex w-7 items-center justify-center bg-grayDark">
                    <Image src="/play_white.svg" width="10" height="10" />
                </div>
            )}

            <p className="mt-0.5 flex-grow overflow-hidden mr-2">{title}</p>
            <p className="mt-0.5">
                {length.duration > 3599
                    ? moment.utc(length * 1000).format("HH:mm:ss")
                    : moment.utc(length * 1000).format("mm:ss")}
            </p>
        </div>
    );
}

export default VideoElement;
