import axios from "axios";
import { Fragment, useState } from "react";
import UploadError from "./UploadError";
import UploadLink from "./UploadLink";
import UploadLoading from "./UploadLoading";
import UploadNotFound from "./UploadNotFound";
import UploadSuccess from "./UploadSuccess";

function Upload({ setShowUpload }) {
    const [showUploadLink, setShowUploadLink] = useState(true);
    const [showUploadLoading, setShowUploadLoading] = useState(false);
    const [showUploadNotFound, setShowUploadNotFound] = useState(false);
    const [showUploadSuccess, setShowUploadSuccess] = useState(false);
    const [showUploadError, setShowUploadError] = useState(false);
    const [id, setId] = useState();

    const [input, setInput] = useState("");

    function cancel() {
        setShowUpload(false);
    }

    function upload() {
        const urlParams = new URLSearchParams(input);
        const list = urlParams.get("list");
        if (list !== null && list.length === 34) {
            //upload playlist
            setShowUploadLoading(true);
            setShowUploadLink(false);
            axios
                .post("/api/playlist", { playlistId: list })
                .then((res) => {
                    setShowUploadLoading(false);
                    setShowUploadSuccess(true);
                    setId(res.data.id);
                })
                .catch(function (error) {
                    setShowUploadLoading(false);
                    setShowUploadError(true);
                });
        } else {
            //error
            setShowUploadNotFound(true);
            setShowUploadLink(false);
        }
    }

    return (
        <Fragment>
            {/*Blur and darken background*/}
            <div
                className="fixed w-full z-1000 h-full left-0 top-0 bg-black opacity-70"
                onClick={cancel}
            ></div>

            {showUploadLink ? (
                <UploadLink
                    input={input}
                    setInput={setInput}
                    upload={upload}
                    cancel={cancel}
                />
            ) : showUploadLoading ? (
                <UploadLoading cancel={cancel} />
            ) : showUploadNotFound ? (
                <UploadNotFound
                    setShowUploadNotFound={setShowUploadNotFound}
                    setShowUploadLink={setShowUploadLink}
                    cancel={cancel}
                />
            ) : showUploadSuccess ? (
                <UploadSuccess cancel={cancel} id={id} />
            ) : showUploadError ? (
                <UploadError
                    cancel={cancel}
                    setShowUploadError={setShowUploadNotFound}
                    setShowUploadLink={setShowUploadLink}
                />
            ) : null}
        </Fragment>
    );
}

export default Upload;
