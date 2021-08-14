import { useState } from "react";
import { Fragment } from "react";
import HorizontalLine from "./HorizontalLine";
import ColorSelect from "./ColorSelect";
import { ArrowLeftIcon } from "@heroicons/react/outline";

function NewLabel({
    setShowAddLabel,
    setShowNewLabel,
    allLabels,
    playlistLabels,
    setAllLabels,
}) {
    const [color, setColor] = useState("white");
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    function addLabel() {
        if (input === "") {
            setError("Please enter a title!");
            return;
        } else if (
            playlistLabels.some((e) => e.title === input) ||
            allLabels.some((e) => e.title === input)
        ) {
            setError("This label already exists, please choose another title!");
            return;
        }
        setError(false);
        setShowNewLabel(false);
        setAllLabels((prev) => [...prev, { color: color, title: input }]);
        //Add to Databasej
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
                <div className="p-8 w-32.25">
                    <div className="flex justify-between">
                        <h5 className="text-white text-semibold text-xl">
                            New Label
                        </h5>
                        <button
                            className="text-gray flex gap-2 items-center hover:text-grayLight transition-all hover:underline"
                            onClick={() => {
                                setShowNewLabel(false);
                            }}
                        >
                            <ArrowLeftIcon className="h-4" />
                            Back
                        </button>
                    </div>
                    <p className="mt-4 text-gray text-sm">Title</p>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        placeholder="Label title"
                        className={`focus:outline-none mt-2 rounded-full transition-all text-sm border-2 border-transparent hover:border-${color} focus:border-${color} font-semibold w-max px-4 py-1.5 bg-${
                            color + "Dark"
                        } text-${color}`}
                    />

                    <p className="mt-4 text-gray text-sm ">Color</p>
                    <div className="flex mt-3 gap-4 justify-between">
                        <ColorSelect
                            color="white"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="red"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="pink"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="purple"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="blue1"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="blue2"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="turqoise"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="green"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="yellow"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="orange1"
                            isColor={color}
                            setColor={setColor}
                        />
                        <ColorSelect
                            color="orange2"
                            isColor={color}
                            setColor={setColor}
                        />
                    </div>
                    {error && <p className="text-primary mt-6">{error}</p>}
                </div>

                <HorizontalLine />

                <div className="p-8 flex gap-4">
                    <button
                        onClick={() => {
                            setShowAddLabel(false);
                            setShowNewLabel(false);
                        }}
                        className="rounded-full click px-6 py-1.5 font-semibold border-2 border-gray text-gray hover:text-grayLight hover:border-grayLight hover:bg-bgLight3 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            addLabel();
                        }}
                        className="rounded-full click px-6 py-1.5 font-semibold border-2 border-primary text-primary hover:bg-bgLight3 transition-all"
                    >
                        Add
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default NewLabel;
