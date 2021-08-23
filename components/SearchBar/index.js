import { SearchIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";

function SearchBar({ search, setSearch }) {
    return (
        <div className="libInput px-6 py-2 flex items-center flex-grow gap-6 bg-transparent border-2 border-grayDark rounded-st text-white">
            <SearchIcon className="h-5 text-grayLight" />
            <input
                placeholder="Search Playlist"
                className="p-0 bg-transparent w-full focus:outline-none"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            ></input>
            <XIcon
                onClick={() => {
                    setSearch("");
                }}
                className="h-5 click text-gray hover:text-white"
            />
        </div>
    );
}

export default SearchBar;
