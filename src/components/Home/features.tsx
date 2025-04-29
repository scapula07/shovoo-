import React from 'react'

export default function Features() {
  return (
    <div className='py-28 flex flex-col px-10 space-y-2'>
         <h5 className='text-5xl font-bold'>One Platform for Every Media Need.</h5>
         <p className='w-[60%] text-2xl'>Ditch the patchwork of third-party tools. Our scalable platform is designed for all your media needs.</p>

         <div className='flex space-x-4 py-3'>
            {
                    [
                      {
                        icon: "",
                        label: "Connect Your Media Ecosystem",
                        dsc: "Easily integrate with services like Shopify, Webflow, and WordPress to automate workflows, keeping your media operations seamless, consistent, and always in sync across your ecosystem."
                      },
                      {
                        icon: "",
                        label: "Tailored Tools for Smarter Media Management",
                        dsc: "Leverage built-in tools designed specifically for media workflows — including cropping, resizing, background removal, text overlays, and batch processing."
                      },
                      {
                        icon: "",
                        label: "Enhance Media with AI-Powered Tools",
                        dsc: "Use AI for image-to-image generation, text-to-image creation, auto-tagging, content analysis, and smart media recommendations — all integrated natively."
                      },
                      {
                        icon: "",
                        label: "Visual Workflow Builder with Drag-and-Drop Simplicity",
                        dsc: "Design complex automations using an intuitive, node-based builder. Set up triggers, batching, and scheduled actions with no technical skills required."
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
