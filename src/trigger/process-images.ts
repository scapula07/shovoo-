import { task, wait, logger } from "@trigger.dev/sdk/v3";
import { ExecutionGraph, WorkflowNode } from "@/lib/types/workflow.type";
import { cropImg } from "../lib/ffmpeg/utils";
import { SDAPI } from "@/lib/ai/utils";
import ffmpeg from "fluent-ffmpeg";
import fetch from "node-fetch";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { getStorage, ref, uploadString } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {downloadImageToTemp,createTempPath,cleanupFiles,writeBufferToTemp} from "../utils/fs.utils"
import { Blob } from 'fetch-blob'




type Payload = {
  workflowId: string;
  executionGraph: ExecutionGraph;
  files:any;
};


const firebaseConfig = {
  apiKey: "AIzaSyCIFa1gbo2BWLuHAo3Oozozyt5jK_UShVY",
  authDomain: "devspage-a55cf.firebaseapp.com",
  projectId: "devspage-a55cf",
  storageBucket: "devspage-a55cf.appspot.com",
  messagingSenderId: "91329266555",
  appId: "1:91329266555:web:72941933425ad1b71ef3de",
  measurementId: "G-C2NVHD34Y1"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(); //
const aiApi= new SDAPI()

const simulateProcessing = async (label: string, delay = 1500) => {
  logger.log(`🛠️ Simulating: ${label}`);
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const processImageWorkflow = task({
  id: "process-image-workflow",
  run: async ({ executionGraph, workflowId, files }: Payload) => {
    console.log(files, "Initial Files");

    const nodes = Object.values(executionGraph);
    const startNode = nodes[0];

    if (!startNode) {
      throw new Error("Start node not found");
    }

    let currentNode: WorkflowNode | undefined = startNode;
    let processedImages: Buffer[] = [];

    // Step 1: Download all image URLs into buffers
    for (const url of files) {
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      processedImages.push(Buffer.from(buffer));
    }

    console.log(processedImages,"processed images")

    const visited = new Set<string>();

    while (currentNode) {
      if (visited.has(currentNode.id)) break;
      visited.add(currentNode.id);

      const inputs = currentNode.inputs;

      try {
        switch (currentNode.meta.title) {
          case "Crop Media": {
            const { width, height, gravity } = inputs;
            const cropped: Buffer[] = [];

            for (const img of processedImages) {
              const croppedImage = await cropImage(img, { width, height });
              cropped.push(croppedImage);
            }

            processedImages = cropped;
            break;
          }

          case "Resize": {
            const { width, height } = inputs;
            const resized: Buffer[] = [];
            
            for (const img of processedImages) {
              const resizedImage = await resizeImage(img, { width, height });
              resized.push(resizedImage);
            }

            processedImages = resized;
            break;
          }
          case "Apply Background": {
            
            const { background} = inputs;
            console.log(background,"background")
            const withBg: Buffer[] = [];
          
            let backgroundInput;
          
            const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(background);
            if (isHex) {
              backgroundInput = background; // just pass the hex string directly
            } else {
              const bgRes = await fetch(background);
              backgroundInput = Buffer.from(await bgRes.arrayBuffer());
            }
          
            for (const img of processedImages) {
              const composited = await replaceBackgroundWithWhite(img);
              withBg.push(composited);
            }
          
            processedImages = withBg;
            break;
          }
          

          case "Text overlay": {
            const { overlayText } = inputs;
            const overlayed: Buffer[] = [];

            for (const img of processedImages) {
              const withText = await addTextOverlayToImage(img, overlayText);
              overlayed.push(withText);
            }

            processedImages = overlayed;
            break;
          }

          case "Image-to-text":
            await simulateProcessing("image to text");
            break;

          case "Image-to-image":
            await simulateProcessing("image to image");
            break;

          case "Background removal": {
            const bgRemoved: Buffer[] = [];
            for (const img of processedImages) {
              const cleaned = await removeBackgroundFromImage(img);
              bgRemoved.push(cleaned);
            }
            processedImages = bgRemoved;
            break;
          }
            

          default:
            console.warn(`Unknown step: ${currentNode.meta.title}`);
            break;
        }
      } catch (error) {
        throw new Error(
          `Step "${currentNode.meta.title}" failed with message: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }

      const nextTitle: string | undefined = currentNode.next;
      currentNode = nodes.find((n) => n.meta.title === nextTitle);

    }



    const uploadedUrls: string[] = [];

    for (let i = 0; i < processedImages.length; i++) {
        const base64Image = processedImages[i].toString("base64");
        const imageRef = ref(storage, `processed/${workflowId}/image-${i}.png`);

      // Upload as base64 string
        const snapshot =await uploadString(imageRef, base64Image, 'base64');
   
        const downloadURL=`https://firebasestorage.googleapis.com/v0/b/${snapshot?.metadata?.bucket}/o/${encodeURIComponent(snapshot?.metadata?.fullPath)}?alt=media`
   
      uploadedUrls.push(downloadURL);
    }

    console.log(uploadedUrls,"urls")


    return {
      status: "completed",
      images:uploadedUrls, 
    };
  },
});






export async function cropImage(
  input: string | Buffer,
  cropOptions: { width: number; height: number; x?: number; y?: number }
): Promise<Buffer> {
  const { width, height, x = 0, y = 0 } = cropOptions;
  const inputPath =
    typeof input === "string" ? await downloadImageToTemp(input) : await writeBufferToTemp(input);
  const outputPath = await createTempPath("cropped");

  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions("-vf", `crop=${width}:${height}:${x}:${y}`)
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  const result = await fs.readFile(outputPath);
  await cleanupFiles([inputPath, outputPath]);
  return result;
}





export async function resizeImage(
  input: string | Buffer,
  size: { width: number; height: number }
): Promise<Buffer> {
  const inputPath =
    typeof input === "string" ? await downloadImageToTemp(input) : await writeBufferToTemp(input);
  const outputPath = await createTempPath("resized");

  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions("-vf", `scale=${size.width}:${size.height}`)
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  const result = await fs.readFile(outputPath);
  await cleanupFiles([inputPath, outputPath]);
  return result;
}



export async function replaceBackgroundWithWhite(foreground: string | Buffer): Promise<Buffer> {
  const fgPath =
    typeof foreground === "string"
      ? await downloadImageToTemp(foreground)
      : await writeBufferToTemp(foreground);

  // Get the dimensions of the foreground image
  const size = { width: 512, height: 512 }; // Default to 512x512 for now
  try {
    const ffprobe = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      ffmpeg.ffprobe(fgPath, (err, metadata) => {
        if (err) return reject(err);
        const stream = metadata.streams.find((s) => s.width && s.height);
        resolve({
          width: stream?.width ?? 512,
          height: stream?.height ?? 512,
        });
      });
    });
    size.width = ffprobe.width;
    size.height = ffprobe.height;
  } catch (_) {}

  // Create the white background image with the same dimensions
  const bgPath = await createWhiteBackground(size.width, size.height);

  // Composite the foreground image onto the white background
  const outputPath = await createTempPath("composite");

  // await new Promise<void>((resolve, reject) => {
  //   ffmpeg()
  //     .input(bgPath)
  //     .input(fgPath)
  //     .complexFilter([
  //       "[1:v]format=rgba[fg];[0][fg]overlay=(W-w)/2:(H-h)/2:format=auto"
  //     ])
  //     .output(outputPath)
  //     .on("end", resolve)
  //     .on("error", reject)
  //     .run();
  // });

  const result = await fs.readFile(outputPath);
  await cleanupFiles([fgPath, bgPath, outputPath]);
  return result;
}











export async function addTextOverlayToImage(
  input: string | Buffer,
  text: string,
  fontSize = 24,
  fontColor = "white"
): Promise<Buffer> {
  const inputPath =
    typeof input === "string" ? await downloadImageToTemp(input) : await writeBufferToTemp(input);
  const outputPath = await createTempPath("text");

  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoFilters(`drawtext=text='${text}':fontcolor=${fontColor}:fontsize=${fontSize}:x=10:y=10`)
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  const result = await fs.readFile(outputPath);
  await cleanupFiles([inputPath, outputPath]);
  return result;
}


async function createWhiteBackground(width: number, height: number): Promise<string> {
  const outputPath = await createTempPath("white-bg");
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input("color=white:s=" + `${width}x${height}`)
      .inputFormat("lavfi")
      .outputOptions("-frames:v 1")
      .output(outputPath)
      .on("end", () => resolve(outputPath))
      .on("error", reject)
      .run();
  });
}







export async function removeBackgroundFromImage(input: Buffer): Promise<Buffer> {
  const tempPath = await writeBufferToTemp(input);
  const blob = bufferToBlob(input, 'image/png');
  

  const formData = new FormData();
  formData.append("image_file", blob);
  formData.append("size", "auto");

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key":"",
    },
    body: formData as any,
  });


  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Remove.bg API failed: ${res.status} ${errorText}`);
  }

  const resultBuffer = Buffer.from(await res.arrayBuffer());
  await cleanupFiles([tempPath]);

  return resultBuffer;
}

function bufferToBlob(buffer: Buffer, type: string): Blob {
  return new Blob([buffer], { type });
}
