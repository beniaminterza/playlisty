import { CheckIcon, PlusIcon, XIcon } from "@heroicons/react/outline";

function Label({
    title,
    color,
    addLabel,
    onClick,
    remove,
    add,
    click,
    select,
    index,
    filter,
    setSelectedLabels,
    selectedLabels,
    setAllLabels,
    setPlaylistLabels,
    allLabels,
    playlistLabels,
    playlistId,
}) {
    return (
        <div
            className={`rounded-full w-max transition-all flex items-center ${
                click !== false && "click"
            } text-sm border-2 border-transparent ${
                select && `${"border-" + color}`
            } ${"hover:border-" + color} font-semibold w-max px-4 py-1.5 bg-${
                color + "Dark"
            } ${"text-" + color} ${
                addLabel &&
                "border-gray text-gray bg-transparent hover:border-white hover:text-white"
            }`}
            value={title}
            title={`${remove ? "Remove" : add ? "Add" : ""}`}
            onClick={
                onClick !== undefined
                    ? onClick
                    : filter
                    ? () => {
                          let array = [...selectedLabels];
                          const indexElement = array.indexOf(index);
                          if (indexElement > -1) {
                              array.splice(indexElement, 1);
                              setSelectedLabels(array);
                          } else {
                              setSelectedLabels((prev) => [...prev, index]);
                          }
                      }
                    : remove
                    ? () => {
                          let array = [...playlistLabels];

                          const index = array
                              .map((e) => e.title)
                              .indexOf(title);
                          console.log(index);
                          if (index !== -1) {
                              let element = { title: title, color: color };
                              fetch(
                                  `/api/playlist/${playlistId}/${element.title}`,
                                  {
                                      method: "DELETE",
                                  }
                              );
                              array.splice(index, 1);
                              setPlaylistLabels(array);
                              setAllLabels((prev) => [...prev, element]);
                          }
                      }
                    : add
                    ? () => {
                          let array = [...allLabels];

                          const index = array
                              .map((e) => e.title)
                              .indexOf(title);
                          console.log(index);

                          if (index !== -1) {
                              let element = { title: title, color: color };
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
                    : null
            }
        >
            <p className="w-max">{title}</p>
            {remove && <XIcon className="h-4 -mr-1 ml-2 click" />}
            {add && <PlusIcon className="h-5 -mr-1.5 ml-2 click" />}
            {filter && (
                <CheckIcon
                    className={`selectedBefore ${
                        select && "selectedAfter ml-2"
                    }`}
                />
            )}
        </div>
    );
}

export default Label;
