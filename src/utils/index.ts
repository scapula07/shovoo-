export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
  });

export const getPersistedImages = async (): Promise<File[]> => {
  const storedRaw = localStorage.getItem("raw_images");
  if (!storedRaw) return [];

  const stored = JSON.parse(storedRaw) as {
    name: string;
    type: string;
    blobUrl: string;
  }[];

  const files = await Promise.all(
    stored.map(async (img) => {
      const blob = await fetch(img.blobUrl).then((r) => r.blob());
      return new File([blob], img.name, { type: img.type });
    })
  );

  return files;
};
