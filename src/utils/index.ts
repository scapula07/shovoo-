export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
  });

export function base64ToFile(
  base64String: string,
  filename: string,
  mimeType = "image/png"
): File {
  const byteString = atob(base64String.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], filename, { type: mimeType });
}

export const getPersistedImages = async (): Promise<File[]> => {
  const storedRaw = JSON.parse(localStorage.getItem("raw_images") || "[]") as {
    base64: string;
    type: string;
    name: string;
  }[];
  if (!storedRaw) return [];

  const files = storedRaw.map((b64, idx) =>
    base64ToFile(b64.base64, `image-${idx}.png`)
  );

  return files;
};
