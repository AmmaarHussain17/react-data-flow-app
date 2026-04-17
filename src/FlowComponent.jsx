import { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

const FlowComponent = ({ posts }) => {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      data: { label: "Node 1" },
      position: { x: 100, y: 100 },
    },
  ]);

  const [edges, setEdges] = useState([]);

  // Handle node changes (drag, move, etc.)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle connection
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Add new node dynamically
  const addNode = () => {
  const index = nodes.length;

    const newNode = {
        id: (index + 1).toString(),
        data: {
        label: posts[index]?.title?.slice(0, 20) + "..." || `Node ${index + 1}`,
        },
        position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
        },
    };

    setNodes((prev) => [...prev, newNode]);
    };

  return (
    <div>
      <button onClick={addNode} style={{ marginBottom: "10px" }}>
        Add Node
      </button>

    <div
        style={{
        height: "500px",
        marginTop: "20px",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #333",
        }}
    >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowComponent;