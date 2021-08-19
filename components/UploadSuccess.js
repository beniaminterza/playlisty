import { CheckCircleIcon } from "@heroicons/react/outline";
import HorizontalLine from "./HorizontalLine";
import Link from "next/link";

function UploadSuccess({ cancel, id }) {
    return (
        <div className="bg-bgLight5 z-1000 border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
            <div className="p-8 mb-8 w-40 h-96">
                <div className="flex justify-between items-center">
                    <h5 className="text-white font-semibold text-2xl">
                        Finish
                    </h5>
                    <CheckCircleIcon className="text-turqoise h-8" />
                </div>
                <p className="text-white text-xl mt-4 mb-2">
                    Your playlist was uploaded!
                </p>
                <p className="text-gray mb-4">
                    Your playlist was succesfully uploaded. You can watch it
                    now.
                </p>
            </div>
            <HorizontalLine />
            <div className="p-8 flex gap-4">
                <button
                    onClick={cancel}
                    className="rounded-full click px-6 py-1.5 font-semibold border-2 border-blue1 text-blue1 hover:bg-bgLight4 transition-all"
                >
                    Done
                </button>
                <Link href={`library/${id}`}>
                    <button className="rounded-full click px-6 py-1.5 font-semibold border-2 border-turqoise text-turqoise hover:bg-bgLight4 transition-all">
                        Go to playlist
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default UploadSuccess;
