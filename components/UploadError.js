import { ExclamationCircleIcon } from "@heroicons/react/outline";
import HorizontalLine from "./HorizontalLine";

function UploadError({ cancel, setShowUploadError, setShowUploadLink }) {
    return (
        <div className="bg-bgLight5 z-1000 border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
            <div className="p-8 mb-8 w-40 h-96">
                <div className="flex justify-between items-center">
                    <h5 className="text-white font-semibold text-2xl">
                        Not Found
                    </h5>
                    <ExclamationCircleIcon className="text-primary hover:text-primaryLight h-8" />
                </div>
                <p className="text-white text-xl mt-4 mb-2">We are sorry!</p>
                <p className="text-gray mb-4">
                    There was an error and your playlist could not be uploaded.
                    Would you like to try again?
                </p>
            </div>
            <HorizontalLine />
            <div className="p-8 flex gap-4">
                <button
                    onClick={cancel}
                    className="rounded-full click px-6 py-1.5 font-semibold border-2 border-gray text-gray hover:border-grayLight hover:bg-bgLight3 transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        setShowUploadError(false);
                        setShowUploadLink(true);
                    }}
                    className="rounded-full click px-6 py-1.5 font-semibold border-2 border-primary text-primary hover:bg-bgLight4 transition-all"
                >
                    Retry
                </button>
            </div>
        </div>
    );
}

export default UploadError;
