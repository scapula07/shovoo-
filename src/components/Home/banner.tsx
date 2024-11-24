import React from 'react'
import { IoLogoWordpress } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";

export default function Banner() {
  return (
    <div className='w-full flex flex-col items-center py-20 space-y-8'>
         <div className='w-full flex flex-col items-center'>
             <h5 className='font-light text-2xl'>Seamless Integration with Blink.ai</h5>
         </div>   
         <div className='w-full flex items-center justify-center space-x-20'>
              {
                [
                 {
                    icon:<IoLogoWordpress />,
                    text:'Wordpress'
                 },
                 {
                    icon:<FaShopify />,
                    text:'Shopify'
                 },
                 {
                    icon:<FaShopify />,
                    text:'Shopify'
                 },
                 {
                    icon:<FaShopify />,
                    text:'Livepeer'
                 }

                 ]?.map((item)=>{
                    return(
                      <div className='flex space-x-2'>
                           <h5 className='text-5xl'>{item?.icon}</h5>
                           <h5 className='font-semibold text-2xl'>{item?.text}</h5>
                      </div>
                    )
                })}
          </div>
    </div>
  )
}
