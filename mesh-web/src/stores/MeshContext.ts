import React from 'react'
import { NetworkState } from './NetworkStore';
import { ProjectState } from './ProjectStore';

export const NetworkStore = new NetworkState();
export const ProjectStore = new ProjectState(NetworkStore);

export const ProjectContext = React.createContext<ProjectState>(ProjectStore);
export const NetworkContext = React.createContext<NetworkState>(NetworkStore);
