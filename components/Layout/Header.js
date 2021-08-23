import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import User from "../User";
import { Fragment } from "react";

function Header({ setShowUpload, session, opacity }) {
    const [navbar, setNavbar] = useState(false);

    const addShadow = () => {
        if (window.scrollY > 0) {
            if (!navbar) setNavbar(true);
        } else setNavbar(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", addShadow);
    }, []);

    return (
        <header
            className={`border-b-2 border-grayDark sticky ${
                navbar && "shadow-header"
            } transition-shadow duration-200`}
            style={{
                backgroundColor: `rgba(35, 30, 35, ${
                    opacity === undefined ? "0.97" : opacity
                })`,
            }}
        >
            <nav className="res-width flex py-4 items-center gap-16">
                {/*Logo on the left side*/}
                <Link href="/">
                    <div className="flex gap-4 click">
                        <Image
                            src="/Playlisty_Logo.svg"
                            width="80"
                            height="35"
                        />
                    </div>
                </Link>

                {/*main links come here*/}
                <div className="flex-grow">
                    <Link href="/library">
                        <p className="text-white font-semibold click">
                            Library
                        </p>
                    </Link>
                </div>

                {/*right side*/}
                <div className="flex items-center gap-6">
                    {/*check if logged in or not*/}
                    {session ? (
                        <Fragment>
                            <button
                                onClick={() => setShowUpload(true)}
                                className="rounded-full click text-sm px-6 py-2 font-semibold border-2 border-gray text-white hover:border-grayLight hover:bg-bgLight3 transition-all"
                            >
                                Upload
                            </button>
                            <User
                                picture={session.user.image}
                                username={session.user.name}
                            />
                        </Fragment>
                    ) : (
                        <div className="rounded-full click text-sm px-6 py-2 font-semibold border-2 border-gray text-white hover:border-grayLight hover:bg-bgLight3 transition-all">
                            <Link href="/signin">Sign In</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
