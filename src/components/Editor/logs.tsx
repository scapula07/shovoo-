import React,{Dispatch,useState} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowUp, IoMdClose } from "react-icons/io";
import { MdOutlineQuestionMark,MdKeyboardArrowRight,MdRadioButtonUnchecked } from "react-icons/md";
import { GrClear } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";


export default function Logs({block,setOpen}:{block:any,setOpen:Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className='w-full'>
            <div className={`flex items-center w-full justify-between px-4 py-4 bg-gray-200`}>
                    <div className=''>
                        <h5 className='font-bold text-'>Logs</h5>
                    </div>

                    <div className='flex items-center space-x-3'>
                        <GrClear />
                        <IoMdClose
                          onClick={()=>setOpen(false)}
                        />
                    </div>
            </div>


            <div className='flex flex-col'>
                  {[{}].map(()=>{
                    return(
                        <DropDownMenu />
                    )
                  })

                  }

            </div>
        

    </div>
  )
}



const DropDownMenu=()=>{
    const [open,setOpen]=useState(false)
   return(
      <div className='flex flex-col px-4 py-4 border-b'>
           <div className='flex items-center justify-between'>
                <h5 className='font-semibold text-xs '>Executed - 30s ago</h5>
                {!open?
                    <IoIosArrowDown onClick={()=>setOpen(true)}/>
                    :
                    <IoIosArrowUp onClick={()=>setOpen(false)}/>
                }
               
           </div>
           {open&&
           <div className='w-full grid grid-cols-3  gap-4 py-8 '>
                 {['/assets/1r.jpg','/assets/2r.jpg','/assets/3r.png']?.map((i)=>{
                    return(
                        <img src={i}/>
                      )
                 })}
             </div>
           }

      </div>
   )
}