import React, { useRef, useCallback, Dispatch } from 'react';
import {
  ReactFlow,

  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from "reactflow";
import { useDnD,DnDProvider } from '@/contexts/dnd';
import 'reactflow/dist/style.css';
import Customblock from './customblock';


  const initialNodes:any = [];

  let id = 0;
  const getId = () => `dndnode_${id++}`;  

  const nodeTypes = {
     blockNode: Customblock,
   };
  

export default function FlowBoard({open,setOpen,block,setBlock}:{open:boolean,setOpen:Dispatch<React.SetStateAction<boolean>>,block:any,setBlock:Dispatch<React.SetStateAction<any>>}) {



    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onConnect = useCallback(
        (params:any) => setEdges((eds) => addEdge(params, eds)),
        [],
      );

    const onDragOver = useCallback((event:any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);
    
     const onDrop = useCallback(
        (event:any) => {
          event.preventDefault();
          console.log(type,"type")
       
          const nodeType = event.dataTransfer.getData('application/reactflow'); // Retrieve the type from dataTransfer
          console.log(nodeType,"type")
          // check if the dropped element is valid
          if (!nodeType) {
            return;
          }
          const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
          const newNode = {
            id: getId(),
            type:'blockNode',
            position,
            data: { label: `${nodeType}` ,setOpen,open,setBlock},
          };
          
          setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
      );
  return (
    <div className='w-full h-screen' ref={reactFlowWrapper}>
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
  )
}

