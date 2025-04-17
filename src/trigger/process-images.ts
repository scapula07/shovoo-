import { task, wait, logger } from "@trigger.dev/sdk/v3";
import { ExecutionGraph, WorkflowNode } from "@/lib/types/workflow.type";

type Payload = {
  userId: string;
  executionGraph: ExecutionGraph;
};

const simulateProcessing = async (label: string, delay = 1500) => {
  logger.log(`🛠️ Simulating: ${label}`);
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const processImageWorkflow = task({
  id: "process-image-workflow",
  run: async ({ executionGraph, userId }: Payload) => {
    const nodes = Object.values(executionGraph);

    const startNode = nodes[0];

    if (!startNode) {
      throw new Error("Start node not found");
    }

    let currentNode: WorkflowNode | undefined = startNode;

    const visited = new Set<string>();

    while (currentNode) {
      if (visited.has(currentNode.id)) {
        break;
      }

      visited.add(currentNode.id);

      try {
        switch (currentNode.meta.title) {
          case "Crop Media":
            await wait.for({ seconds: 3 }); // simulate wait
            break;

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
    };
  },
});
