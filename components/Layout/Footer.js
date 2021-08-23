import Link from "next/link";
import Image from "next/image";

function Footer() {
    return (
        <footer className="border-grayDark border-t-2">
            <nav className="res-width flex py-4 items-center justify-between gap-16">
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

                {/*Right side of footer*/}
                <div className="flex text-sm text-grayLight gap-10 items-center">
                    <a
                        href="https://github.com/beniaminterza/playlisty/pulls"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white click"
                    >
                        Contribuite
                    </a>
                    <a
                        href="https://github.com/beniaminterza/playlisty/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white click"
                    >
                        Report a Bug
                    </a>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;
