import React, { useState } from "react";

export default function Image2Image() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<{ image: string; prompt: string }[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    // Simulate processing with a new image URL (this should be replaced with your AI pipeline)
    const newImage = `https://picsum.photos/seed/${Date.now()}/200/200`; // Random placeholder

    // Update history with the new prompt and image
    setHistory((prev) => [{ image: newImage, prompt }, ...prev]);

    // Clear input
    setPrompt("");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
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
