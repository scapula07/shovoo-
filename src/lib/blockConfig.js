import { FaShopify } from "react-icons/fa";
import { FaFolderOpen ,FaRegImages,FaRegImage,FaCropSimple} from "react-icons/fa6";
import { FiLayers } from "react-icons/fi";
import { FaTextSlash } from "react-icons/fa6";
import { TbBackground,TbResize } from "react-icons/tb";
import { TfiLayoutMediaOverlay } from "react-icons/tfi";
import { IoMdRemoveCircleOutline } from "react-icons/io";

export const blocks=[
    {
        text:"Shopify",
        icon:<FaShopify className="text-green-600"/>,
        type:'app',       
     },
     {
      text:"Local/Folder",
      icon:<FaFolderOpen className="text-[#e6dffd]"/>,
      type:'app',
      background:'bg-black'
      
     },
    {
         text:"Image-to-image",
         icon:<FaRegImages />,
         type:'tooling'
    },
    {
         text:"Image-to-text",
         icon:<FaTextSlash />,
         type:'tooling'
     },
    {
         text:"Text-to-image",
         icon:<FaRegImage />,
         type:'tooling'
     },
     {
      text:"Background removal",
      icon:<IoMdRemoveCircleOutline />,
      type:'tooling',
      
   },

   {
      text:"Crop Media",
      icon:<FaCropSimple />,
      type:'tooling'
    },
    {
      text:"Apply Background",
      icon:<TbBackground />,
      type:'tooling'
    },
    {
      text:"Resize",
      icon:<TbResize />,
      type:'tooling'
    },
    {
      text:"Text overlay",
      icon:<TfiLayoutMediaOverlay />,
      type:'tooling'
    },
]