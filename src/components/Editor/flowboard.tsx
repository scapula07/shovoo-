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
  getIncomers,
  getOutgoers,
  getConnectedEdges,
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
  workflow
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  block: any;
  setBlock: Dispatch<React.SetStateAction<any>>;
  workflow:any
}) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [graph, setGraph] = useRecoilState(executionGraphStore);

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
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
      const id = getId();
      const newNode = {
        id,
        type: "blockNode",
        position,
        data: { id, label: `${nodeType}`, setOpen, open, setBlock },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const convertToExecutionFormat = (nodes: any, edges: any) => {
    let executionGraph: Record<number, ExecutionNode> = {};

    const nodeMap = new Map<string, Node>(
      nodes.map((node: any) => [node.id, node])
    );

    const outgoingEdges = new Map<string, string>();
    const incomingEdges = new Set<string>();

    edges.forEach((edge: any) => {
      outgoingEdges.set(edge.source, edge.target);
      incomingEdges.add(edge.target);
    });

    let step = 1;
    let queue = nodes
      .filter((node: any) => !incomingEdges.has(node.id))
      .map((node: any) => ({ node, step }));

    while (queue.length > 0) {
      let { node, step } = queue.shift()!;
      let nodeId = node.id;
      let nodeLabel = (node.data as any)?.label || "DefaultType";

      executionGraph[step] = {
        id: nodeId,
        class_type: nodeLabel.replace(/\s/g, ""),
        inputs: {},
        meta: { title: nodeLabel },
      };

      if (outgoingEdges.has(nodeId)) {
        let nextNodeId = outgoingEdges.get(nodeId)!;
        let nextNode = nodeMap.get(nextNodeId) as any | undefined;

        if (nextNode) {
          executionGraph[step].next = (nextNode?.data as any)?.label || null;

          queue.push({ node: nextNode, step: step + 1 });

          let nextStep = step + 1;
          executionGraph[nextStep] = executionGraph[nextStep] || {
            id: nextNodeId,
            class_type: (nextNode.data as any)?.label.replace(/\s/g, "") || "",
            class_id: (nextNode.data as any)?.label,
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

    setGraph((prevGraph: any) => {
      const mergedGraph = Object.fromEntries(
        Object.entries(executionGraph).map(([step, node]) => {
          const prevNode = prevGraph[step];
          return [
            step,
            {
              ...node,
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

  const onNodesDelete = useCallback(
    (deleted: any) => {
      setEdges(
        deleted.reduce((acc: any, node: any) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge: any) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }: any) =>
            outgoers.map(({ id: target }: any) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  // --- IMPORTANT: hydrate nodes/edges from existing executionGraph ---
  useEffect(() => {
    console.log("graph up")
    if (!workflow?.executionGraph || Object.keys(workflow?.executionGraph).length === 0) return;
       console.log("graph in")
    const newNodes: any[] = [];
    const newEdges: any[] = [];

    const idToStep = new Map<string, string>();
    const graph=workflow?.executionGraph as any
    for (const [step, nodeData] of Object.entries(graph)) {
      const node = nodeData as {
        id: string;
        class_type: string;
        class_id: string;
        inputs: Record<string, [string, number]>;
        meta: { title: string };
        next?: string;
      };
      idToStep.set(node?.id, step);
      newNodes.push({
        id: node.id,
        type: "blockNode",
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: {
          id: node.id,
          label: node.class_type,
          setOpen,
          open,
          setBlock,
        },
      });

      if (node.next) {
        console.log(node.next,Object.values(workflow?.executionGraph),"next")
        const targetNode :any = Object.values(workflow?.executionGraph).find(
          (n: any) => n.meta.title === node.next
         );
         console.log(targetNode,"targer")
        if (targetNode) {
          newEdges.push({
            id: `reactflow__edge-${node.id}-${targetNode.id}`,
            source: node.id,
            target: targetNode?.id,
          });
        }
      }
    }
   console.log(newNodes,newEdges,"up")
    setNodes(newNodes);
    setEdges(newEdges);
  }, [workflow?.executionGraph]);

  console.log(nodes, edges, "nodes");

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
        onNodesDelete={onNodesDelete}
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
