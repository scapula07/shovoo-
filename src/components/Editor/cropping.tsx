import React, { useState, createRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRecoilState } from "recoil";
import { executionGraphStore } from "@/recoil";
import { useImages } from "@/contexts/useImages";
import { useUpdateNodeInputs } from "@/contexts/useUpdateNode";

interface ToolingProps {
  block: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
  setBlock: React.Dispatch<React.SetStateAction<any>>;
  setOpenLog: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cropping = ({
  block,
  setOpen,
  item,
  setBlock,
  setOpenLog,
}: ToolingProps) => {
  const { images } = useImages();

  const cropperRef = createRef<ReactCropperElement>();
  const [image, setImage] = useState(images[0]);
  const [graph, setGraph] = useRecoilState(executionGraphStore);

  const updateInputs = useUpdateNodeInputs();

  const node = Object.values(graph).find(
    (n: any) => n.class_type === "CropMedia"
  );

  const [width, setWidth] = useState(node?.inputs?.width || "");
  const [height, setHeight] = useState(node?.inputs?.height || "");
  const [gravity, setGravity] = useState(node?.inputs?.gravity || "");

  // Automatically update width & height on crop end
  const handleCropEnd = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current?.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();

      if (croppedCanvas) {
        setWidth(croppedCanvas.width);
        setHeight(croppedCanvas.height);
      }
    }
  };

  // Handle cropping button click
  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current?.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();

      if (croppedCanvas) {
        const croppedWidth = croppedCanvas.width;
        const croppedHeight = croppedCanvas.height;
        setWidth(croppedWidth);
        setHeight(croppedHeight);
      } else {
        console.log("Cropping failed or no valid cropped area.");
      }
    }
  };

  useEffect(() => {
    if (node) {
      updateInputs("CropMedia", { width, height, gravity });
    }
  }, [width, height, gravity]);

  return (
    <div className="flex flex-col items-center space-y-4 w-full px-2">
      {/* Image Preview */}
      <div className="border p-2">
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={URL.createObjectURL(image)}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
          cropend={handleCropEnd} // Runs every time cropping finishes
        />
      </div>

      {/* Image Selector */}
      <div className="flex space-x-2 w-full">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setImage(img)}
            className="p-2 border rounded"
          >
            Image {index + 1}
          </button>
        ))}
      </div>

      {/* Parameters */}
      <div className="flex flex-col space-y-2 w-full">
        <label className="w-full">
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="border p-1 ml-2"
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border p-1 ml-2"
          />
        </label>
        <label>
          Gravity:
          <select
            value={gravity}
            onChange={(e) => setGravity(e.target.value)}
            className="border p-1 ml-2"
          >
            <option value="center">Center</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>

      {/* Crop Button */}
      <button
        onClick={handleCrop}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Crop Image
      </button>
    </div>
  );
};

export default Cropping;
