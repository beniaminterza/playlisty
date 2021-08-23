import { ClipboardIcon } from "@heroicons/react/outline";

function UploadLink({ input, setInput, upload, cancel }) {
    return (
        <div className="bg-bgLight5 z-1000 border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
            <div className="p-8 w-40">
                <h5 className="text-white text-xl">
                    Upload a YouTube playlist
                </h5>
                <p className="text-sm  italic text-gray mt-4 mb-2">
                    Paste your link in the input field below
                </p>

                <div className="flex libInput text-gray bg-bgLight4 items-center px-4 gap-4 border-2 border-gray rounded-full py-2">
                    <ClipboardIcon className="h-4" />
                    <input
                        type="text"
                        placeholder="Your playlist link..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-grayLight"
                    />
                </div>
                <button
                    onClick={() => {
                        upload();
                    }}
                    className="rounded-full bg-blue1Dark mt-6 click px-6 w-full py-1.5 font-semibold border-2 border-transparent text-blue1 hover:border-blue1 transition-all"
                >
                    Upload
                </button>
            </div>
        </div>
    );
}

export default UploadLink;
