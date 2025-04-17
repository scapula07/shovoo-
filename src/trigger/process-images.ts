import { task, wait, logger } from "@trigger.dev/sdk/v3";
import { ExecutionGraph, WorkflowNode } from "@/lib/types/workflow.type";
import { cropImg } from "../lib/ffmpeg/utils";

type Payload = {
  userId: string;
  executionGraph: ExecutionGraph;
  files: File[];
};

const simulateProcessing = async (label: string, delay = 1500) => {
  logger.log(`🛠️ Simulating: ${label}`);
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const processImageWorkflow = task({
  id: "process-image-workflow",
  run: async ({ executionGraph, userId, files }: Payload) => {
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

            for (const file of processedImages) {
              const croppedFile = await cropImg(file, width, height);
              if (!croppedFile) throw new Error("Crop failed");
              const resultFile = new File([croppedFile], file.name, {
                type: "image/png",
              });
              croppedResults.push(resultFile);
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
