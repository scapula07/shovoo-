import React from 'react'


interface ToolingProps {
    block: any;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
    setBlock: React.Dispatch<React.SetStateAction<any>>;
    setOpenLog: React.Dispatch<React.SetStateAction<boolean>>;
  }
export default function RemoveBackground({ block, setOpen, item, setBlock, setOpenLog }: ToolingProps) {
  return (
    <div className='w-full py-4 px-2'>
          <h5 className='w-full text-sm'>Instantly remove image backgrounds </h5>

    </div>
  )
}
