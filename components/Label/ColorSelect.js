import { CheckIcon } from "@heroicons/react/outline";

function ColorSelect({ color, setColor, isColor }) {
    return (
        <div
            className={`h-6 group w-6 rounded-full bg-${color} click border-2 border-transparent hover:border-${color} hover:bg-${color}Dark flex items-center justify-center`}
            onClick={() => setColor(color)}
        >
            {isColor === color && (
                <CheckIcon
                    className={`h-5 text-${color}Dark group-hover:text-${color}`}
                />
            )}
        </div>
    );
}

export default ColorSelect;
