import React from 'react'
import { MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Toolbar() {
  return (
    <div className='w-full flex px-10 py-8 border-b justify-between'>
         <div className='flex w-1/2 '>
            <div className='flex items-center border-r-2 border-slate-700 px-4 '>
                 <input 
                   className='w-36 border-0 outline-none'
                  placeholder='Unnamed project'
                 />
                 <MdEdit className='text-gray-600 font-bold text-xl'/>
            </div>

         </div>

         <div className='flex items-center justify-end space-x-6'>
             <button className='text-sm bg-gray-200 px-4 py-2'>Save changes</button>
             <button className='flex items-center bg-[#e6dffd] px-4 py-2 rounded-sm text-black text-sm'>
                Publish 
             </button>   
             <BsThreeDotsVertical /> 
        </div>

    </div>
  )
}
