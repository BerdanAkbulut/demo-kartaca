import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import kartacagif from '../public/kartaca-gif.gif';
type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  const logout = () => {
    Cookies.remove('user');
    router.push('/signin')
  };
  return (
    <div className="sticky top-0 flex flex-row items-center justify-between sm:py-1 md:py-4 px-12  bg-slate-100 z-50">
      <Image src={kartacagif} alt="kartacagif" />

      <button
        onClick={logout}
        className="fontHandWriting text-2xl bg-slate-900 text-white p-3 rounded-lg font-bold tracking-widest hover:bg-slate-700 transition-all ease-in-out duration-300 hover:scale-95 "
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
