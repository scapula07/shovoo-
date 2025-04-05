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
import { FaFolderOpen ,FaRegImages,FaRegImage,FaCropSimple} from "react-icons/fa6";
import { FiLayers } from "react-icons/fi";
import { FaTextSlash } from "react-icons/fa6";
import { TbBackground,TbResize } from "react-icons/tb";
import { TfiLayoutMediaOverlay } from "react-icons/tfi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { Tooltip } from 'react-tooltip'

export default function Blocks({setOpenLog}:{setOpenLog:Dispatch<React.SetStateAction<boolean>>}) {

     const [close,setClose]=useState<boolean>(false)

  return ( 

    <div className={close?'h-full border-r py-4 w-[4%]':'w-1/3 h-full  py-4 bg-white border-r'} >
        {close?
            <SideToolBar
                setOpenLog={setOpenLog}
                setClose={setClose}
                close={close}
             />
               :
            <div className='flex h-full w-full'>
                <SideToolBar
                    setOpenLog={setOpenLog}
                    setClose={setClose}
                    close={close}
                />
          
                <div className='w-full px-4 space-y-4'>
                     <div className='w-full flex justify-between items-center'>
                          <h5 className='text-lg font-semibold'>Add Block</h5>
                          <IoMdClose className='text-xl' onClick={()=>setClose(true)}/>
                     </div>
                     {/* <div className='flex items-center border rounded-lg py-1  border-gray-600 px-4'>
                         <input
                           className='outline-none'
                           placeholder='Search blocks...'
                          />
                         <FiSearch />
                     </div> */}
             
                     <div className='w-full flex flex-col space-y-4 py-4 h-full overflow-y-scroll'>
                         {[
                           {
                              label:"Source & Integrations",
                              blocks:[
                                 {
                                    text:"Local/Folder",
                                    icon:<FaFolderOpen className='text-[#e6dffd]'/>,
                                    type:'app', 
                                 },
                                 {
                                    text:"Shopify",
                                    icon:<FaShopify className='text-green-600'/>,
                                    type:'app', 
                                 },
                          
                                ]
                             },     
                            {
                              label:"AI",
                              blocks:[
                                 {
                                    text:"Image-to-image",
                                    icon:<FaRegImages />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Image-to-text",
                                    icon:<FaTextSlash />,
                                    type:'tooling'
                                  }
                               ]
                            },
            
                            {
                              label:"Transformation",
                              blocks:[
                                 {
                                    text:"Crop Media",
                                    icon:<FaCropSimple />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Apply Background",
                                    icon:<TbBackground />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Resize",
                                    icon:<TbResize />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Text overlay",
                                    icon:< TfiLayoutMediaOverlay />,
                                    type:'tooling'
                                  },
                                  {
                                    text:"Background removal",
                                    icon:<IoMdRemoveCircleOutline />,
                                    type:'tooling',           
                                 },
                               ]
                            },
                           //  {
                           //      label:"Flow logic",
                           //      blocks:[
                           //         {
                           //            text:"Condition",
                           //            icon:<FiClock />
                           //          },
                           //         {
                           //            text:"Complex Condition",
                           //            icon:<FiUploadCloud />
                           //         },
                           //         {
                           //            text:"Wait For All",
                           //            icon:<FiClock />
                           //         },
                           //         {
                           //            text:"Apply For Each",
                           //            icon:<FiClock />
                           //         },
                           //         {
                           //            text:"Delay",
                           //            icon:<FiClock />
                           //         }   
                           //       ]
                           //      },

                 
 
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


const SideToolBar=({setOpenLog,close,setClose}:{setOpenLog:Dispatch<React.SetStateAction<boolean>>,close:boolean,setClose:Dispatch<React.SetStateAction<boolean>>})=>{
     return(
      
        <div className={close?'h-full flex flex-col space-y-4  w-full items-center ':'h-full flex flex-col space-y-4 border-r w-[14%] items-center'}>
        {[
            {
               icon:<MdAdd/>,
               text:"Add block",
               click:()=>setClose(false)
               },
           {
            icon:<IoMdList/>,
            text:"See Logs",
            click:()=>setOpenLog(true)
           },
         ]?.map((item)=>{
              return(
               <div className='w-full'> 
                {!close&&item.text=="See Logs"&&
                    <>
               
                     <h5
                        className='text-2xl font-semibold' onClick={item.click}
                        data-tooltip-id={item.text}
                        data-tooltip-content={item.text}
                        data-tooltip-place="bottom"
                        >
                        {item?.icon} 
                      
                     </h5>
                     <Tooltip id={item.text} place="top" className='bg-white text-xs'/>
                     </>
                  }
                  {close&&
                    <div className='flex flex-col space-y-2 w-full items-center'>
                        <h5
                           className='text-2xl font-semibold ' onClick={item.click}
                           >
                           {item?.icon} 
                     </h5>
                       <h5 className='text-xs w-full'>{item?.text}</h5>

                    </div>
            
                 }
                
               </div>
    
      
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