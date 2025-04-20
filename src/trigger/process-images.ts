import { task, wait, logger } from "@trigger.dev/sdk/v3";
import { ExecutionGraph, WorkflowNode } from "@/lib/types/workflow.type";
import { cropImg } from "../lib/ffmpeg/utils";
import { SDAPI } from "@/lib/ai/utils";
import ffmpeg from "fluent-ffmpeg";
import fetch from "node-fetch";
import fs from "fs/promises";
import os from "os";
import path from "path";
import {downloadImageToTemp,createTempPath,cleanupFiles} from "../utils/fs.utils"
type Payload = {
  workflowId: string;
  executionGraph: ExecutionGraph;
  files:any;
};

const aiApi= new SDAPI()

const simulateProcessing = async (label: string, delay = 1500) => {
  logger.log(`🛠️ Simulating: ${label}`);
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const processImageWorkflow = task({
  id: "process-image-workflow",
  run: async ({ executionGraph, workflowId, files }: Payload) => {
  
     console.log(files,"ff")
    const nodes = Object.values(executionGraph);

    const startNode = nodes[0];

    if (!startNode) {
      throw new Error("Start node not found");
    }

    let currentNode: WorkflowNode | undefined = startNode;
    let processedImages = files;

    const visited = new Set<string>();

    while (currentNode) {
      if (visited.has(currentNode.id)) {
        break;
      }

      visited.add(currentNode.id);

      const inputs = currentNode.inputs;

      try {
        switch (currentNode.meta.title) {
          case "Crop Media": {
            const { width, height, gravity } = inputs;

            const croppedResults: File[] = [];
        
            for (const url of processedImages) {
              await cropImageFromUrl(url, {width, height})
              // const croppedFile = await cropImg(file, width, height);
              // if (!croppedFile) throw new Error("Crop failed");
              // const resultFile = new File([croppedFile], file.name, {
              //   type: "image/png",
              // });
              // croppedResults.push(resultFile);
            }

            processedImages = croppedResults;
            break;
          }

          case "Apply Background":
            await simulateProcessing("Apply Background");
            break;

          case "Text overlay":
            await simulateProcessing("Text Overlay");
            break;

          case "Resize":
            await simulateProcessing("Resize");
            break;
          
          case "Image-to-text":
            await simulateProcessing("image to text");
            for (const url of processedImages) {
                const res = await fetch(url);
             }
            break;

          case "Image-to-image":
            await simulateProcessing("image to image");
            break;

          case "Background removal":
            await simulateProcessing("remove background");
            break;

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

    return {
      status: "completed",
      images: processedImages,
    };
  },
});





export async function cropImageFromUrl(
  imageUrl: string,
  cropOptions: { width: number; height: number; x?: number; y?: number }
): Promise<Buffer> {
  const { width, height, x = 0, y = 0 } = cropOptions;
  const inputPath = await downloadImageToTemp(imageUrl);
  const outputPath = await createTempPath("cropped");

  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions(`-vf`, `crop=${width}:${height}:${x}:${y}`)
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  const result = await fs.readFile(outputPath);
  console.log(result,"crop")
  await cleanupFiles([inputPath, outputPath]);
  return result;
}





export async function resizeImageFromUrl(
  imageUrl: string,
  size: { width: number; height: number }
): Promise<Buffer> {
  const inputPath = await downloadImageToTemp(imageUrl);
  const outputPath = await createTempPath("resized");

  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions(`-vf`, `scale=${size.width}:${size.height}`)
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  const result = await fs.readFile(outputPath);
  console.log(result,"rezized")
  await cleanupFiles([inputPath, outputPath]);
  return result;
}


export async function applyBackgroundToImage(
  foregroundUrl: string,
  backgroundUrl: string
): Promise<Buffer> {
  const fgPath = await downloadImageToTemp(foregroundUrl);
  const bgPath = await downloadImageToTemp(backgroundUrl);
  const outputPath = await createTempPath("composite");

  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(bgPath)
      .input(fgPath)
      .complexFilter(["[1][0]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2"])
      .output(outputPath)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  const result = await fs.readFile(outputPath);
  console.log(result,"apply")
  await cleanupFiles([fgPath, bgPath, outputPath]);
  return result;
}



export async function addTextOverlayToImage(
  imageUrl: string,
  text: string,
  fontSize = 24,
  fontColor = "white"
): Promise<Buffer> {
  const inputPath = await downloadImageToTemp(imageUrl);
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
  console.log(result,"text")
  return result;
}
