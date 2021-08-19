import { ClipboardIcon } from "@heroicons/react/outline";
import HorizontalLine from "./HorizontalLine";
import DragLink from "./DragLink";

function UploadLink({ input, setInput, upload, cancel }) {
    return (
        <div className="bg-bgLight5 z-1000 border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
            <div className="p-8 w-40">
                <h5 className="text-white font-semibold text-2xl">Upload</h5>

                <p className="text-white mt-28 pt-3">
                    Paste the playlist link here
                </p>
                <div className="flex libInput mb-28 text-gray items-center px-4 gap-4 mt-4 border-2 border-gray rounded-full py-2">
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
                    className="rounded-full click px-6 py-1.5 font-semibold border-2 border-gray text-gray hover:border-grayLight hover:bg-bgLight3 transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        upload();
                    }}
                    className="rounded-full click px-6 py-1.5 font-semibold border-2 border-blue1 text-blue1 hover:bg-bgLight4 transition-all"
                >
                    Upload
                </button>
            </div>
        </div>
    );
}

export default UploadLink;
