import React from 'react'
import { FaUsersViewfinder } from "react-icons/fa6";
import { useRecoilValue } from 'recoil';
import { userStore } from '@/recoil';
import Link from 'next/link';

export default function Header() {
  const user=useRecoilValue(userStore) as {email:'',id:''}

  return (
    <div className='w-full flex items-center px-10 py-5 justify-between fixed bg-white'>
          <div className='w-[60%] flex items-center space-x-20 text-sm'> 
              <h5 className='font-semibold poppins-bold text-4xl'>Shovoo<span className=' text-[#a42569] rounded-full'>!</span></h5>
          </div>
          <div className='flex items-center space-x-8'>
               {/* <h5 className='text-[#a42569] font-semibold '>Log in</h5> */}
               {/* <button className='border border-[#a42569] py-2.5 px-6 rounded-lg text-[#a42569] font-semibold flex items-center space-x-4'>
                   <FaUsersViewfinder />
                   <span>Get a demo</span>  
               </button> */}
               {user?.id?.length ==undefined?
               <Link href={"/auth~"}>
                    <button className='border-[#a42569] text-[#a42569] py-2.5 px-6 border rounded-lg'>Create an account</button>
               </Link>
           
                            :
              <Link href={"/app/home"}>
                   <h5 className='border-[#a42569] border rounded-full font-bold text-xl h-10 w-10  flex items-center justify-center'>{user?.email?.slice(0,1)?.toUpperCase()}</h5>   
               </Link> 
               }


          </div>
    </div>
  )
}
