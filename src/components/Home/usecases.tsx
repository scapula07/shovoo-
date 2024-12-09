import React from 'react'
import FullWidthCarousel from '../Carousel';



export default function UseCases() {
    const carouselItems = [
        { image: "/assets/1.png", title: "Replace background at scale" },
        { image: "/assets/2.png", title: "Generate product image variants" },
        { image: "/assets/3.png", title: "Alt text generation" },
        { image: "/assets/3.png", title: "Upscale images at scale" },
        { image: "/assets/3.png", title: "Generate 360 product photography" },
        { image: "/assets/2.png", title: "Video transcoding" },
        { image: "/assets/3.png", title: "Automated image editing" },
        { image: "/assets/3.png", title: "Generate tags and captions for images,videos " },
        { image: "/assets/3.png", title: "Watermark assets" },
        { image: "/assets/3.png", title: "Subtitle generation" },
        { image: "/assets/2.png", title: " Enhance Image Correction " },
        { image: "/assets/3.png", title: "Scale UGC media" },
        { image: "/assets/3.png", title: "Generate product Ad Banner" },

      ];
      

    
  return (
    <div className='w-full flex flex-col items-center py-10 space-y-10'>
        <h5 className='text-3xl font-semibold'>How will you transform your media?</h5>
        <FullWidthCarousel items={carouselItems} />
    </div>
  )
}
