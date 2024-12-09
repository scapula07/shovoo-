import React, { useState ,Dispatch} from 'react'
import { MdKeyboardArrowRight,MdRadioButtonUnchecked } from "react-icons/md";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default function AIblock({setOpen,setOpenLog}:{setOpen:Dispatch<React.SetStateAction<boolean>>,setOpenLog:Dispatch<React.SetStateAction<boolean>>}) {
    const [isLoading,setLoading]=useState(false)
    const [next,setNext]=useState(false)

    const go=async()=>{
         setLoading(true)
         await sleep(3000)
         setNext(true)
         setLoading(false)
      }
    const publish=async()=>{
        setLoading(true)
        await sleep(45000)
        setOpen(false)
        toast('👏 Batch completed!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          
            });
        setOpenLog(true)
        setLoading(false)
     }
  return (
    <div className='w-full h-full px-4'>
        <div className='w-full flex space-x-3 items-center border-b px-4 py-2'>
              <h5 className='flex items-center space-x-2 text-slate-700'>
                  <span className='font- text-lg'>Configure</span>
              </h5>
              <MdKeyboardArrowRight />
        </div>
        <div className='flex flex-col space-y-4 py-4'>
            <h5>Prompt*</h5>
            <textarea 
               placeholder='convert image background to black'
               className='py-2 h-28 px-4 border border-black rounded-lg'
            />
    
        </div>


        <div className='pt-20 px-4'>
                 {next?
                     <button className='bg-purple-400 py-2 text-  font- px-4 w-full'
                       onClick={publish}
                      >
                           {isLoading?
                             <ClipLoader/>
                             :
                             "Run"
                           }
                       </button>  
                       :
                    <button className='bg-purple-500 py-2 text- text-white font- px-4 w-full'
                      onClick={go}
                      >
                       {isLoading?
                         <ClipLoader size={12}/>
                         :
                         "Continue"
                       }
                   </button>                  

                 }
        </div> 
    </div>
  )
}
