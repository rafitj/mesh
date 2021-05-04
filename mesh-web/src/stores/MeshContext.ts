import React from 'react';
import { NetworkState } from './NetworkStore';
import { ProjectState } from './ProjectStore';
import { UserState } from './UserStore';

export const NetworkStore = new NetworkState();
export const ProjectStore = new ProjectState(NetworkStore);
export const UserStore = new UserState();

export const ProjectContext = React.createContext<ProjectState>(ProjectStore);
export const NetworkContext = React.createContext<NetworkState>(NetworkStore);
export const UserContext = React.createContext<UserState>(UserStore);
