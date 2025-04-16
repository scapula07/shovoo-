import { WorkflowNode } from "@/lib/types/workflow.type";
import { atom } from "recoil";
import { ExecutionGraph } from "@/lib/types/workflow.type";

export const userStore = atom({
  key: "userStore",
  default: {},
});

export const executionGraphStore = atom<ExecutionGraph>({
  key: "gatewayStore",
  default: {},
});
