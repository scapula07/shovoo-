import React, { useState, useRef, useEffect } from 'react'
import { FaUsersViewfinder } from "react-icons/fa6";
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userStore } from '@/recoil';
import Link from 'next/link';

export default function Header() {
  const user = useRecoilValue(userStore) as { email: string, id: string };
  const resetUser = useResetRecoilState(userStore);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    resetUser();
    setDropdownOpen(false);
    // You can also add redirection here if you want, like router.push('/')
  };

  return (
    <div className='w-full flex items-center px-10 py-5 justify-between fixed bg-white z-50'>
      <div className='w-[60%] flex items-center space-x-20 text-sm'> 
        <h5 className='font-semibold poppins-bold text-4xl'>Shovoo<span className='text-[#a42569] rounded-full'>!</span></h5>
      </div>

      <div className='flex items-center space-x-8 relative'>
        {user?.id?.length === undefined ? (
          <Link href="/auth~">
            <button className='border-[#a42569] text-[#a42569] py-2.5 px-6 border rounded-lg'>Create an account</button>
          </Link>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='border-[#a42569] border rounded-full font-bold text-xl h-10 w-10 flex items-center justify-center'
            >
              {user?.email?.slice(0,1)?.toUpperCase()}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
                <Link href="/app/home">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Dashboard</button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
