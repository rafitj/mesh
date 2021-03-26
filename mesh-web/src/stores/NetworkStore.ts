import { action, computed, makeObservable, observable } from 'mobx';
import { Api } from '../network/api';
import {
  CreateClientRequest,
  CreateDatabaseRequest,
  CreateServerRequest,
} from '../network/protos';
import { NetworkLink, NetworkNode } from '../types/Network';
import { Resource } from '../types/Resources';
import { getResourceImg } from '../utils/helper';
export class NetworkState {
  resources: Resource[] = [];

  links: NetworkLink[] = [];

  nodes: NetworkNode[] = [];

  selectedItem?: Resource;

  isLoading: boolean = false;

  hasError: boolean = false;

  statusMessage: string = '';

  constructor() {
    makeObservable(this, {
      resources: observable,
      links: observable,
      nodes: observable,
      selectedItem: observable,
      isLoading: observable,
      hasError: observable,
      statusMessage: observable,
      graph: computed,
      deselectItem: action,
      selectResource: action,
      fetchProjectResources: action,
      createNetwork: action,
      updateNetwork: action,
      createClient: action,
      createDatabase: action,
      createServer: action,
    });
  }

  get graph() {
    return { nodes: this.nodes, links: this.links };
  }

  deselectItem = () => {
    this.selectedItem = undefined;
  };

  selectResource = (itemId: string) => {
    this.selectedItem = this.resources.find((r) => r.id === itemId);
  };

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

  createNetwork = () => {
    this.isLoading = true;
    try {
      const nodes: NetworkNode[] = [];
      const links: NetworkLink[] = [];
      this.resources.forEach((r) => {
        nodes.push({ id: r.id, label: r.label, svg: getResourceImg(r.type) });
        r.connections.forEach((connectionId) => {
          links.push({ source: r.id, target: connectionId });
        });
      });
      this.nodes = [...nodes];
      this.links = [...links];
      this.statusMessage = 'Network created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create network';
    }
    this.isLoading = false;
  };

  updateNetwork = (r: Resource) => {
    this.nodes = [
      ...this.nodes,
      { id: r.id, label: r.label, svg: getResourceImg(r.type) },
    ];
    const links = [...this.links];
    r.connections.forEach((connectionId) =>
      links.push({ source: r.id, target: connectionId })
    );
    this.links = [...links];
  };

  createClient = async (payload: CreateClientRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createClient(payload);
      this.resources = [...this.resources, newResource];
      this.updateNetwork(newResource);
      this.statusMessage = 'Client succesfully created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create Client';
    }
    this.isLoading = false;
  };

  createServer = async (payload: CreateServerRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createServer(payload);
      this.resources = [...this.resources, newResource];
      this.updateNetwork(newResource);
      this.statusMessage = 'Server succesfully created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create Server';
    }
    this.isLoading = false;
  };

  createDatabase = async (payload: CreateDatabaseRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createDatabase(payload);
      this.resources = [...this.resources, newResource];
      this.updateNetwork(newResource);
      this.statusMessage = 'Database succesfully created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create Database';
    }
    this.isLoading = false;
  };
}
