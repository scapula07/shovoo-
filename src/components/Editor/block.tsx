'use client'
import React from 'react'
import { useDnD } from '@/contexts/dnd';
export default function Block({item}:{item:any}) {
   
 
    const onDragStart = (event:React.DragEvent<HTMLDivElement>, nodeType:string) => {
       event.dataTransfer.setData('application/reactflow', nodeType); 
       event.dataTransfer.effectAllowed = 'move';
    };
  return (
    <div className='flex items-center shadow w-full rounded-lg space-x-4 py-4 px-3'
        onDragStart={(event) => onDragStart(event,item?.text)} draggable
     >
        <h5>{item?.icon}</h5>
        <h5 className='text-sm'>{item?.text}</h5>

    </div>
  )
}
