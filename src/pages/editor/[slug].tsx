'use client'

import React, { useState } from 'react'
import Toolbar from '@/components/Editor/toolbar'
import Blocks from '@/components/Editor/blocks'
import FlowBoard from '@/components/Editor/flowboard'
import ReactFlow, { ReactFlowProvider } from "reactflow";
import Configpane from '@/components/Editor/configpane'
import Logs from '@/components/Editor/logs'
import { ToastContainer, toast } from 'react-toastify';

export default function Editor() {
      const [open,setOpen]=useState<boolean>(false)
      const [openlog,setOpenLog]=useState<boolean>(false)
      const [block,setBlock]=useState()
 
      
  return (
    <div className='w-full h-screen relative'>
          <Toolbar/>
          <div className='w-full flex h-full'>   
                  <Blocks 
                       setOpenLog={setOpenLog}
                  />
               <div className='w-full h-full'>
               <ReactFlowProvider>
                    <FlowBoard 
                       open={open}
                       setOpen={setOpen}
                       block={block}
                       setBlock={setBlock}
                    />
                </ReactFlowProvider>
               </div>
               {open&&(
                  <div className='bg-white h-screen absolute top-0 w-1/4 right-0 border-l border-black'>
                     
                      <Configpane 
                         block={block}
                         setOpen={setOpen}
                         setBlock={setBlock}
                         setOpenLog={setOpenLog}
                       
                       />
                   </div>
                )}
                       </div>
                {openlog&&(
                  <div className='bg-white h-screen absolute top-0 w-1/4 right-0 border-l border-black'>       
                      <Logs
                         block={block}
                         setOpen={setOpenLog}
                       />
                   </div>
                )}
     
     <ToastContainer />

    </div>
  )
}
