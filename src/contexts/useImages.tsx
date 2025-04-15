import { toBase64 } from "@/utils";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface StoredImage {
  name: string;
  type: string;
  base64: string;
}

interface ImagesContextType {
  images: File[];
  addImages: (files: File[]) => void;
  clearImages: () => void;
  removeImage: (name: string) => void;
}

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export const ImagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [stored, setStored] = useLocalStorage<StoredImage[]>("raw_images", []);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    Promise.all(
      stored.map(async (img) => {
        const res = await fetch(img.base64);
        const blob = await res.blob();
        return new File([blob], img.name, { type: img.type });
      })
    ).then(setImages);
  }, [stored]);

  const addImages = async (files: File[]) => {
    const toStore: StoredImage[] = await Promise.all(
      files.map(async (f) => ({
        name: f.name,
        type: f.type,
        base64: await toBase64(f),
      }))
    );
    setStored(toStore);
  };

  const clearImages = () => {
    setStored([]);
    setImages([]);
  };

  const removeImage = (name: string) => {
    const updatedStored = stored.filter((img) => img.name !== name);
    setStored(updatedStored);

    const updatedImages = images.filter((file) => file.name !== name);
    setImages(updatedImages);
  };

  const value = useMemo(
    () => ({ images, addImages, clearImages, removeImage }),
    [images]
  );

  return (
    <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>
  );
};

export const useImages = (): ImagesContextType => {
  const context = useContext(ImagesContext);
  if (!context) {
    throw new Error("useImages must be used within an ImagesProvider");
  }
  return context;
};
