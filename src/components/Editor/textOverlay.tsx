import React, { useState } from "react";

export default function TextOverlay() {
  const [state, setState] = useState({
    overlayText: "",
    placement: "Center",
    fontWeight: "Normal",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const renderField = (label: string, name: keyof typeof state, type = "text", options?: string[]) => (
    <div className="mb-4  space-y-2">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
     
      {options ? (
        <select name={name} value={state[name]} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-300 outline-none">
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={state[name]}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-300 outline-none"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />

      )}
       <p className="text-xs text-gray-500 mb-1">{getFieldDescription(name)}</p>
    </div>
  );

  return (
    <div className="p-6 w-full bg-white  rounded-lg">
      {renderField("Overlay Text", "overlayText")}
      {renderField("Placement", "placement", "select", ["Top Left", "Top Center", "Top Right", "Center", "Bottom Left", "Bottom Center", "Bottom Right"])}
      {renderField("Font Weight", "fontWeight", "select", ["Thin", "Light", "Normal", "Medium", "Bold", "Black"])}
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-200">Cancel</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Next</button>
      </div>
    </div>
  );
}

const getFieldDescription = (name: string) => {
  const descriptions: Record<string, string> = {
    overlayText: "Enter the text to display over the image.",
    placement: "Select where the text should appear on the image.",
    fontWeight: "Adjust the boldness of the text.",
  };
  return descriptions[name] || "";
};
