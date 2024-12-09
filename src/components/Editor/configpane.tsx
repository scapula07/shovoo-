import React ,{Dispatch,useState} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { MdOutlineQuestionMark,MdKeyboardArrowRight,MdRadioButtonUnchecked } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { blocks } from '@/lib/blockConfig';
import Batch from './batch';
import AIblock from './aiblock';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';


export default function Configpane({block,setOpen,setBlock,setOpenLog}:{block:any,setOpen:Dispatch<React.SetStateAction<boolean>>,setBlock:Dispatch<React.SetStateAction<any>>,setOpenLog:Dispatch<React.SetStateAction<boolean>>}) {
    const item = blocks.find(blk => blk.text ===block);
       if(block==='Shopify'){
        return(
            <div className='w-full'>
                <TopBar 
                    block={block}
                    setOpen={setOpen}
                    item={item}
                />
                <AppIntegration 
                    block={block}
                    item={item}
                />
            </div>
           )
       }
  return (
    <div className='w-full h-full '>
         <TopBar 
            block={block}
            setOpen={setOpen}
            item={item}
          />
          <Tooling 
            block={block}
            setOpen={setOpen}
            item={item}
            setBlock={setBlock}
            setOpenLog={setOpenLog}
          />
    </div>
  )
}



const AppIntegration=({block,item}:{block:any,item:any})=>{
      const [isLoading,setLoading]=useState(false)
      const connect=async()=>{
           setLoading(true)
         try{
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    },
                };
  
            const res=await axios.get("https://20f6-104-28-220-44.ngrok-free.app/api/shopify/auth?shop=dochje.myshopify.com",config)
            console.log(res)
            setLoading(false)
         }catch(e){
            setLoading(false)
         }
      }
    return(
     <div className='w-full h-full '>
        <div className='w-full flex flex-col   py-2'>
              <div className='w-full flex space-x-3 items-center border-b px-4 py-2'>
                      <h5 className='flex items-center space-x-2 text-slate-700'>
                          <span className='font- text-lg'>Connect</span>
                          <MdRadioButtonUnchecked />        
                      </h5>
                      <MdKeyboardArrowRight />
                      <h5 className='flex items-center  text-slate-700 space-x-2'>
                          <span className='font- text-lg'>Test</span>
                          <MdRadioButtonUnchecked />    
                      </h5>
              </div>


              <div className='flex flex-col px-4 py-6 space-y-8'>
                     <div className='flex flex-col space-y-4'>
                          <h5>App*</h5>
                          <input
                            placeholder='Store name, ' 
                            className='border py-3 px-2 rounded-sm '
                           />
                          <div className='flex items-center border justify-between px-4 py-2 rounded-lg'>
                              <h5 className='flex items-center space-x-1'>
                                  <FaShopify />
                                  <span>Shopify</span>
                              </h5>
                              <button className='bg-green-500 py-2 text- text-white font- px-4'
                                onClick={connect}
                               >
                                {isLoading?
                                   <ClipLoader size={12} />
                                   :
                                   "Create connection"
                                }
                               
                             </button>
                          </div>
                     </div>

                     <div>
                         <p className='text-xs'>Shopify is a secure partner. Your credentials are encrypted and can be removed at any time. You can manage all of your connected accounts here.</p>
                     </div>

                     {/* <div className='py-8'>
                         <button className='bg-green-500 py-2 text- text-white font- px-4 w-full'>Continue</button>
                          
                     </div> */}
              </div>
        </div>
   </div>
    )
}


const TopBar=({block,setOpen,item}:{block:any,setOpen:Dispatch<React.SetStateAction<boolean>>,item:any})=>{
  return(
   <div className='w-full'>
        <div className={`flex items-center w-full justify-between px-4 py-4 ${block==='Shopify'?'bg-green-500':'bg-[#e6dffd]'}`}>
                 <div className=''>
                     <h5 className='font-bold text-sm'>{block}</h5>
                 </div>
 
                 <div className='flex items-center space-x-3'>
                     <BsThreeDotsVertical/>
                     <MdOutlineQuestionMark/>
                     <IoMdClose
                         onClick={()=>setOpen(false)}
                     />
                 </div>
          </div>
       </div>
       )
}


const Tooling=({block,setOpen,item,setBlock,setOpenLog}:{block:any,setOpen:Dispatch<React.SetStateAction<boolean>>,item:any,setBlock:Dispatch<React.SetStateAction<any>>,setOpenLog:Dispatch<React.SetStateAction<boolean>>})=>{
    if(item?.text==='Batch'){
        return(
           <Batch 
             setBlock={setBlock}
            />
           )
       }
   if(item?.text==='Image-to-image'){
        return(
           <AIblock 
              setOpen={setOpen}
              setOpenLog={setOpenLog}
           />
        )
       }
     return(
        <div className='w-full h-full'>

        </div>
     )
}