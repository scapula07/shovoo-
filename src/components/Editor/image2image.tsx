import React, { useState, useEffect } from "react";
import { executionGraphStore } from "@/recoil";
import { useRecoilState } from "recoil";

interface ToolingProps {
    block: any;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
    setBlock: React.Dispatch<React.SetStateAction<any>>;
    setOpenLog: React.Dispatch<React.SetStateAction<boolean>>;
  }
  

export default function Image2image({ block, setOpen, item, setBlock, setOpenLog }: ToolingProps) {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<{ image: string; prompt: string }[]>([]);
  const [graph, setGraph] = useRecoilState(executionGraphStore);
  const [nodeData, setNodeData] = useState<any>(null);

 
console.log(item?.text,graph,"i")
  // Find the node in the graph based on the provided text
  useEffect(() => {
    if (graph) {
      const foundNode = Object.values(graph).find((node: any) => node.class_type ===item?.text);
      console.log(foundNode,"found")
      setNodeData(foundNode || null);
    }
  }, [graph, item?.text]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    // Simulate processing with a new image URL (this should be replaced with your AI pipeline)
    const newImage = `https://picsum.photos/seed/${Date.now()}/200/200`; // Random placeholder

    // Update history with the new prompt and image
    setHistory((prev) => [{ image: newImage, prompt }, ...prev]);

    // Update the node input in the graph
    if (nodeData) {


    //   setGraph((prev:any) => ({
    //     ...prev,
    //     [nodeData.id]: {
    //       ...prev[nodeData.id], // Preserve existing properties
    //       inputs: {
    //         ...prev[nodeData.id]?.inputs, // Preserve existing inputs
    //         prompt:prompt, // Add new input
    //       },
    //     },
    //   }));


    setGraph((prev:any) => {
        // Find the step where class_type matches item.text
        const stepKey = Object.keys(prev).find(
          (key) => prev[key].class_type === item.text
        );
      
        // If not found, return previous state to prevent accidental changes
        if (!stepKey) {
          console.error("Node not found for class_type:", item.text);
          return prev;
        }
      
        return {
          ...prev,
          [stepKey]: {
            ...prev[stepKey], // Preserve other properties
            inputs: {
              ...prev[stepKey].inputs, // Preserve existing inputs
              prompt: prompt, // Add/update input
            },
          },
        };
      });
      
      
      
    }

    // Clear input
    setPrompt("");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Display the node title if found */}
      {nodeData ? <h2 className="text-lg font-semibold">{nodeData._meta.title}</h2> : null}

      {/* Prompt Section */}
      <div className="w-full p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Prompt</h2>
        <input
          type="text"
          placeholder="Describe the transformation..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleGenerate}
          className="mt-2 w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Continue
        </button>
      </div>

      {/* History & Examples Section */}
      <div className="w-full p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">History & Examples</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No history yet. Your prompts will appear here.</p>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <div key={index} className="flex items-center gap-3 border p-2 rounded-md">
                <img src={item.image} alt="Generated preview" className="w-12 h-12 rounded-md" />
                <p className="text-sm">{item.prompt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
