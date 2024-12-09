import React, { useState,Dispatch } from 'react'
import { MdAdd } from "react-icons/md";
import { IoMdList } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FiSearch ,FiUploadCloud} from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import Block from './block';
import { FaShopify } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa";
// import { PiPlugsBold } from "react-icons/pi";
import { FiLayers } from "react-icons/fi";

export default function Blocks({setOpenLog}:{setOpenLog:Dispatch<React.SetStateAction<boolean>>}) {

     const [close,setClose]=useState<boolean>(false)

  return ( 
    <div className='w-full h-full  py-4 bg-white border-r' >
        {close?
            <SideToolBar
                setOpenLog={setOpenLog}
             />
               :
            <div className='flex h-full w-full'>
                <SideToolBar
                    setOpenLog={setOpenLog}
                />
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

                     <div className='w-full flex flex-col space-y-4 py-4 h-full overflow-y-scroll'>
                         {[
                           {
                              label:"Integrations",
                              blocks:[
                                 {
                                    text:"Shopify",
                                    icon:<FaShopify className='text-green-600'/>,
                                    type:'app', 
                                 },
                                ]
                             },     
                            {
                                label:"Triggers",
                                blocks:[
                                   {
                                      text:"New product",
                                      icon:<FaShopify />,
                                      type:'app',
                                      
                                   },
                                   {
                                    text:"Batch",
                                    icon:<FiLayers />,
                                    type:'tooling'
                                   },
                                   {
                                      text:"Schedular",
                                      icon:<FiClock />,
                                      type:'tooling'
                                    }
                                 ]
                            },
                            {
                              label:"AI & APIs",
                              blocks:[
                                 {
                                    text:"Transcoding",
                                    icon:<FaShopify />,
                                    type:'app',
                                    
                                 },
                                 {
                                    text:"Image-to-image",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Image-to-text",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Text-to-image",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  }
                               ]
                            },
                            {
                              label:"Add-ons",
                              blocks:[
                                 {
                                    text:"Background removal",
                                    icon:<FaShopify />,
                                    type:'app',           
                                 },
                                 {
                                    text:"Image moderation",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                 {
                                    text:"Image captioning",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Image tagging",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Video tagging",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  }
                               ]
                            },
                            {
                              label:"Transformation",
                              blocks:[
                                 {
                                    text:"Edit Media",
                                    icon:<FaShopify />,
                                    type:'app',                 
                                 },
                                 {
                                    text:"Crop Media",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Apply Background",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Resize",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Text overlay",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Image overlay",
                                    icon:<FiClock />,
                                    type:'tooling'
                                  }
                               ]
                            },
                            {
                                label:"Flow logic",
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


const SideToolBar=({setOpenLog}:{setOpenLog:Dispatch<React.SetStateAction<boolean>>})=>{
     return(
        <div className='h-full flex flex-col space-y-4 border-r w-[14%] items-center '>
        {[
          {
            icon:<MdAdd/>,
            text:"Add blocks",
            click:()=>{}
           },
           {
            icon:<IoMdList/>,
            text:"Logs",
            click:()=>setOpenLog(true)
           },
           {
             icon:<FaPuzzlePiece />,
             text:'Templates',
             click:()=>{}
           },
         //   {
         //    icon:<PiPlugsBold />,
         //    text:'Connections'
         //   }
         ]?.map((item)=>{
              return(
                <h5 className='text-2xl font-semibold' onClick={item.click}>{item?.icon}</h5>
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
                   })}
               </div>
             }

        </div>
     )
}