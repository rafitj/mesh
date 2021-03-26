import React from 'react';
import { Graph } from 'react-d3-graph';
import { NetworkData, NetworkNode } from '../../../types/Network';
import { Resource } from '../../../types/Resources';
import ClientIcon from '../assets/ClientIcon.svg';
import DatabaseIcon from '../assets/DatabaseIcon.svg';
import ServerIcon from '../assets/ServerIcon.svg';
import '../stylesheets/graph.css';
import { NetworkTools } from './NetworkTools';

interface NetworkProps {
  resources: Resource[];
  onClickNode: (nodeId: string) => void;
}
const createGraph = (resources: Resource[]) => {
  const newData: NetworkData = { nodes: [], links: [] };
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
      labelProperty: (node: NetworkNode) => node.label,
    },
    link: {
      highlightColor: 'lightblue',
    },
  };
  return (
    <>
      <NetworkTools resources={resources} />
      <Graph
        id="graph-id"
        data={createGraph(resources)}
        config={myConfig}
        onClickNode={onClickNode}
      />
    </>
  );
};
