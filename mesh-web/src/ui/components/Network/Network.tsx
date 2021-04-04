import { observer } from 'mobx-react';
import React from 'react';
import { Graph } from 'react-d3-graph';
import { NetworkContext } from '../../../stores/MeshContext';
import { NetworkNode } from '../../../types/Network';
import '../../styles/graph.css';
import { NetworkTools } from './NetworkTools';

export const Network = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  const graphConfig = {
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
      highlightColor: '#81E6D9',
    },
    focusZoom: 1.25,
    highlightOpacity: 0.5,
    d3: {
      gravity: -500,
    }
  };

  return (
    <>
      <NetworkTools />
      <Graph
        id="graph-id"
        data={NetworkStore.graph}
        config={graphConfig}
        onClickNode={NetworkStore.selectNode}
        onClickLink={NetworkStore.selectLink}
      />
    </>
  );
});
