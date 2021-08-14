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
                        className="click hover:text-white"
                        href="mailto:sattwikraj@playlisty.org"
                    >
                        sattwikraj@playlisty.org
                    </a>
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
                    <a
                        href="https://www.instagram.com/playlisty_org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white flex items-center"
                    >
                        <Image
                            src="/instagram_icon_white.svg"
                            height="20"
                            width="20"
                            className="click"
                        />
                    </a>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;
