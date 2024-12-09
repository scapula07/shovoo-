import React from 'react'

export default function NavBar() {
  return (
    <div className='w-full flex items-center px-10 py-4 border-b'>
          <div className='flex w-1/4'> 
             <h5>Media</h5>
          </div>

          <div className='flex w-full justify-end space-x-2'>
                <button className='flex items-center border px-5 py-2 rounded-sm text-black text-sm'>
                    Contact Sales
                  </button>   
                 <button className='flex items-center bg-[#e6dffd] px-5 py-2 rounded-sm text-black text-sm font-bold'>
                     Upgrade
                 </button>   
                 <h5 className='rounded-full h-10 w-10 flex items-center justify-center bg-purple-400'>
                    BO
                 </h5>
          </div>
    </div>
  )
}
