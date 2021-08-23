import axios from "axios";
import { Fragment } from "react";
import { useRouter } from "next/router";

function Delete({ setShowDelete, id }) {
    const router = useRouter();
    function deleteHandler() {
        axios.delete(`/api/playlist/${id}`).then((res) => {
            console.log(res.data);
            router.push("/library");
        });
    }
    return (
        <Fragment>
            <div
                onClick={() => setShowDelete(false)}
                className="fixed w-full z-1000 h-full left-0 top-0 bg-black opacity-50 blurBg"
            ></div>
            <div className="bg-bgLight5 text-center z-10000 border-2 p-10 fixed centerAbsolute border-st border-grayDark rounded-st">
                <h5 className="text-xl font-semibold">
                    You are about to delete a playlist
                </h5>
                <p className="mt-4 text-sm text-grayLight">
                    This will delete your playlist from your library.
                    <br /> Are you sure?
                </p>
                <div className="mt-8 flex gap-4 justify-center">
                    <button
                        onClick={() => setShowDelete(false)}
                        className="rounded-full w-full click px-6 py-1.5 font-semibold border-2 border-gray text-white hover:border-grayLight hover:bg-bgLight3 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteHandler}
                        className="btn rounded-full w-full py-1.5 border-primary text-primary hover:bg-bgLight3"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default Delete;
