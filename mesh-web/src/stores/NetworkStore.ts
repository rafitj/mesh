import { action, computed, makeObservable, observable } from 'mobx';
import { Api } from '../network/api';
import {
  ConnectResourceRequest,
  CreateClientRequest,
  CreateDatabaseRequest,
  CreateServerRequest,
  DisconnectResourceRequest,
} from '../network/protos';
import { Resource, ResourceType } from '../types/Resources';
import { getResourceImg } from '../utils/helper';
export class NetworkState {
  resources: Resource[] = [];

  selectedItem?: Resource;

  isLoading: boolean = false;

  hasError: boolean = false;

  statusMessage: string = '';

  constructor() {
    makeObservable(this, {
      resources: observable,
      selectedItem: observable,
      isLoading: observable,
      hasError: observable,
      statusMessage: observable,
      links: computed,
      nodes: computed,
      graph: computed,
      deselectItem: action,
      selectNode: action,
      fetchProjectResources: action,
      createClient: action,
      createDatabase: action,
      createServer: action,
      deleteResource: action,
      connectResource: action,
      disconnectResource: action,
    });
  }

  get graph() {
    return { nodes: this.nodes, links: this.links, focusedNodeId: this.selectedItem?.id};
  }

  get links() {
    return this.resources
      .map((r) => r.connections.map((id) => ({ source: r.id, target: id })))
      .flat();
  }

  get nodes() {
    return this.resources.map((r) => ({
      id: r.id,
      label: r.label,
      svg: getResourceImg(r.type),
    }));
  }

  deselectItem = () => {
    this.selectedItem = undefined;
  };

  selectNode = (nodeId: string) => {
    this.selectedItem = this.resources.find((r) => r.id === nodeId);
  };

  selectLink = (linkId: string) => {
    console.log(linkId);
  };

  fetchProjectResources = async (projectId: string) => {
    this.isLoading = true;
    try {
      this.resources = await Api.getProjectResourcesById(projectId);
      this.hasError = false;
      this.statusMessage = 'Project loaded';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to load project';
    }
    this.isLoading = false;
  };

  createClient = async (payload: CreateClientRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createClient(payload);
      this.resources = [...this.resources, newResource];
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
      this.resources = this.resources
        .filter((r) => r.id !== resource.id)
        .map((r) => ({
          ...r,
          connections: r.connections.filter((c) => c !== resource.id),
        }));
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
      await Api.connectResource(resourceType, payload);
      this.resources = this.resources.map((r) => {
        if (r.id === payload.serverId) {
          return { ...r, connections: [...r.connections, payload.resourceId] };
        } else if (r.id === payload.resourceId) {
          return { ...r, connections: [...r.connections, payload.serverId] };
        }
        return r;
      });
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
      this.resources = this.resources.map((r) => {
        if (r.id === payload.serverId || r.id === payload.resourceId) {
          return {
            ...r,
            connections: r.connections.filter(
              (c) => c !== payload.resourceId && c !== payload.serverId
            ),
          };
        }
        return r;
      });
      this.hasError = false;
      this.statusMessage = 'Resource succesfully disconnected';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to disconnected Resource';
    }
    this.isLoading = false;
  };
}
