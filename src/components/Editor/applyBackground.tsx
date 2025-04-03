import { useState ,useEffect} from "react";
import { useRecoilState } from "recoil";
import { executionGraphStore } from "@/recoil";


const backgrounds = [
  "/images/bg1.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
];


interface ToolingProps {
    block: any;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
    setBlock: React.Dispatch<React.SetStateAction<any>>;
    setOpenLog: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
const ApplyBackground = ({ block, setOpen, item, setBlock, setOpenLog }: ToolingProps) => {
  const [mode, setMode] = useState<"color" | "image">("color");
  const [hex, setHex] = useState("#ffffff");
  const [background, setBackground] = useState<string | null>(null);
  const [customBgText, setCustomBgText] = useState("");


  const [graph, setGraph] = useRecoilState(executionGraphStore);
  const [nodeData, setNodeData] = useState<any>(null);

useEffect(() => {
  if (graph) {
    const foundNode = Object.values(graph).find((node: any) => node.class_type ===item?.text);
    console.log(foundNode,"found")
    setNodeData(foundNode || null);
  }
}, [graph, item?.text]);

  return (
    <div className="h-screen p-6">
      {/* Left Panel (Mode Selection) */}
      <div className="w-full bg-white p-4 rounded-lg ">
        <h3 className="text-lg font-bold mb-4">Background Mode</h3>

        {/* Mode Selection Tabs */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              mode === "color" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("color")}
          >
            Color Hex
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              mode === "image" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setMode("image")}
          >
            Background Image
          </button>
        </div>

        {/* Dynamic Mode Parameters */}
        {mode === "color" ? (
          <div className="flex items-center space-x-2">
            {/* Hex Code Input */}
            <input
              type="text"
              className="w-24 p-2 border rounded-lg"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
            />
            {/* Color Picker */}
            <input
              type="color"
              className="w-10 h-10 border rounded-lg"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
            />
          </div>
        ) : (
          <div>
            {/* AI-Powered Background Input */}
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-3"
              placeholder="Describe background..."
              value={customBgText}
              onChange={(e) => setCustomBgText(e.target.value)}
            />

            {/* Predefined Background Selection Grid */}
            <div className="grid grid-cols-2 gap-2">
              {backgrounds.map((bg, index) => (
                <div
                  key={index}
                  className={`border rounded-lg overflow-hidden ${
                    background === bg ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setBackground(bg)}
                >
                  <img src={bg} alt="BG" className="w-full h-16 object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center Panel - Live Preview
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg ml-6 flex items-center justify-center">
        <div
          className="w-96 h-96 border relative"
          style={{
            background: mode === "color" ? hex : `url(${background || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="absolute bottom-2 left-2 bg-white px-2 py-1 text-sm shadow-md rounded">
            {mode === "color" ? hex : background ? "Background Applied" : "Select a Background"}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default ApplyBackground;
