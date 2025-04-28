import React,{Dispatch,useState} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowUp, IoMdClose } from "react-icons/io";
import { MdOutlineQuestionMark,MdKeyboardArrowRight,MdRadioButtonUnchecked } from "react-icons/md";
import { GrClear } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { useRealtimeRun } from "@trigger.dev/react-hooks";
import { ClipLoader } from 'react-spinners';
import { formatDistanceToNow } from "date-fns";
import { IoMdDownload } from "react-icons/io";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function Logs({block,setOpen,workflow}:{block:any,setOpen:Dispatch<React.SetStateAction<boolean>>,  workflow:any}) {
  const { run, error } = useRealtimeRun(workflow?.runId, {
     accessToken: workflow?.accessToken , // This is required
  });
  const status= run?.status as string


  const downloadImagesAsZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("images");

    await Promise.all(
      run?.output?.images?.map(async (url:string, index:number) => {
        const proxiedUrl = `/api/image?url=${encodeURIComponent(url)}`;

        const response = await fetch(proxiedUrl);
        const blob = await response.blob();
        console.log(blob,"bb")
        const contentType = response.headers.get('content-type');
        const ext = contentType?.includes('png') ? 'png' : 'jpg'; // or parse it smarter
        folder?.file(`image-${index + 1}.${ext}`, blob);
        

      })
    );

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  };

  return (
    <div className='w-full'>
            <div className={`flex items-center w-full justify-between px-4 py-4 bg-gray-200`}>
                    <div className=''>
                        <h5 className='font-bold text-'>Logs</h5>
                    </div>

                    <div className='flex items-center space-x-3'>
                        <IoMdDownload  className='text-xl cursor-pointer' onClick={downloadImagesAsZip}/>
                        <IoMdClose
                          className='text-xl'
                          onClick={()=>setOpen(false)}
                        />
                    </div>
            </div>


            <div className='flex flex-col items-center'>
                     {["EXECUTING","QUEUED"]?.includes?.(status)&&
                          <div className='flex flex-col'>
                                <div className='flex w-full items-center py-4 space-x-2 justify-center'>
                                      <h5 className="text-sm font-light">Still Processing</h5>
                                      <ClipLoader color="purple" size={15}/>
                                </div>
                                <p>This might take a while to finish</p>
                            </div>
                      }

                    {["CANCELED","CRASHED","FAILED","SYSTEM_FAILURE","EXPIRED","TIMED_OUT","INTERRUPTED"]?.includes?.(status)&&
                          <div className='flex flex-col py-4'>
                                <p className='text-red-700'>Somethiing happened, Close and Retry again!</p>
                            </div>
                      }
                  
                        
                        
                          
                    {run?.status =="COMPLETED"&&
                      <DropDownMenu run={run}/>
                    }
             
            </div>
        

    </div>
  )
}



const DropDownMenu=({run}:any)=>{
    const [open,setOpen]=useState(false)
    const date = new Date(run?.finishedAt);
    const readable = formatDistanceToNow(date, { addSuffix: true });
    

   return(
      <div className='flex flex-col px-4 py-4 border-b w-full'>
           <div className='flex items-center justify-between w-full'>
                <h5 className='font-semibold text-xs '>Executed - {readable}</h5>
                {!open?
                    <IoIosArrowDown onClick={()=>setOpen(true)}/>
                    :
                    <IoIosArrowUp onClick={()=>setOpen(false)}/>
                }
               
           </div>
           {open&&
           <div className='w-full grid grid-cols-3  gap-4 py-8 '>
                 {run?.output?.images?.map((i:any)=>{
                    return(
                        <img src={i} className="h-44"/>
                      )
                 })}
             </div>
           }

      </div>
   )
}