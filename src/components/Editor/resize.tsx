import React, { useState } from "react";

export default function ResizeMedia() {
  const [resize, setResize] = useState({ dimension: "Width", value: "0.7" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setResize({ ...resize, [e.target.name]: e.target.value });

  return (
    <div className="p-6 w-full bg-white  rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Resize Media</h2>

      {/* Dimension Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Dimension</label>
        <p className="text-xs text-gray-500 mb-1">Choose whether to resize by width or height.</p>
        <select
          name="dimension"
          value={resize.dimension}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-300 outline-none"
        >
          <option>Width</option>
          <option>Height</option>
        </select>
      </div>

      {/* Value Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Value</label>
        <p className="text-xs text-gray-500 mb-1">
          Set the dimension in pixels (e.g., 150) or a decimal ratio (e.g., 0.5 = half size).
        </p>
        <input
          type="text"
          name="value"
          value={resize.value}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:ring-purple-300 outline-none"
          placeholder="Enter value..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-200">Cancel</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Apply</button>
      </div>
    </div>
  );
}
