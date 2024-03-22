import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="fixed bg-purple-100 w-[284px] h-full px-8 py-32">
      <div className="flex items-center gap-4 cursor-pointer">
        <div>
          <Image
            src="/images/empty-profile.svg"
            alt="profile"
            width={74}
            height={74}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">홍길동님</h1>
          <h2 className="mt-2 text-xs font-medium text-white">마이페이지</h2>
        </div>
      </div>
      <div className="my-6">
        <Button className="bg-white">
          <Link href="/" className="flex justify-center items-center gap-3">
            <FaPlus className="text-purple-200" size={14} />
            <span className="text-purple-200 text-xl">퀀트 만들기</span>
          </Link>
        </Button>
      </div>
      <ul>
        <li className="py-2 border-b border-[#FFFFFF33] text-white text-xl font-bold cursor-pointer">
          <Link
            href="/mybank"
            className="block py-3 px-3 w-full h-full rounded-lg hover:bg-neutral-400/10 transition text-center"
          >
            내 계좌
          </Link>
        </li>
        <li className="py-2 border-b border-[#FFFFFF33] text-white text-xl font-bold cursor-pointer">
          <Link
            href="/inventory"
            className="block py-3 px-3 w-full h-full rounded-lg hover:bg-neutral-400/10 transition text-center"
          >
            퀀트 보관함
          </Link>
        </li>
        <li className="py-2 border-b border-[#FFFFFF33] text-white text-xl font-bold cursor-pointer">
          <Link
            href="/market"
            className="block py-3 px-3 w-full h-full rounded-lg hover:bg-neutral-400/10 transition text-center"
          >
            퀀트 마켓
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
