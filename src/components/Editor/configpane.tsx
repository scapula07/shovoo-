import React, {
  Dispatch,
  useState,
  ReactNode,
  SetStateAction,
  ReactElement,
} from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import {
  MdOutlineQuestionMark,
  MdKeyboardArrowRight,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { blocks } from "@/lib/blockConfig";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import FileManager from "./fileManager";
import Image2image from "./image2image";
import Cropping from "./cropping";
import Image2text from "./image2text";
import RemoveBackground from "./removeBackground";
import ApplyBackground from "./applyBackground";
import Resize from "./resize";
import TextOverlay from "./textOverlay";
export default function Configpane({
  block,
  setOpen,
  setBlock,
  setOpenLog,
}: {
  block: any;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setBlock: Dispatch<React.SetStateAction<any>>;
  setOpenLog: Dispatch<React.SetStateAction<boolean>>;
}) {
  const item = blocks.find((blk) => blk.text === block);
  if (item?.type === "app") {
    return (
      <div className="w-full">
        <TopBar block={block} setOpen={setOpen} item={item} />
        <FileManager block={block} item={item} />
      </div>
    );
  }
  return (
    <div className="w-full h-full ">
      <TopBar block={block} setOpen={setOpen} item={item} />
      <Tooling
        block={block}
        setOpen={setOpen}
        item={item}
        setBlock={setBlock}
        setOpenLog={setOpenLog}
      />
    </div>
  );
}

const TopBar = ({
  block,
  setOpen,
  item,
}: {
  block: any;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  item: any;
}) => {
  return (
    <div className="w-full">
      <div
        className={`flex items-center w-full justify-between px-4 py-4  border-b ${item.background}`}
      >
        <div className="flex items-center space-x-2">
          <h5 className="font-bold text-sm ">{item?.icon}</h5>
          <h5 className=" text-sm">{item?.text}</h5>
        </div>

        <div className="flex items-center space-x-3">
          <IoIosInformationCircleOutline
            className="text-xl"
            data-tooltip-id={item.text}
            data-tooltip-content={item.text}
            data-tooltip-place="bottom"
          />
          <IoMdClose onClick={() => setOpen(false)} />
          <Tooltip id={item.text} place="top" className="bg-white text-xs" />
        </div>
      </div>
    </div>
  );
};

const componentsMap: Record<string, React.FC<ToolingProps>> = {
  "Image-to-image": (props) => <Image2image {...props} />,
  "Image-to-text": (props) => <Image2text {...props} />,
  "Crop Media": (props) => <Cropping {...props} />,
  "Background removal": (props) => <RemoveBackground {...props} />,
  "Apply Background": (props) => <ApplyBackground {...props} />,
  Resize: (props) => <Resize {...props} />,
  "Text overlay": (props) => <TextOverlay {...props} />,
};

interface ToolingProps {
  block: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  item: any;
  setBlock: Dispatch<SetStateAction<any>>;
  setOpenLog: Dispatch<SetStateAction<boolean>>;
}

const Tooling: React.FC<ToolingProps> = ({
  item,
  block,
  setOpen,
  setBlock,
  setOpenLog,
}) => {
  if (!item || !item.text) {
    return <p>No tool selected</p>;
  }

  const Component = componentsMap[item.text];

  return Component ? (
    <Component
      block={block}
      setOpen={setOpen}
      setBlock={setBlock}
      setOpenLog={setOpenLog}
      item={item}
    />
  ) : (
    <p>Invalid tool</p>
  );
};
