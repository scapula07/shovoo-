import React from 'react'
import FullWidthCarousel from '../Carousel';



export default function UseCases() {
    const carouselItems = [
        { image: "/assets/a.png", title: "Replace background at scale" },
        { image: "/assets/d.png", title: "Generate product image variants" },
        { image: "/assets/p.png", title: "Scale UGC media" },
    
        { image: "/assets/i.png", title: " Enhance Image Correction " },
      
        { image: "/assets/k.png", title: "Generate 360 product photography" },
        { image: "/assets/t.png", title: "Video transcoding" },
        { image: "/assets/c.png", title: "Alt text generation" },
        { image: "/assets/g.png", title: "Generate tags and captions for images,videos " },
        { image: "/assets/h.png", title: "Watermark assets" },
        { image: "/assets/j.png", title: "Subtitle generation" },     
        { image: "/assets/e.png", title: "Generate product Ad Banner" },
        { image: "/assets/b.png", title: "Upscale images at scale" },

      ];
      

    
  return (
    <div className='w-full flex flex-col items-center py-10 space-y-10'>
        <h5 className='text-3xl font-semibold'>How will you transform your media?</h5>
        <FullWidthCarousel items={carouselItems} />
    </div>
  )
}
