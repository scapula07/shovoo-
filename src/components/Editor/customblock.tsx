import React from 'react'
import { Handle, HandleProps,Position,NodeProps } from "reactflow";

export default function Customblock({ data, isConnectable }: NodeProps<{ label: string }>) {
  return (
        <>
         <Handle
              type="target"
              position={Position.Left}   
           />
            <div className='bg-white px-6 py-2 rounded-lg'
              >
                <h5 className='text-xs text-slate-700'
                  onClick={()=>console.log(data?.label)}
                 >
                {data?.label}
                </h5>     
            </div>
         <Handle
           type="source"
           position={Position.Right}   
        />
     </>

  )
}
