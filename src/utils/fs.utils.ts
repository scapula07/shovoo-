import os from "os";
import path from "path";
import fs from "fs/promises";
import fetch from "node-fetch";

export async function downloadImageToTemp(imageUrl: string): Promise<string> {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to fetch image from ${imageUrl}`);
  const buffer = await res.buffer();
  const filePath = path.join(os.tmpdir(), `img_${Date.now()}.png`);
  await fs.writeFile(filePath, buffer);
  return filePath;
}

export async function createTempPath(prefix: string): Promise<string> {
  return path.join(os.tmpdir(), `${prefix}_${Date.now()}.png`);
}

export async function cleanupFiles(filePaths: string[]) {
  await Promise.all(filePaths.map(async (fp) => fs.unlink(fp).catch(() => {})));
}


export async function writeBufferToTemp(buffer: Buffer, extension = "png"): Promise<string> {
    const tempFilePath = path.join(os.tmpdir(), `image-${Date.now()}.${extension}`);
    await fs.writeFile(tempFilePath, buffer);
    return tempFilePath;
  }


  