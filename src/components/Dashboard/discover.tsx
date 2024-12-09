import React from 'react'
import { LiaSearchSolid } from "react-icons/lia";
export default function Discover() {
  return (
    <div className='h-full w-full '>
          <div className='bg-white w-full space-y-5 px-10 py-10'>
                 <div className='flex flex-col w-full space-y-2'>
                      <h5 className='text-2xl font-bold'>Discover</h5>
                      <h5 className='text-slate-700'>Create & manage all of your automation workflows in one place. Learn more</h5>
                 </div>
              <div className='w-full '>
                 <div className='flex items-center w-full border border-slate-800 px-4 space-x-3'>
                       <LiaSearchSolid className='text-3xl'/>
                        <input 
                          className='py-2 w-full outline-none '
                          placeholder='Search templates or AI agents'
                        />  
                  </div>   

              </div>
          </div>


          <div className='w-full grid grid-cols-4 px-10 py-10 gap-4'>
                 {[
                    {

                    },
                    {
                        
                    },
                    {
                        
                    },
                    {
                        
                    }
                  ]?.map(()=>{
                      return(
                        <div className='h-44 w-full shadow-sm bg-white'>
                        </div>
                      )
                   })
                }
          </div>
    </div>
  )
}
