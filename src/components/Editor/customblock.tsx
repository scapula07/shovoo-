import React, { Dispatch, useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { blocks } from '@/lib/blockConfig';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose } from "react-icons/io";
export default function Customblock({ data, isConnectable }: NodeProps<{ label: string, open: boolean, setOpen: Dispatch<React.SetStateAction<boolean>>, setBlock: Dispatch<React.SetStateAction<any>> }>) {
  const item = blocks.find(block => block.text === data?.label);
  const [openOption, setOpenOption] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenOption(false);
      }
    }

    if (openOption) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openOption]);

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="bg-white py-2 rounded-sm flex flex-col px-4 relative">
        <div className="flex items-center space-x-1.5 w-full">
          <h5 className="text-[0.4rem]">{item?.icon}</h5>
          <h5
            className="text-[0.4rem] font-mono text-slate-800 cursor-pointer"
            onClick={() => {
              data.setOpen(true);
              data.setBlock(data.label);
            }}
          >
            {data?.label}
          </h5>
          {/* Three Dots Icon & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {openOption?
               < IoMdClose 
                   className="text-[0.6rem] cursor-pointer"
                   onClick={() => setOpenOption(false)}
                 />
                 :
                 <BsThreeDotsVertical
                 className="text-[0.6rem] cursor-pointer"
                 onClick={() => setOpenOption(true)}
               />
            }
 
            {/* Dropdown Menu */}
            {openOption && (
              <div className="absolute right-0 top-2 mt-1 w-24 bg-white border border-gray-300 shadow-md rounded-md text-xs">
                <ul className="py-1">
                  <li
                    className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-xs"
                    onClick={() => console.log('Edit clicked')}
                  >
                    Edit
                  </li>
                  <li
                    className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-xs"
                    onClick={() => console.log('Delete clicked')}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
