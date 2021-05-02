import { useToast } from '@chakra-ui/toast';
import { observer } from 'mobx-react';
import React from 'react';
import { Graph } from 'react-d3-graph';
import { NetworkContext } from '../../../stores/MeshContext';
import { NetworkNode } from '../../../types/Network';
import { toastSettings } from '../../styles/components';
import '../../styles/graph.css';
import { LinkInfo } from './LinkInfo';
import { NetworkTools } from './NetworkTools';

export const Network = observer(() => {
  const NetworkStore = React.useContext(NetworkContext);
  const [graphRef, setGraphRef] = React.useState<any>(null);
  const toast = useToast();
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
      highlightOpacity: 1,
      fontColor: 'white',
      strokeWidth: 2.5,
      opacity: 0.8,
    },
    focusZoom: 1.25,
    initialZoom: 1,
    highlightOpacity: 0.5,
    d3: {
      gravity: -500,
    },
  };

  const handleRefChange = React.useCallback((ref) => {
    setGraphRef(ref);
  }, []);

  const resetGraph = React.useCallback(() => {
    if (graphRef) {
      graphRef.resetNodesPositions();
      // TODO: Reset canvas zoom and pan
    }
  }, [graphRef]);

  const onSelectNode = (nodeId: string) => {
    NetworkStore.selectNode(nodeId);
    toast({
      ...toastSettings,
      title: 'Selected new node',
      status: 'info',
    });
  };

  const onSelectLink = (src: string, target: string) => {
    NetworkStore.selectLink(src, target);
    toast({
      ...toastSettings,
      title: 'Selected new link',
      status: 'info',
    });
  };

  return (
    <>
      <NetworkTools resetGraph={resetGraph} />
      <LinkInfo />
      <Graph
        ref={handleRefChange}
        id="mesh-graph"
        data={NetworkStore.graph}
        config={graphConfig}
        onClickNode={onSelectNode}
        onMouseOutNode={NetworkStore.unhoverNode}
        onMouseOverNode={NetworkStore.hoverNode}
        onClickLink={onSelectLink}
        onMouseOverLink={NetworkStore.hoverLink}
        onMouseOutLink={NetworkStore.unhoverLink}
      />
    </>
  );
});
