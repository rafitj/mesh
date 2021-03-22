import React from 'react';
import { Graph } from 'react-d3-graph';
import ClientIcon from '../assets/ClientIcon.svg';
import DatabaseIcon from '../assets/DatabaseIcon.svg';
import ServerIcon from '../assets/ServerIcon.svg';
import '../stylesheets/graph.css';
import { Resource } from '../types/Resources';

type Node = { id: string; label: string; svg: string };
type Link = { source: string; target: string };
type GraphData = {
  nodes: Node[];
  links: Link[];
};

interface NetworkProps {
  resources?: Resource[];
  onClickNode: (nodeId: string) => void;
}
const createGraph = (resources?: Resource[]) => {
  const newData: GraphData = { nodes: [], links: [] };
  if (resources) {
    resources.forEach((r) => {
      let icon: string = ServerIcon;
      if (r.type === 'DATABASE') {
        icon = DatabaseIcon;
      } else if (r.type === 'CLIENT') {
        icon = ClientIcon;
      }
      newData.nodes.push({ id: r.id, label: r.label, svg: icon });
      r.connections.forEach((connectionId) => {
        newData.links.push({ source: r.id, target: connectionId });
      });
    });
  }
  return newData;
};
export const Network = ({ resources, onClickNode }: NetworkProps) => {
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      size: 600,
      highlightStrokeColor: 'blue',
      labelPosition: 'bottom',
      fontColor: 'white',
      fontWeight: '700',
      fontSize: 14,
      highlightColor: 'white',
      highlightFontWeight: '700',
      highlightFontSize: 14,
      labelProperty: (node: Node) => node.label,
    },
    link: {
      highlightColor: 'lightblue',
    },
  };
  return (
    <Graph
      id="graph-id"
      data={createGraph(resources)}
      config={myConfig}
      onClickNode={onClickNode}
    />
  );
};
