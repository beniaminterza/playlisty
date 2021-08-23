function HorizontalLine({ className }) {
    return (
        <div
            className={`w-full border-t-2 border-grayDark ${
                className && className
            }`}
        ></div>
    );
}

export default HorizontalLine;
