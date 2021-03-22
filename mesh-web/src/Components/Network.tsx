import React from 'react';
import axios from "axios";
import { Graph, GraphConfiguration } from 'react-d3-graph';
import { Resource } from '../types/Resources';
import '../stylesheets/graph.css'
import ServerIcon from '../assets/ServerIcon.svg'
import DatabaseIcon from '../assets/DatabaseIcon.svg'
import ClientIcon from '../assets/ClientIcon.svg'

type GraphData = {
    nodes: Array<{id: string, svg: string}>,
    links: Array<{source: string, target: string}>
}

interface NetworkProps {
    resources?: Array<Resource>
}
const createGraph = (resources?: Array<Resource>) => {
    let newData: GraphData = {nodes: [], links: []};
    if (resources) {
        resources.forEach(r => {
            let icon: string = ServerIcon;
            if (r.type === "DATABASE") {
                icon = DatabaseIcon
            } else if (r.type === "CLIENT"){
                icon = ClientIcon
            }
            newData.nodes.push({id: r.label, svg: icon})
        })
    }
    return newData;
}
export const Network = ({resources}: NetworkProps) => {
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
            highlightFontSize: 14
        },
        link: {
            highlightColor: 'lightblue'
        },
    };
    return (
        <Graph
            id='graph-id' 
            data={createGraph(resources)}
            config={myConfig}
        />
    );
}
