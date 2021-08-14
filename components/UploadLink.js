import { ClipboardIcon } from "@heroicons/react/outline";
import HorizontalLine from "./HorizontalLine";
import DragLink from "./DragLink";

function UploadLink({ input, setInput, upload, cancel }) {
    return (
        <div className="bg-bgLight5 z-1000 border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
            <div className="p-8 w-40">
                <h5 className="text-white font-semibold text-2xl">Upload</h5>
                <DragLink />

                <div className="flex my-4 items-center gap-2 text-grayDark">
                    <HorizontalLine />
                    <p>or</p>
                    <HorizontalLine />
                </div>

                <p className="text-white">Paste the playlist link</p>
                <div className="flex libInput text-gray items-center px-4 gap-4 mt-4 border-2 border-gray rounded-st py-2">
                    <ClipboardIcon className="h-4" />
                    <input
                        type="text"
                        placeholder="Your playlist link..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-grayLight"
                    />
                </div>
            </div>

            <HorizontalLine />

            <div className="p-8 flex gap-4">
                <button
                    onClick={cancel}
                    className="btn border-gray text-gray hover:border-grayLight hover:text-grayLight"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        upload();
                    }}
                    className="btn border-blue1 text-blue1 hover:bg-blue1Dark"
                >
                    Upload
                </button>
            </div>
        </div>
    );
}

export default UploadLink;
