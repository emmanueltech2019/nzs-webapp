import Link from 'next/link';
import { FC } from 'react';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';

const Header: FC = () => {
  return (
    <div className="flex justify-between px-10 py-14 py-6 w-full">
      <h1 className="text-3xl font-bold">Hi User!</h1>
      <div className="flex space-x-4">
        <FiSearch className="text-2xl" />
        <Link href={"./dashboard/cart"}>
        <div className="relative">
          <FiShoppingBag className="text-2xl" />
          <span className="absolute top-0 right-0 bg-[#006838] text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
            9
          </span>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
