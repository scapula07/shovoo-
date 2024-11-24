import React, { useState } from 'react'
import { MdAdd } from "react-icons/md";
import { IoMdList } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FiSearch ,FiUploadCloud} from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import Block from './block';


export default function Blocks() {
     const [close,setClose]=useState<boolean>(false)

  return ( 
    <div className='w-full h-full  py-4 bg-white border-r' >
        {close?
            <SideToolBar />
               :
            <div className='flex h-full w-full'>
                <SideToolBar/>
                <div className='w-full px-4 space-y-4'>
                     <div className='w-full flex justify-between items-center'>
                          <h5 className='text-lg font-semibold'>Add Block</h5>
                          <IoMdClose className='text-xl'/>
                     </div>
                     <div className='flex items-center border rounded-lg py-1  border-gray-600 px-4'>
                         <input
                           className='outline-none'
                           placeholder='Search blocks...'
                          />
                         <FiSearch />
                     </div>

                     <div className='w-full flex flex-col space-y-4 py-4'>
                         {[
                            {
                                label:"Triggers",
                                blocks:[
                                   {
                                      text:"Media upload",
                                      icon:<FiUploadCloud />
                                   },
                                   {
                                      text:"Schedular",
                                      icon:<FiClock />
                                    }
                                 ]
                            },
                            {
                                label:"Flow Logic",
                                blocks:[
                                  {
                                     text:"Condition",
                                     icon:<FiClock />
                                    },
                                   {
                                      text:"Complex Condition",
                                      icon:<FiUploadCloud />
                                   },
                                   {
                                      text:"Wait For All",
                                      icon:<FiClock />
                                   },
                                   {
                                      text:"Apply For Each",
                                      icon:<FiClock />
                                   },
                                   {
                                      text:"Delay",
                                      icon:<FiClock />
                                     }
                              
                                 ]
                                },
                           ]?.map((item)=>{
                             return(
                                <DropDownMenu 
                                  item={item}
                                 />
                             )
                         })

                          }
                     </div>
                </div>
            </div>
        }
  
     
    </div>
  )
}


const SideToolBar=()=>{
     return(
        <div className='h-full flex flex-col space-y-4 border-r w-[14%] items-center '>
        {[
          {
            icon:<MdAdd/>,
            text:"Add blocks"
           },
           {
            icon:<IoMdList/>,
            text:"Logs"
           }
         ]?.map((item)=>{
              return(
                <h5 className='text-2xl font-semibold'>{item?.icon}</h5>
            )})}

    </div>
     )
}


const DropDownMenu=({item}:{item:any})=>{
      const [open,setOpen]=useState(true)
     return(
        <div className='flex flex-col'>
             <div className='flex items-center justify-between'>
                  <h5 className='font-semibold text-xs '>{item?.label}</h5>
                   <IoIosArrowDown />
             </div>
             {open&&
               <div className='w-full flex flex-col space-y-4 py-2'>
                   {item?.blocks?.map((blk:any)=>{
                      return(
                        <Block
                          item={blk}
                         />
                      )
                   })

                   }
                </div>
             }

        </div>
     )
}