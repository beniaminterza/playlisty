function UploadLoading({ cancel }) {
    return (
        <div className="bg-bgLight5 z-1000 border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
            <div className="p-8 w-40">
                <h5 className="text-white text-xl">Uploading...</h5>
                <div className="py-6">
                    <div className="loader transition-all">Loading...</div>
                </div>
            </div>
        </div>
    );
}

export default UploadLoading;
