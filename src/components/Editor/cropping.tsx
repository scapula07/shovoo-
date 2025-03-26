import React, { useRef, useState,createRef } from "react";
import Cropper,{ReactCropperElement} from "react-cropper";
import "cropperjs/dist/cropper.css";

const images = [
  "/assets/1.jpg",
  "/assets/2.jpg",
  "/assets/3.png",
];

const Cropping = () => {
    const cropperRef = createRef<ReactCropperElement>();
  const [image, setImage] = useState(images[0]);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [gravity, setGravity] = useState("center");

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current?.cropper;
      console.log(cropper.getCroppedCanvas().toDataURL()); // Get cropped image
    }
  };

  const handleImageChange = (index: number) => {
    setImage(images[index]);
  };

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
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
        />
      </div>

      {/* Image Selector */}
      <div className="flex space-x-2 w-full">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
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
      <button onClick={handleCrop} className="bg-blue-500 text-white p-2 rounded">
        Crop Image
      </button>
    </div>
  );
};

export default Cropping;
