export type WorkflowNode = {
  class_type: string;
  id: string;
  inputs: any;
  meta: { title: string };
  next?: string;
};

export type ExecutionGraph = {
  [key: string]: WorkflowNode;
};
