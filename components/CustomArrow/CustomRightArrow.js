import { ArrowRightIcon } from "@heroicons/react/outline";

function CustomRightArrow({ onClick, ...rest }) {
    const {
        onMove,
        carouselState: { currentSlide, deviceType },
    } = rest;
    return (
        <div
            onClick={() => onClick()}
            className="absolute click z-50 -bottom-1 right-3"
        >
            <ArrowRightIcon className="h-6 text-grayLight hover:text-white transition-all" />
        </div>
    );
}

export default CustomRightArrow;
