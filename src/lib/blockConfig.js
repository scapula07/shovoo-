import { FaShopify } from "react-icons/fa";
import { FiClock,FiUploadCloud, FiLayers  } from "react-icons/fi";


export const blocks=[
    {
        text:"Shopify",
        icon:<FaShopify className="text-green-600"/>,
        type:'app',
        
     },
     {
        text:"New product",
        icon:<FaShopify className="text-green-600"/>,
        type:'app',
        
     },
     {
         text:"Batch",
         icon:<FiLayers />,
         type:'tooling'
     },
     {
        text:"Schedular",
        icon:<FiClock />,
        type:'tooling'
     },
     {
         text:"Transcoding",
         icon:<FaShopify />,
         type:'app',   
    },
    {
         text:"Image-to-image",
         icon:<FiClock />,
         type:'tooling'
    },
    {
         text:"Image-to-text",
         icon:<FiClock />,
         type:'tooling'
     },
    {
         text:"Text-to-image",
         icon:<FiClock />,
         type:'tooling'
     },
     {
      text:"Background removal",
      icon:<FaShopify />,
      type:'app',
      
   },
   {
      text:"Image moderation",
      icon:<FiClock />,
      type:'tooling'
    },
   {
      text:"Image captioning",
      icon:<FiClock />,
      type:'tooling'
    },
    {
      text:"Image tagging",
      icon:<FiClock />,
      type:'tooling'
    },
    {
      text:"Video tagging",
      icon:<FiClock />,
      type:'tooling'
    },
    {
      text:"Edit Media",
      icon:<FaShopify />,
      type:'app',
      
   },
   {
      text:"Crop Media",
      icon:<FiClock />,
      type:'tooling'
    },
    {
      text:"Apply Background",
      icon:<FiClock />,
      type:'tooling'
    },
    {
      text:"Resize",
      icon:<FiClock />,
      type:'tooling'
    },
    {
      text:"Text overlay",
      icon:<FiClock />,
      type:'tooling'
    },
    {
      text:"Image overlay",
      icon:<FiClock />,
      type:'tooling'
    },
    {
      text:"Condition",
      icon:<FiClock />
     },
    {
       text:"Complex Condition",
       icon:<FiUploadCloud />
    },
    {
       text:"Wait For All",
       icon:<FiClock />
    },
    {
       text:"Apply For Each",
       icon:<FiClock />
    },
    {
       text:"Delay",
       icon:<FiClock />
      }
]