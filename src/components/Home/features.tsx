import React from 'react'

export default function Features() {
  return (
    <div className='py-28 flex flex-col px-10 space-y-6'>
         <h5 className='text-5xl font-bold'>One  Platform. Unlimited possibilities for all</h5>
         <p className='w-4/5 text-xl'>Boost productivity across every area or time. Anyone can use Blink to design powerful workflows without relying on developer resources.</p>

         <div className='flex space-x-4'>
            {
                [
                  {
                    icon:"",
                    label:"Connect Your Media Ecosystem",
                    dsc:"Easily integrate with services like  Shopify, webflow and wordpress to automate workflows, keeping your media operations seamless, consistent, and always in sync across your ecosystem."
                  } ,
                  {
                    icon:"",
                    label:"Tailored Tools for Smarter Media Management",
                    dsc:"Leverage built-in tools designed specifically for media workflows"
                  } ,
                  {
                    icon:"",
                    label:"Enhance Media with AI-Powered Tools",
                    dsc:"Leverage AI for auto-tagging, content analysis, smart recommendations, and more to supercharge your media workflows"
                  },
                  {
                    icon:"",
                    label:"",
                    dsc:""
                  }    
                ].map((item)=>{
                    return(
                        <div className='bg-[#F4F5FA] w-full h-60 flex flex-col py-4 px-4 space-y-4'>
                            <h5></h5>
                            <h5 className='font-bold text-xl'>{item.label}</h5>
                            <p>{item.dsc}</p>     
                        </div>
                    )
                })

            }

         </div>

    </div>
  )
}
