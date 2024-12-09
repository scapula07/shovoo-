import React,{Dispatch} from 'react'
import { Handle,Position,NodeProps } from "reactflow";
import { blocks } from '@/lib/blockConfig';
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Customblock({ data, isConnectable}: NodeProps<{ label: string ,open:boolean,setOpen:Dispatch<React.SetStateAction<boolean>>,setBlock:Dispatch<React.SetStateAction<any>>}>) {

     const item = blocks.find(block => block.text ===data?.label);
  return (
        <>
         <Handle
            type="target"
            position={Position.Left}   
           />
            <div className='bg-white  py-2 rounded-sm flex flex-col px-4'>
                <div className='flex items-center space-x-1.5 w-full '>
                    <h5 className='text-[0.4rem]'>{item?.icon}</h5>
                    <h5 className='text-[0.45rem] font-bold font-mono text-slate-800'
                      onClick={()=>{data.setOpen(true); data.setBlock(data.label)}}>
                       {data?.label}
                    </h5> 
                    <BsThreeDotsVertical className='text-[0.4rem] hover:block'/>
                </div>
          </div>
         <Handle
           type="source"
           position={Position.Right}   
       
        />
     </>

  )
}
