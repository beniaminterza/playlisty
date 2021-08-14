import { ArrowLeftIcon } from "@heroicons/react/outline";

function CustomLeftArrow({ onClick, ...rest }) {
    const {
        onMove,
        carouselState: { currentSlide, deviceType },
    } = rest;
    return (
        <div
            onClick={() => onClick()}
            className="absolute click z-50 -bottom-1 left-3"
        >
            <ArrowLeftIcon className="h-6 text-grayLight hover:text-white transition-all" />
        </div>
    );
}

export default CustomLeftArrow;
