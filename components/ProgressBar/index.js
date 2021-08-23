function ProgressBar({ progress }) {
    return (
        <div className="w-full transition-all duration-1000 py-3 px-4 border-2 border-grayDark hover:border-gray rounded-st bg-bgLight3 hover:bg-bgLight4 flex gap-5 items-center">
            {progress?.toFixed(0)}%
            <div className="relative h-3 w-full bg-grayDark rounded-st ">
                <div
                    className="absolute duration-500 h-3 bg-white left-0 top-0 rounded-st transition-all"
                    style={{ width: `${progress?.toFixed(0)}%` }}
                ></div>
            </div>
        </div>
    );
}

export default ProgressBar;
