import React from 'react'

export default function Footer() {
  return (
    <div className='w-full flex px-20 py-28'>
         <div className='w-[45%]'>

         </div>

         <div className='w-full flex justify-between '>
              {[
                 {
                  label:"Product",
                  text:['Get demo','Pricing','Log in','Partnership']
                 },
                 {
                  label:"Solutions",
                  text:['Use cases','Documentation','Templates']
                 },
                 {
                  label:"Blogs",
                  text:['vs Zapier','vs Make','Automation']
                 },
                 {
                  label:"Company",
                  text:['About','Contact us','Terms & conditions']
                 }
              ].map((item)=>{
                return(
                  <div className='flex flex-col space-y-4'>
                     <h5>{item.label}</h5>
                      <div className='flex flex-col space-y-2'>
                          {item.text?.map((txt)=>{
                          return(
                            <h5>{txt}</h5>
                          )
                        }) }
                    </div>
            
                  </div>
                )
              })

              }
              
          
        </div>

    </div>
  )
}
