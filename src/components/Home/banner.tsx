import React from 'react'
import { IoLogoWordpress } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";

export default function Banner() {
  return (
    <div className='w-full flex flex-col items-center py-20 space-y-8'>
         <div className='w-full flex flex-col items-center'>
             <h5 className='font-bold text-2xl'> Trust in our Seamless Integration with</h5>
         </div>   
         <div className='w-full flex items-center justify-center space-x-20'>
              {
                [
                 {
                    icon:<IoLogoWordpress />,
                    text:'Shopify',
                    img:'/assets/shopify.png'

                 },
               //   {
               //      icon:<FaShopify />,
               //      text:'Shopify',
               //      img:'/assets/woocommerce.png'
               //   },
                 {
                    icon:<FaShopify />,
                    text:'Shopify',
                    img:'/assets/wordpress.png'
                 },
               //   {
               //      icon:<FaShopify />,
               //      text:'Livepeer',
               //      img:'/assets/storj.png'
               //   }

                 ]?.map((item)=>{
                    return(
                      <div className='flex space-x-2'>
                         <img src={item.img} />
                      </div>
                    )
                })}
                <h5 className='font-bold  text-3xl text-slate-600'>Livepeer</h5>
          </div>
    </div>
  )
}
