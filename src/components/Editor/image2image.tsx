import React, { useState, useEffect } from "react";
import { executionGraphStore } from "@/recoil";
import { useRecoilState } from "recoil";
import { useUpdateNodeInputs } from "@/contexts/useUpdateNode";

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

  const updateInputs = useUpdateNodeInputs();
 

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


  useEffect(() => {
    if (true) {
      updateInputs("Image-to-image", { prompt:prompt });
    }
  }, [prompt,nodeData]);
  
 console.log(graph,"g")
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Display the node title if found */}
      {nodeData ? <h2 className="text-lg font-semibold">{nodeData.meta?.title}</h2> : null}

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
          className="mt-2 w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Continue
        </button>
      </div>

    </div>
  );
}
