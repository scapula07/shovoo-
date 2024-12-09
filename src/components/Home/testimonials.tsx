import React from 'react'
import { FaWebflow } from "react-icons/fa6";
import { FaShopify } from "react-icons/fa";

export default function Testimonials() {
  return (
    <div className='w-full py-28 flex flex-col items-center px-20'>
          <h5 className='text-6xl font-bold'>What our users are saying</h5>
          <div className='flex space-x-10 py-20'>
             {[
                 {
                    icon:<FaShopify />,
                    platform:"Shopify",
                    desc:'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero."',
                    user:'Doe, Operations, Lorem',
                    title:''
                 },
                 {
                    icon:<FaShopify />,
                    platform:"Shopify",
                    desc:'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero."',
                    user:'Doe, Operations, Lorem',
                    title:''
                 },
                 {
                    icon:<FaShopify />,
                    platform:"Shopify",
                    desc:'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero."',
                    user:'Doe, Operations, Lorem',
                    title:''
                 }
              ].map((item)=>{
                return(
                    <div className='flex flex-col items-center space-y-3'>
                         <h5 className='flex text-2xl space-x-2 items-center'>
                            {item.icon}
                            <span>{item.platform}</span> 
                          </h5>
                         <p className='text-center'>{item.desc}</p>
                         <h5 className='font-bold'>{item.user}</h5>
                    </div>
                )
             })

             }  

          </div>

    </div>
  )
}
