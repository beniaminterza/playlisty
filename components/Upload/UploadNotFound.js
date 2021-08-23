function UploadNotFound({ setShowUploadNotFound, setShowUploadLink, cancel }) {
    return (
        <div className="bg-bgLight5 z-1000 border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
            <div className="p-8 w-40">
                <p className="text-white text-xl mb-2">We are sorry!</p>
                <p className="text-gray mb-14">
                    We cannot find this playlist, your link could be wrong or
                    the playlist is private and we cannot access it.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={cancel}
                        className="rounded-full w-full click px-6 py-1.5 font-semibold border-2 border-gray text-gray hover:border-grayLight hover:bg-bgLight3 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setShowUploadLink(true);
                            setShowUploadNotFound(false);
                        }}
                        className="rounded-full click w-full px-6 py-1.5 font-semibold border-2 border-primary text-primary hover:bg-bgLight4 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadNotFound;
