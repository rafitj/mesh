import { action, observable } from 'mobx';
import ClientIcon from '../assets/ClientIcon.svg';
import DatabaseIcon from '../assets/DatabaseIcon.svg';
import ServerIcon from '../assets/ServerIcon.svg';
import { Api } from '../network/api';
import {
  CreateClientRequest,
  CreateDatabaseRequest,
  CreateResourceRequest,
  CreateServerRequest,
} from '../network/protos';
import { NetworkLink, NetworkNode } from '../types/Network';
import { Resource } from '../types/Resources';

export class NetworkState {
  @observable
  resources: Resource[] = [];

  @observable
  links: NetworkLink[] = [];

  @observable
  nodes: NetworkNode[] = [];

  @observable
  selectedItem?: NetworkLink | Resource;

  @observable
  isLoading: boolean = false;

  @observable
  hasError: boolean = false;

  @observable
  statusMessage: string = '';

  @action
  deselectItem = () => {
    this.selectedItem = undefined;
  };

  @action
  selectItem = (item: NetworkLink | Resource) => {
    this.selectedItem = item;
  };

  @action
  fetchProjectResources = async (projectId: string) => {
    this.isLoading = true;
    try {
      this.resources = await Api.getProjectResourcesById(projectId);
      this.createNetwork();
      this.statusMessage = 'Project loaded';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to load project';
    }
    this.isLoading = false;
  };

  @action
  createNetwork = () => {
    this.isLoading = true;
    try {
      this.resources.forEach((r) => {
        const icon =
          r.type === 'CLIENT'
            ? ClientIcon
            : r.type === 'SERVER'
            ? ServerIcon
            : DatabaseIcon;
        this.nodes.push({ id: r.id, label: r.label, svg: icon });
        r.connections.forEach((connectionId) => {
          this.links.push({ source: r.id, target: connectionId });
        });
      });
      this.statusMessage = 'Network created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create network';
    }
    this.isLoading = false;
  };

  @action
  createClient = async (payload: CreateClientRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createClient(payload);
      this.resources.push(newResource);
      this.statusMessage = 'Client succesfully created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create Client';
    }
    this.isLoading = false;
  };

  @action
  createServer = async (payload: CreateServerRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createServer(payload);
      this.resources.push(newResource);
      this.statusMessage = 'Server succesfully created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create Server';
    }
    this.isLoading = false;
  };

  @action
  createDatabase = async (payload: CreateDatabaseRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createDatabase(payload);
      this.resources.push(newResource);
      this.statusMessage = 'Database succesfully created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create Database';
    }
    this.isLoading = false;
  };
}
