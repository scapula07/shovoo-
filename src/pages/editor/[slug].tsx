'use client'

import React from 'react'
import Toolbar from '@/components/Editor/toolbar'
import Blocks from '@/components/Editor/blocks'
import FlowBoard from '@/components/Editor/flowboard'
import ReactFlow, { ReactFlowProvider } from "reactflow";
import Configpane from '@/components/Editor/configpane'

export default function ProjectFlow() {
  return (
    <div className='w-full h-screen relative'>
          <Toolbar />
          <div className='w-full flex h-full'>
               <div className='w-1/4 h-full bg-white'>
                  <Blocks />
               </div>
               <div className='w-full h-full'>
               <ReactFlowProvider>
                    <FlowBoard />
                </ReactFlowProvider>
               </div>
               <div className='bg-white h-screen absolute top-0 w-1/4 right-0'>
                  <Configpane />
               </div>
          </div>
    </div>
  )
}
