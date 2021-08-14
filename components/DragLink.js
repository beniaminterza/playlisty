import { LinkIcon } from "@heroicons/react/outline";

function DragLink() {
    return (
        <div className="bg-bgLight2 text-gray transition-all mt-6 rounded-st border-dashed border-2 border-gray hover:border-grayLight hover:text-grayLight flex justify-center">
            <div className="my-16 flex items-center gap-4">
                <LinkIcon className="h-5" />
                <p>Drop your playlist here</p>
            </div>
        </div>
    );
}

export default DragLink;
