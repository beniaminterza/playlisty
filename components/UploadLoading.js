import HorizontalLine from "./HorizontalLine";

function UploadLoading({ cancel }) {
    return (
        <div className="bg-bgLight5 z-1000 border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
            <div className="p-8 w-40">
                <h5 className="text-white font-semibold text-2xl">
                    Uploading...
                </h5>
                <p className="text-gray my-4">Wait a few seconds...</p>
                <div className="py-3">
                    <div className="loader transition-all">Loading...</div>
                </div>
            </div>
            <HorizontalLine />
            <div className="p-8">
                <button
                    onClick={cancel}
                    className="btn border-gray text-gray hover:border-grayLight hover:text-grayLight"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UploadLoading;