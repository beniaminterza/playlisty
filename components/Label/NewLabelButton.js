import { PlusCircleIcon, PlusSmIcon } from "@heroicons/react/outline";

function NewLabelButton({ onClick }) {
    return (
        <div
            className={`rounded-st flex items-center gap-1 click text-sm border-2 border-gray hover:border-grayLight hover:text-grayLight font-semibold px-4 py-1.5 bg-transparent
             text-gray`}
            onClick={onClick !== undefined ? onClick : null}
        >
            <PlusSmIcon className="h-4" />
            New Label
        </div>
    );
}

export default NewLabelButton;
