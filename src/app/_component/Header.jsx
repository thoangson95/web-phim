import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import ThemeToggle from "./ThemeToggle";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "antd";
import BtnLogin from "./BtnLogin";

const Header = async () => {
    const session = await auth();

    return (
        <header className="dark:bg-main bg-gray-100">
            <div className="border-b dark:border-white border-gray-400 border-solid">
                <div className="container flex items-center justify-between flex-wrap mx-auto">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                className="w-full h-full object-cover"
                                src="/images/logo.jpg"
                                alt="Image"
                                width={243}
                                height={52}
                                priority={true}
                                quality={100}
                            />
                        </Link>
                    </div>
                    <Menu />
                    <BtnLogin session={session} />
                    <ThemeToggle />
                </div>
            </div>
            {/* <div className="relative">
                <div className="container flex items-center justify-between flex-wrap mx-auto gap-2 py-3">
                    <SearchOutlined className='text-gray-500' />
                    <input type="text" className='flex-1 outline-none border-none bg-transparent dark:text-white text-black' />
                </div>
            </div> */}
        </header>
    );
};

export default Header;
