import { action, computed, makeObservable, observable } from 'mobx';
import { Api } from '../network/api';
import {
  ConnectResourceRequest,
  CreateClientRequest,
  CreateDatabaseRequest,
  CreateServerRequest,
  DisconnectResourceRequest,
} from '../network/protos';
import { NetworkLink, NetworkNode } from '../types/Network';
import { Resource, ResourceType } from '../types/Resources';
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
      addToNetwork: action,
      removeFromNetwork: action,
      createClient: action,
      createDatabase: action,
      createServer: action,
      deleteResource: action,
      connectResource: action,
      disconnectResource: action,
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
      this.hasError = false;
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
      this.hasError = false;
      this.statusMessage = 'Network created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create network';
    }
    this.isLoading = false;
  };

  addToNetwork = (r: Resource) => {
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

  removeFromNetwork = (r: Resource) => {
    this.nodes = this.nodes.filter((node) => node.id !== r.id);
    this.links = this.links.filter(
      (link) => link.source !== r.id && link.target !== r.id
    );
  };

  createClient = async (payload: CreateClientRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createClient(payload);
      this.resources = [...this.resources, newResource];
      this.addToNetwork(newResource);
      this.hasError = false;
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
      this.addToNetwork(newResource);
      this.hasError = false;
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
      this.addToNetwork(newResource);
      this.hasError = false;
      this.statusMessage = 'Database succesfully created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create Database';
    }
    this.isLoading = false;
  };

  deleteResource = async (resource: Resource) => {
    this.isLoading = true;
    try {
      await Api.deleteResource(resource.type, resource.id);
      if (this.selectedItem?.id === resource.id) {
        this.deselectItem();
      }
      this.resources = this.resources.filter((r) => r.id !== resource.id);
      this.removeFromNetwork(resource);
      this.hasError = false;
      this.statusMessage = 'Resource succesfully deleted';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to delete Resource';
    }
    this.isLoading = false;
  };

  connectResource = async (
    resourceType: ResourceType,
    payload: ConnectResourceRequest
  ) => {
    this.isLoading = true;
    try {
      const newLink = await Api.connectResource(resourceType, payload);
      const resourceIndx = this.resources.findIndex(
        (r) => r.id === payload.resourceId
      );
      const serverIndx = this.resources.findIndex(
        (r) => r.id === payload.serverId
      );
      this.resources[resourceIndx] = {
        ...this.resources[resourceIndx],
        connections: [
          ...this.resources[resourceIndx].connections,
          payload.serverId,
        ],
      };
      this.resources[serverIndx] = {
        ...this.resources[serverIndx],
        connections: [
          ...this.resources[serverIndx].connections,
          payload.resourceId,
        ],
      };
      this.links = [...this.links, newLink];
      this.hasError = false;
      this.statusMessage = 'Resource succesfully connected';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to connect Resource';
    }
    this.isLoading = false;
  };

  disconnectResource = async (payload: DisconnectResourceRequest) => {
    this.isLoading = true;
    try {
      await Api.disconnectResource(payload);
      const resourceIndx = this.resources.findIndex(
        (r) => r.id === payload.resourceId
      );
      const serverIndx = this.resources.findIndex(
        (r) => r.id === payload.serverId
      );
      this.resources[resourceIndx] = {
        ...this.resources[resourceIndx],
        connections: this.resources[resourceIndx].connections.filter(
          (id) => id === payload.serverId
        ),
      };
      this.resources[serverIndx] = {
        ...this.resources[serverIndx],
        connections: this.resources[resourceIndx].connections.filter(
          (id) => id === payload.resourceId
        ),
      };
      this.links = this.links.filter(
        (link) =>
          !(
            (link.source === payload.resourceId &&
              link.target === payload.serverId) ||
            (link.source === payload.serverId &&
              link.target === payload.resourceId)
          )
      );
      this.hasError = false;
      this.statusMessage = 'Resource succesfully disconnected';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to disconnected Resource';
    }
    this.isLoading = false;
  };
}
