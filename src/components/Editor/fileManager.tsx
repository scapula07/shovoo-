import React, { useState, useRef } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdKeyboardArrowRight, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export default function FileManager({block,item}:{block:any,item:any}) {
  const [files, setFiles] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<{ [key: string]: string }>({});
  const [selectedFiles, setSelectedFiles] = useState<Set<File>>(new Set());
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [next, setNext] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFilesUpload = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    let newFiles: File[] = [];

    if ("dataTransfer" in event) {
      newFiles = Array.from(event.dataTransfer.files);
    } else {
      newFiles = event.target.files ? Array.from(event.target.files) : [];
    }

    if (newFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      // Generate image previews
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviewURLs((prev) => ({ ...prev, [file.name]: e.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      });

      // Simulate Upload Progress
      newFiles.forEach((file) => {
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
        simulateUpload(file);
      });
    }
  };

  // Simulate File Upload Progress
  const simulateUpload = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  // Handle File Selection
  const toggleSelectFile = (file: File) => {
    setSelectedFiles((prev) => {
      const newSelection = new Set(prev);
      newSelection.has(file) ? newSelection.delete(file) : newSelection.add(file);
      return newSelection;
    });
  };

  // Select / Deselect All Files
  const toggleSelectAll = () => {
    setSelectedFiles((prev) => (prev.size === files.length ? new Set() : new Set(files)));
  };

  // Delete File
  const deleteFile = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
    setSelectedFiles((prev) => {
      const newSelection = new Set(prev);
      newSelection.delete(file);
      return newSelection;
    });
    setPreviewURLs((prev) => {
      const updatedPreviews = { ...prev };
      delete updatedPreviews[file.name];
      return updatedPreviews;
    });
  };

  return (
    <div className="w-full">
      {/* Navigation */}
      <div className="w-full flex space-x-3 items-center border-b px-4 py-2">
        <h5 className="flex items-center space-x-2 text-slate-700 cursor-pointer" onClick={() => setNext(false)}>
          <span className="text-lg">Import</span>
          {!next ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </h5>
        <MdKeyboardArrowRight />
        <h5 className="flex items-center text-slate-700 space-x-2 cursor-pointer" onClick={() => setNext(true)}>
          <span className="text-lg">Preview</span>
          {next ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </h5>
      </div>

      {/* Import Section */}
      {!next && (
        <div className="p-4">
          <div
            className="border-dashed border-2 border-gray-400 rounded-lg p-6 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFilesUpload}
          >
            <p className="text-gray-500">Drop your files here or click to browse</p>
            <input type="file" ref={fileInputRef} multiple hidden onChange={handleFilesUpload} />
          </div>

          {/* File Upload List */}
          <div className="mt-4">
            {files.map((file) => (
              <div key={file.name} className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2">
                <span className="text-sm text-gray-700">{file.name}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-300 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${uploadProgress[file.name]}%` }}></div>
                  </div>
                  <IoMdTrash className="text-red-500 cursor-pointer" onClick={() => deleteFile(file)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Section */}
      {next && (
        <div className="p-4">
          {/* Select All Option */}
          {files.length > 0 && (
            <div className="flex items-center space-x-2 mb-3 cursor-pointer" onClick={toggleSelectAll}>
              {selectedFiles.size === files.length ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              <span className="text-gray-700">Select All</span>
            </div>
          )}

          {/* File Preview Grid */}
          <div className="grid grid-cols-3 gap-3">
            {files.map((file) => (
              <div
                key={file.name}
                className={`relative border rounded-lg p-2 cursor-pointer ${
                  selectedFiles.has(file) ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => toggleSelectFile(file)}
              >
                {previewURLs[file.name] ? (
                  <img src={previewURLs[file.name]} alt={file.name} className="w-full h-20 object-cover rounded-md" />
                ) : (
                  <div className="text-sm truncate text-gray-700">{file.name}</div>
                )}
                {selectedFiles.has(file) && <MdCheckBox className="absolute top-1 right-1 text-blue-500" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
