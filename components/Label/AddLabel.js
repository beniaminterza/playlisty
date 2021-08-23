import { Fragment } from "react";
import HorizontalLine from "../HorizontalLine";
import Label from "./Label";
import NewLabelButton from "./NewLabelButton";

function AddLabel({
    setShowAddLabel,
    setShowNewLabel,
    allLabels,
    playlistLabels,
    setPlaylistLabels,
    setAllLabels,
    playlistId,
}) {
    function removeLabel(e) {
        let title = e.target.textContent;
        console.log(title);
        console.log(e.target.innerHTML);

        let array = [...allLabels];

        const index = array.map((e) => e.title).indexOf(title);
        console.log(index);

        if (index !== -1) {
            let element = { title: title, color: array[index].color };
            fetch(`/api/playlist/${playlistId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(element),
            });
            array.splice(index, 1);
            setAllLabels(array);
            setPlaylistLabels((prev) => [...prev, element]);

            //remove from database
        }
    }

    return (
        <Fragment>
            {/*Blur and darken background*/}
            <div
                onClick={() => {
                    setShowAddLabel(false);
                    setShowNewLabel(false);
                }}
                className="fixed w-full z-1000 h-full left-0 top-0 bg-black opacity-50 blurBg"
            ></div>

            <div className="bg-bgLight5 z-10000  border-2 fixed centerAbsolute border-st border-grayDark rounded-st">
                <div className="p-8 w-32.25 min-h-80">
                    <h5 className="text-white text-semibold text-xl">Labels</h5>
                    <div className="flex gap-4 mt-4 flex-wrap">
                        {playlistLabels.map((element) => {
                            return (
                                <Label
                                    title={element.title}
                                    color={element.color}
                                    remove={true}
                                    key={element.title}
                                    playlistLabels={playlistLabels}
                                    setPlaylistLabels={setPlaylistLabels}
                                    setAllLabels={setAllLabels}
                                    playlistId={playlistId}
                                />
                            );
                        })}
                    </div>
                    <h6 className="text-white text-semibold mt-6">
                        Add Labels
                    </h6>
                    <div className="flex gap-4 mt-4 flex-wrap">
                        {allLabels.map((element) => {
                            return (
                                <Label
                                    title={element.title}
                                    color={element.color}
                                    add={true}
                                    onClick={removeLabel}
                                    key={element.title}
                                    allLabels={allLabels}
                                    setAllLabels={setAllLabels}
                                    setPlaylistLabels={setPlaylistLabels}
                                    playlistId={playlistId}
                                />
                            );
                        })}
                        <Label
                            title="Create Label"
                            addLabel={true}
                            onClick={() => {
                                setShowNewLabel(true);
                            }}
                        />
                    </div>
                </div>

                <HorizontalLine />

                <div className="p-8 flex gap-4">
                    <button
                        className="rounded-full click px-6 py-1.5 font-semibold border-2 border-gray text-white hover:border-grayLight hover:bg-bgLight3 transition-all"
                        onClick={() => {
                            setShowAddLabel(false);
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default AddLabel;
