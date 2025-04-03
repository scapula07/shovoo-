import React from 'react'
import { useRecoilValue } from 'recoil'
import { userStore } from '@/recoil'


export default function NavBar() {
  const user=useRecoilValue(userStore) as {email:'',id:''}
  return (
    <div className='w-full flex items-center px-10 py-4 border-b'>
          <div className='flex w-1/4'> 
          <h5 className='font-semibold poppins-bold text-4xl'>Shovoo<span className=' text-[#a42569] rounded-full'>!</span></h5>
          </div>

          <div className='flex w-full justify-end space-x-2'>
                {/* <button className='flex items-center border px-5 py-2 rounded-sm text-black text-sm'>
                    Contact Sales
                  </button>   
                 <button className='flex items-center bg-[#e6dffd] px-5 py-2 rounded-sm text-black text-sm font-bold'>
                     Upgrade
                 </button>    */}
                  <h5 className='border-[#a42569] border rounded-full font-bold text-xl h-10 w-10  flex items-center justify-center'>{user?.email?.slice(0,1)?.toUpperCase()}</h5>    

        
          </div>
    </div>
  )
}
