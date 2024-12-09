import React,{useState,Dispatch} from 'react'
import { MdKeyboardArrowRight,MdRadioButtonUnchecked } from "react-icons/md";
import Select from "react-select";
import { IoFilter } from "react-icons/io5";
import { IoIosRadioButtonOn,IoIosRadioButtonOff } from "react-icons/io";
import { ClipLoader } from 'react-spinners';
import { async } from '@firebase/util';

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default function Batch({setBlock}:{setBlock:Dispatch<React.SetStateAction<any>>}) {
     const [next,setNext]=useState(false)
     const [isLoading,setLoading]=useState(false)
    const options = [
        { value: 'products', label: 'All products' },
        { value: 'collection', label: 'Collection' },
        { value: 'files', label: 'Media Files' }
      ]


      const go=async()=>{
        setLoading(true)
         await sleep(3000)
         setNext(true)
         setLoading(false)
      }
  return (
     <div className='w-full h-full'>
            <div className='w-full flex space-x-3 items-center border-b px-4 py-2'>
                      <h5 className='flex items-center space-x-2 text-slate-700'>
                          <span className='font- text-lg'>Configure</span>
                          <MdRadioButtonUnchecked />        
                      </h5>
                      <MdKeyboardArrowRight />
                      <h5 className='flex items-center  text-slate-700 space-x-2'>
                          <span className='font- text-lg'>Preview</span>
                          <MdRadioButtonUnchecked />    
                      </h5>
              </div>
              {
                next?
                <Preview />
                   :
              
               <div className='flex flex-col space-y-4 px-4 py-4'>
                    <h5>Source*</h5>
                    <Select 
                      options={options}
                      placeholder="Shopify" 
                    />  
                </div>
                }


            <div className='pt-20 px-4'>
                {next?
                        <button className='bg-purple-500 py-2 text- text-white font- px-4 w-full'
                        onClick={()=>setBlock("Image-to-image")}
                         >
                               {isLoading?
                                 <ClipLoader size={16}/>
                                 :
                                "Proceed >"}
                           </button>  
                           :
                         <button className='bg-purple-500 py-2 text- text-white font- px-4 w-full'
                           onClick={go}
                          >
                           {isLoading?
                             <ClipLoader size={16}/>
                             :
                            "Continue"}
                       </button> 
                    }
     
            </div>
     </div>
  )
}


const Preview=()=>{
     return(
        <div className='flex flex-col py-8 px-4'>
              <div className='flex justify-end items-center space-x-4'>
                   <h5 className='flex items-center space-x-2'>
                       <span className='text-sm '>Select all</span>  
                        <input 
                          type="checkbox"
                        />
                   </h5>
                   <IoFilter />
              </div>

              <div className='w-full grid grid-cols-3 py-6 gap-4'>
                {['/assets/1.jpg','/assets/2.jpg','/assets/3w.png'].map((img)=>{
                    return(
                     <ImgSelector
                       img={img}
                     />
                    )
                })

                }
              </div>

        </div>
     )
}

const ImgSelector=({img}:{img:string})=>{
    return(
        <div className='relative w-full h-full border rounded-lg'>
            <img
              src={img}
             />
             <div className='w-full h-full absolute top-0 flex justify-start py-2 px-2' >
                {/* <IoIosRadioButtonOff /> */}
                <input 
                  type="checkbox"
               />

             </div>
        </div>
    )
}