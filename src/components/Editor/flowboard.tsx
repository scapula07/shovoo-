import React, {
  useRef,
  useCallback,
  Dispatch,
  useEffect,
  useMemo,
} from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from "reactflow";
import { useDnD } from "@/contexts/dnd";
import "reactflow/dist/style.css";
import Customblock from "./customblock";
import { useRecoilState } from "recoil";
import { executionGraphStore } from "@/recoil";

const initialNodes: any = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  blockNode: Customblock,
};

interface ExecutionNode {
  id: string;
  class_type: string;
  inputs: Record<string, [string, number]>;
  meta: { title: string };
  next?: string;
}

export default function FlowBoard({
  open,
  setOpen,
  block,
  setBlock,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  block: any;
  setBlock: Dispatch<React.SetStateAction<any>>;
}) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const [graph, setGraph] = useRecoilState(executionGraphStore);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type: "blockNode",
        position,
        data: { label: `${nodeType}`, setOpen, open, setBlock },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const convertToExecutionFormat = (nodes: any, edges: any) => {
    let executionGraph: Record<number, ExecutionNode> = {};

    // Define nodeMap with correct type
    const nodeMap = new Map<string, Node>(
      nodes.map((node: any) => [node.id, node])
    );

    const outgoingEdges = new Map<string, string>(); // Maps source node to target node
    const incomingEdges = new Set<string>(); // Tracks which nodes have incoming edges

    edges.forEach((edge: any) => {
      outgoingEdges.set(edge.source, edge.target);
      incomingEdges.add(edge.target);
    });

    let step = 1;
    let queue = nodes
      .filter((node: any) => !incomingEdges.has(node.id)) // Start from nodes with no incoming edges
      .map((node: any) => ({ node, step }));

    while (queue.length > 0) {
      let { node, step } = queue.shift()!;
      let nodeId = node.id;
      let nodeLabel = (node.data as any)?.label || "DefaultType"; // Ensure `data` exists

      // Add the node to the execution graph
      executionGraph[step] = {
        id: nodeId,
        class_type: nodeLabel.replace(/\s/g, ""),
        inputs: {},
        meta: { title: nodeLabel },
      };

      // Check for the next node
      if (outgoingEdges.has(nodeId)) {
        let nextNodeId = outgoingEdges.get(nodeId)!;
        let nextNode = nodeMap.get(nextNodeId) as any | undefined;

        if (nextNode) {
          executionGraph[step].next = (nextNode?.data as any)?.label || null;

          queue.push({ node: nextNode, step: step + 1 });

          // Store dependencies
          let nextStep = step + 1;
          executionGraph[nextStep] = executionGraph[nextStep] || {
            id: nextNodeId,
            class_type: (nextNode.data as any)?.label.replace(/\s/g, "") || "",
            inputs: {},
            meta: { title: (nextNode.data as any)?.label || "" },
          };

          executionGraph[nextStep].inputs[nodeId] = [nodeId, 0];
        }
      }
    }

    return executionGraph;
  };

  const executionGraph = useMemo(() => {
    if (nodes.length === 0 || edges.length === 0) return {};
    return convertToExecutionFormat(nodes, edges);
  }, [nodes, edges]);

  useEffect(() => {
    if (Object.keys(executionGraph).length === 0) return;

    setGraph((prevGraph) => {
      const mergedGraph = Object.fromEntries(
        Object.entries(executionGraph).map(([step, node]) => {
          const prevNode = prevGraph[step];

          return [
            step,
            {
              ...node,
              // Preserve inputs if node existed before
              inputs: prevNode?.inputs ?? node.inputs,
              meta: {
                ...node.meta,
                ...(prevNode?.meta || {}),
              },
            },
          ];
        })
      );

      const newGraphString = JSON.stringify(mergedGraph);
      const prevGraphString = JSON.stringify(prevGraph);

      if (newGraphString !== prevGraphString) {
        console.log("Execution JSON Format (merged):", newGraphString);
        return mergedGraph;
      }

      return prevGraph;
    });
  }, [executionGraph]);

  return (
    <div className="w-full h-screen" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        style={{ backgroundColor: "#F7F9FB" }}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
