import React from 'react'

export default function Fxsector() {
  return (
    <div className='flex flex-col py-20 w-full space-y-20 px-20'>
           <div className='flex w-full justify-between items-center'>
               <div className='bg- h-96 w-1/2'>

               </div>
               <div className='flex flex-col items-start space-y-8'>
                    <h5 className='text-5xl font-bold'>Start from scratch</h5>
                    <button className='bg-[#a42569] py-4 px-6 rounded-sm text-white font-bold'>Try it for free</button>

               </div>

           </div>
           <div className='flex w-full justify-between py-20 items-center'>
                <div className='flex flex-col items-start space-y-8'>
                  <h5 className='text-5xl font-bold'>Use a template</h5>
                  <button className='bg-[#a42569] py-4 px-6 rounded-sm  font-bold text-white'>Explore templates</button>

               </div>
               <div className=' h-96 w-1/2'>

               </div>
           

           </div>

    </div>
  )
}
