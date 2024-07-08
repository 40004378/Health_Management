import React, { useEffect, useState} from 'react';
import axios from 'axios';
import ReactFlow, { ReactFlowProvider, Controls} from 'react-flow-renderer';

import dagre from 'dagre';
import CustomNode from './CustomNode';
import './toolsDetails.css'
import { styled } from '@material-ui/core';
 
const nodeTypes = {
  custom: CustomNode,
};

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });
    nodes.forEach((node) => {
dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });
    dagre.layout(dagreGraph);
    nodes.forEach((node) => {
const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';
        // Shift dagre's coordinates (0,0) to the top-left of the graph
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };
        return node;
    });
    return { nodes, edges };
}; 

const getEdgeColor = (sourceCondition, targetCondition) => {
  if (sourceCondition === 'default' && targetCondition === 'place') {
    return { stroke: 'black', strokeWidth: 3 };
  }
  return { stroke: '#3599d5', strokeWidth: 5  };
};

const Mindmap = () => {
  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [canvasHeight, setCanvasHeight] = useState('300');
  // Calculate the height based on the number of nodes
  const calculateHeight = (numNodes) => {
    const baseHeight = 300; // Base height for canvas
    const additionalHeightPerNode = 32; // Additional height per node
    return baseHeight + (numNodes * additionalHeightPerNode);
  };

  useEffect(() => {
const fetchNodes = axios.get('http://localhost:7074/api/tool-monitoring/api/v1/ToolsHierarchy');
    axios.all([fetchNodes])
      .then(axios.spread((nodesResponse) => {
        const nodes = nodesResponse.data.map((node, index) => ({
          ...node,
          type:'custom',
          id: node.id,
          data: {
            ...node.data,
            condition: node.data.condition || 'default'
          },
          position: { x: 0, y: 0 }
        }));
        const edges =[];
        nodesResponse.data.forEach((node) => {
        
          node.data.edges.forEach((edge) => {
            edges.push ({
              id:`e${node.id}-${edge.target}`,
              source: node.id,
              target: edge.target,
              type:'default',
              style:getEdgeColor(  
                nodes.find(n => n.id === node.id)?.data.condition,
                nodes.find(n => n.id === edge.target)?.data.condition
              )
            });
          })
        })
        const numNodes = nodes.length;
        const newHeight = calculateHeight(numNodes);
        setCanvasHeight(newHeight);
        const layoutedElements = getLayoutedElements(nodes, edges);
        setNodes(layoutedElements.nodes);
        setEdges(layoutedElements.edges);
      }))
      .catch(error => {
        console.error('error fetching nodes and edges:', error);
      });
  }, []);

  useEffect(() => {
    function hideError(err) {
        if (err.message === 'ResizeObserver loop completed with undelivered notifications.') {
            const overlayDiv = document.querySelector('#webpack-dev-server-client-overlay-div');
            if (overlayDiv) {
                overlayDiv.style.display = 'none';
            }
        }
    }

    window.addEventListener('error', hideError);

    return () => {
        window.removeEventListener('error', hideError);
    };
}, []);

  console.log("mano",nodes, edges)
  const expandNode = (nodeId) => {
    setNodes((prevNodes) => {
      const nodeToExpand = prevNodes.find(node => node.id === nodeId);
      if (!nodeToExpand) return prevNodes;
 
      const connectedNodeIds = edges
        .filter(edge => edge.source === nodeId)
        .map(edge => edge.target);
 
      return prevNodes.map(node => {
        if (connectedNodeIds.includes(node.id)) {
          return { ...node, visible: true, collapsed: true };
        }
        if (node.id === nodeId) {
          return { ...node, collapsed: false };
        }
        return node;
      });
    });
  };

  const collapseNode = (nodeId) => {
    setNodes((prevNodes) => {
      if (nodeId === '1') {
        return prevNodes.map(node => ({
          ...node,
          visible: node.id === '1',
          collapsed: true,
        }));
      } else {
        const nodeToCollapse = prevNodes.find(node => node.id === nodeId);
        if (!nodeToCollapse) return prevNodes;
        const connectedNodeIds = edges
          .filter(edge => edge.source === nodeId)
          .map(edge => edge.target);
        return prevNodes.map(node => {
          if (connectedNodeIds.includes(node.id)) {
            return { ...node, visible: false, collapsed: true };
          }
          if (node.id === nodeId) {
            return { ...node, collapsed: true };
          }
          return node;
        });
      }
    });
  };
  const getVisibleNodes = () => {
    return nodes.filter(node => node.visible !== false).map(node => ({
      ...node,
      data: {
        ...node.data,
        expandNode: expandNode,
        collapseNode: collapseNode,
        collapsed: node.collapsed,
      },
    }));
  };
  const getVisibleEdges = () => {
    return edges.filter(edge => {
      const sourceNode = nodes.find(node => node.id === edge.source);
      const targetNode = nodes.find(node => node.id === edge.target);
      return sourceNode && targetNode && sourceNode.visible !== false && targetNode.visible !== false;
    });
  };
  const visibleNodes = getVisibleNodes();
  const visibleEdges = getVisibleEdges();
  const mapStyle = {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: '12px',
    borderRadius: "32px",
  };
  return (
    <div>
      <ReactFlowProvider>
        <div style={{width:"100%", position: 'relative',height: `${canvasHeight}px`}}>
          <ReactFlow
            style={mapStyle}
            nodes={visibleNodes}
            edges={visibleEdges}
            nodeTypes={nodeTypes}
            nodesConnectable
            nodesDraggable
            onNodeClick={(event, node) => {
              if (node.collapsed) {
                expandNode(node.id);
              } else {
                collapseNode(node.id);
              }
            }}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};
export default Mindmap;
