import React,{ReactNode} from 'react'
import NavBar from './navbar'
import { RxHome } from "react-icons/rx";
import { BsPuzzleFill } from "react-icons/bs";
import { GoWorkflow } from "react-icons/go";
import { FaRegClock } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { RiApps2AddFill } from "react-icons/ri";
import Link from 'next/link';
type Props={
    children:ReactNode
}
export default function Layout({children}:Props) {
  return (
    <div className='w-full h-screen'>
          <div className='w-full'>
               <NavBar />
          </div>

          <div className='w-full flex h-full '>
             <div className='w-[25%] h-full flex flex-col py-8  bg-white'>
                 <div className='flex flex-col px-4 border-b pb-4 space-y-2'>
                        {[
                            {
                                icon:<RxHome />,
                                text:'Home'
                            },
                            // {
                            //     icon:<BsPuzzleFill />,
                            //     text:'Discover'
                            // },
                            
                            ]?.map((item)=>{
                            return(
                                <div className={
                                    `flex items-center space-x-3 bg-[#e6dffd] text-gray-700 hover:font-semibold hover:text-purple-600  py-2 px-2 rounded-lg `
                                    }>
                                      <h5 className='text-lg'>{item?.icon}</h5>
                                      <h5 className='text-sm'>{item?.text}</h5>
                                </div>
                            )})}

                 </div>
                 <div className='flex flex-col px-4 py-6 space-y-6'>
                        {[
                            {
                                icon:<GoWorkflow />,
                                text:'Workflows',
                                link:"/editor/i"
                            },
                            // {
                            //     icon:<MdSettings />,
                            //     text:'Settings'
                            // },
                            ]?.map((item)=>{
                            return(
                               
                                    <div className='flex items-center space-x-3 text-gray-700  opacity-50  py-2 px-2 rounded-lg'>
                                            <h5 className='text-lg'>{item?.icon}</h5>
                                            <h5 className='text-sm'>{item?.text}</h5>
                                    </div>
                              
                  
                            )})}

                 </div>
      

             </div>

             <div className='w-full h-full bg-[#f9f9f9]'>
                {children}
             </div>       
          </div>

    </div>
  )
}
