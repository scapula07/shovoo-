import React from 'react'
import { FaUsersViewfinder } from "react-icons/fa6";

export default function Hero() {
  return (
    <div className='w-full h-[80vh] bg-[#e6dffd] flex items-center'>
          <div className='w-[50%] flex flex-col pl-20'>
              <div className='w-full flex flex-col space-y-3'>
                   
                        {/* <h5 className='text-5xl font-extrabold'>
                          Seamless Media Automation: 
                        </h5> */}
                        <h5 className='text-5xl font-extrabold'> Streamline Your Image and Video Workflow in <span className='text-[#a42569]'>Seconds.</span></h5>
                        <h5 className='font-semibold text-lg text-slate-900'>Create, automate, and scale visual media workflows effortlessly with a no-code, drag-and-drop experience.</h5>
              </div>
              <div className='w-full flex items-center py-10 space-x-10'>
                   <button className='bg-[#a42569] py-2.5 px-6 text-white font-semibold'>
                      Try for free
                   </button>
                   <button className='bg-white py-2.5 px-6 rounded-sm text-[#a42569] font-semibold flex items-center space-x-4'>
                        <FaUsersViewfinder />
                        <span>Get a demo</span>  
                    </button>
              </div>
          </div>
          <div className='w-[50%]'>
              <img
                 src='/assets/hero.webp'
                 className='w-full'
              />
          </div>
    </div>
  )
}
