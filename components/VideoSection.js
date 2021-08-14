import { Fragment } from "react";
import HorizontalLine from "./HorizontalLine";
import VerticalVideo from "./VerticalVideo";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ArrowRightIcon } from "@heroicons/react/outline";
import CustomRightArrow from "./CustomRightArrow";
import CustomLeftArrow from "./CustomLeftArrow";
const responsive = {
    xl2: {
        breakpoint: { max: 4000, min: 1536 },
        items: 6,
        slidesToSlide: 5,
    },
    xl: {
        breakpoint: { max: 1536, min: 1280 },
        items: 5,
        slidesToSlide: 4,
    },
    lg: {
        breakpoint: { max: 1280, min: 1024 },
        items: 4,
        slidesToSlide: 3,
    },
    md: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 2,
    },
    sm: {
        breakpoint: { max: 768, min: 640 },
        items: 2,
        slidesToSlide: 1,
    },
    sm0: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    },
};

function VideoSection({ data, title, loading, reset, clearFilter, carousel }) {
    return (
        <Fragment>
            <HorizontalLine />
            <section className="my-4">
                <h3 className="text-white font-semibold text-2xl">{title}</h3>

                {loading ? (
                    <div className="relative overflow-hidden mt-6 w-full flex items-center py-1">
                        <div className="loader">Loading...</div>
                    </div>
                ) : reset ? (
                    <div className="mt-12 w-full flex gap-8 items-center flex-col py-1">
                        <h6 className="text-white text-xl">
                            No playlists found
                        </h6>
                        <button
                            onClick={clearFilter}
                            className="rounded-full text-lg px-8 border-2 py-1.5 text-blue1 border-blue1 hover:bg-bgLight3 transition-all font-medium"
                        >
                            Clear your filters and try again
                        </button>
                    </div>
                ) : carousel ? (
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        keyBoardControl={true}
                        containerClass={`carousel-container mt-4 -mx-3 ${
                            data.length > 5 && "pb-8"
                        }`}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-60-px px-3"
                        customRightArrow={<CustomRightArrow />}
                        customLeftArrow={<CustomLeftArrow />}
                    >
                        {data.map((element) => {
                            return (
                                <VerticalVideo
                                    thumbnail={`https://img.youtube.com/vi/${element.v}/mqdefault.jpg`}
                                    title={element.title}
                                    percentage={
                                        element.progress === 0
                                            ? undefined
                                            : element.progress
                                    }
                                    lastWatched={element.lastTimeWatched}
                                    videoAmount={element.amount}
                                    id={element.id}
                                    key={element.id}
                                />
                            );
                        })}
                    </Carousel>
                ) : (
                    <div className="mt-6 grid grid-flow-row gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {data.map((element) => {
                            return (
                                <VerticalVideo
                                    thumbnail={`https://img.youtube.com/vi/${element.v}/mqdefault.jpg`}
                                    title={element.title}
                                    percentage={
                                        element.progress === 0
                                            ? undefined
                                            : element.progress
                                    }
                                    lastWatched={element.lastTimeWatched}
                                    videoAmount={element.amount}
                                    id={element.id}
                                    key={element.id}
                                />
                            );
                        })}
                    </div>
                )}
            </section>
        </Fragment>
    );
}

export default VideoSection;
