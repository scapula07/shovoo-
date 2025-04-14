import { Job, eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/lib/trigger/client";
import { ExecutionGraph, WorkflowNode } from "@/lib/types/workflow.type";

client.defineJob({
  id: "process-image-workflow",
  name: "Process Image Workflow",
  version: "1.0.0",
  trigger: eventTrigger({
    name: "run-workflow",
  }),
  run: async (payload, io, ctx) => {
    const { workflowId, executionGraph, userId } = payload as {
      workflowId: string;
      executionGraph: ExecutionGraph;
      userId: string;
    };

    const allNodes = Object.values(executionGraph);
    const allNexts = new Set(allNodes.map((node) => node.next).filter(Boolean));
    const startNode = allNodes.find((node) => !allNexts.has(node.meta.title));

    if (!startNode) throw new Error("Start node not found");

    const orderedSteps: WorkflowNode[] = [];
    let currentNode: WorkflowNode | undefined = startNode;

    while (currentNode) {
      orderedSteps.push(currentNode);
      const nextTitle: string | undefined = currentNode.next;
      currentNode = allNodes.find(
        (node: WorkflowNode): boolean => node.meta.title === nextTitle
      );
    }

    for (const step of orderedSteps) {
      await io.runTask(
        step.meta.title || step.class_type,
        async () => {
          console.log(`Processing ${step.class_type} (${step.id})`);
          // Do your actual processing here
          await new Promise((res) => setTimeout(res, 1500));
        },
        {
          retry: {
            limit: Infinity,
          },
        }
      );
    }

    return { status: "completed", steps: orderedSteps.length };
  },
});
