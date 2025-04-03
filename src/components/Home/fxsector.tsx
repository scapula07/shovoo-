import React from 'react'

export default function Fxsector() {
  return (
    <div className='flex flex-col py-20 w-full space-y-20 px-20'>
           <div className='flex w-full justify-between items-center space-x-20'>
               <div className='bg-  w-[60%]'>
                    <img src="/assets/scratch.png" className='w-full'/>

               </div>
               <div className='flex flex-col items-start space-y-8'>
                    <h5 className='text-5xl font-bold'>Start from scratch</h5>
                    <p className='text-2xl w-[70%] leading-[1.6]'>Build your custom workflows effortlessly from the ground up, tailored to your unique needs."</p>
                    <button className='bg-[#a42569] py-4 px-6 rounded-lg text-white font-bold'>Try it for free</button>

               </div>

           </div>
           <div className='flex flex-col w-full space-y-7 py-20 items-center'>
                <div className='flex flex-col items-center space-y-8'>
                  <h5 className='text-5xl font-bold'>Use a template</h5>
                  <p className='text-2xl leading-[1.6] text-center'>Choose from a library of customizable templates to fast-track your workflow creation.</p>
                  <button className='bg-[#a42569] py-4 px-6 rounded-lg  font-bold text-white'>Explore all templates</button>

               </div>
               <div className='py-8 w-full'>
                       <img src="/assets/templates.png" className='w-full'/>

               </div>
           

           </div>

    </div>
  )
}
