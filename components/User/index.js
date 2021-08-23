import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";

function User({ username, picture }) {
    return (
        <div className="group relative flex gap-4 py-1 items-center font-medium click pl-6">
            <Image
                src={picture}
                width="25"
                height="25"
                className="rounded-full"
                objectFit="contain"
            />
            <p className="text-white text-sm font-semibold group-hover:text-white">
                {username}
            </p>
            {/*<ChevronDownIcon className="text-gray h-4 group-hover:text-white" />*/}

            <div className="absolute h-8 w-full -bottom-8 right-0 bg-trasparent"></div>

            <div className="absolute text-sm right-0 -bottom-24 bg-bgLight2 rounded-st filter shadow-account py-4 hidden group-hover:block text-white">
                <button
                    onClick={signOut}
                    className="px-8 py-2 flex gap-4 items-center hover:bg-bgLight7"
                >
                    Sign out
                    <LogoutIcon className="h-5" />
                </button>
            </div>
        </div>
    );
}

export default User;
