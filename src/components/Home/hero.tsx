import React from 'react'
import { FaUsersViewfinder } from "react-icons/fa6";


export default function Hero() {
  return (
    <div className='w-full h-[80vh]  pt-20 flex items-center'>
          <div className='w-[50%] flex flex-col pl-20'>
             <div className="w-full flex flex-col space-y-3">
                <h5 className="text-5xl font-extrabold poppins-bold leading-[1.2]">
                  Automate Your Media Workflow — <span className="text-[#a42569]">No Code, All Power.</span>
                </h5>
                <h5 className="text-xl text-slate-900 poppins-medium leading-[1.7rem]">
                  Build smart automations for images, videos, and audio with drag-and-drop simplicity. Edit, process, and publish — all in one powerful platform.
                </h5>
              </div>

              <div className='w-full flex items-center py-10 space-x-10'>
                   <button className='bg-[#a42569] py-2.5 px-6 text-white font-semibold rounded-lg w-56'>
                      Start a free trial
                   </button>
                   {/* <button className='bg-white border border-[#a42569] py-2.5 px-6 rounded-lg text-[#a42569] font-semibold flex items-center space-x-4'>
                        <FaUsersViewfinder />
                        <span>Get a demo</span>  
                    </button> */}
              </div>
          </div>
          <div className='w-[50%]'>
              <img
                 src='/assets/hero.png'
                 className='w-full'
              />
          </div>
    </div>
  )
}
