import React from 'react'
import { LiaSearchSolid } from "react-icons/lia";

export default function Connections() {
  return (
    <div className='h-full w-full'>

        <div className='bg-white w-full space-y-5 px-10 py-10'>
            <div className='flex flex-col w-full space-y-2'>
                 <h5 className='text-2xl font-bold'>Apps</h5>
                 <h5 className='text-slate-700 text-[1rem] font-semibold'> All apps connected to your Blink will show under connected apps.</h5>
            </div>
        </div>

        <div className='w-full py-10 flex flex-col items-center'>
              <div className='flex items-center'>
                  <div className='flex items-center w-full border border-slate-800 px-4 space-x-3'>
                       <LiaSearchSolid className='text-3xl'/>
                        <input 
                          className='py-2 w-full outline-none '
                          placeholder='Search templates or AI agents'
                        />  
                   </div>   

              </div>

        </div>
    </div>
  )
}
