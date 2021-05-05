import { action, computed, makeObservable, observable } from 'mobx';
import { Api } from '../network/api';
import {
  ConnectResourceRequest,
  CreateClientRequest,
  CreateDatabaseRequest,
  CreateServerRequest,
  DisconnectResourceRequest,
  UpdateClientRequest,
  UpdateDatabaseRequest,
  UpdateServerRequest,
} from '../network/protos';
import { MSG_TYPE, NetworkWS } from '../network/ws';
import { NetworkLink } from '../types/Network';
import { Connection, Ping, Resource, ResourceType } from '../types/Resources';
import { getResourceImg } from '../utils/helper';
export class NetworkState {
  resources: Resource[] = [];

  selectedItem?: Resource;

  hoveredItem?: Resource;

  hoveringItem: boolean = false;

  selectedLink?: Connection;

  hoveredLink?: Connection;

  hoveringLink: boolean = false;

  isLoading: boolean = false;

  hasError: boolean = false;

  statusMessage: string = '';

  networkWS?: NetworkWS;

  pingFeed: Map<number, Ping[]> = new Map();

  constructor() {
    makeObservable(this, {
      resources: observable,
      selectedItem: observable,
      hoveredItem: observable,
      hoveringItem: observable,
      selectedLink: observable,
      hoveredLink: observable,
      hoveringLink: observable,
      isLoading: observable,
      hasError: observable,
      statusMessage: observable,
      networkWS: observable,
      pingFeed: observable,
      links: computed,
      nodes: computed,
      graph: computed,
      connections: computed,
      focusItem: computed,
      focusLink: computed,
      deselectItem: action,
      selectNode: action,
      hoverNode: action,
      unhoverNode: action,
      selectLink: action,
      hoverLink: action,
      unhoverLink: action,
      fetchProjectResources: action,
      createClient: action,
      createDatabase: action,
      createServer: action,
      updateClient: action,
      updateDatabase: action,
      updateServer: action,
      deleteResource: action,
      connectResource: action,
      disconnectResource: action,
      initSimulation: action,
      wsHandler: action,
      pauseSimulation: action,
      playSimulation: action,
      clearNetwork: action,
    });
  }

  get focusItem() {
    return this.hoveringItem ? this.hoveredItem : this.selectedItem;
  }

  get focusLink() {
    return this.hoveringLink ? this.hoveredLink : this.selectedLink;
  }

  get graph() {
    return {
      nodes: this.nodes,
      links: this.links,
      focusedNodeId: this.selectedItem?.id,
    };
  }

  get links() {
    const links: NetworkLink[] = [];
    const seen = new Set<number>();
    this.resources.forEach((r) => {
      r.connections?.forEach((c) => {
        if (!seen.has(c.relationId)) {
          seen.add(c.relationId);
          links.push({
            source: c.src,
            target: c.target,
            latency: c.latency,
            id: c.relationId,
          });
        }
      });
    });
    return links;
  }

  get nodes() {
    return this.resources.map((r) => ({
      id: r.id,
      label: r.label,
      svg: getResourceImg(r.type),
    }));
  }

  get connections() {
    const connections: Connection[] = [];
    const seen = new Set<number>();
    this.resources.forEach((r) => {
      r.connections?.forEach((c) => {
        if (!seen.has(c.relationId)) {
          seen.add(c.relationId);
          connections.push(c);
        }
      });
    });
    return connections;
  }

  clearNetwork = () => {
    this.selectedItem = undefined;
    this.resources = [];
    this.hoveredItem = undefined;
    this.hoveringItem = false;
    this.selectedLink = undefined;
    this.hoveredLink = undefined;
    this.hoveringLink = false;
  };

  deselectItem = () => {
    this.selectedItem = undefined;
  };

  selectNode = (nodeId: string) => {
    this.hoveringItem = false;
    this.selectedItem = this.resources.find((r) => r.id === nodeId);
  };

  hoverNode = (nodeId: string) => {
    this.hoveredItem = this.resources.find((r) => r.id === nodeId);
    this.hoveringItem = true;
  };

  unhoverNode = () => {
    this.hoveringItem = false;
  };

  selectLink = (src: string, target: string) => {
    this.hoveringLink = false;
    this.selectedLink = this.connections.find(
      (c) =>
        (c.src === src && c.target === target) ||
        (c.src === target && c.target === src)
    );
  };

  hoverLink = (src: string, target: string) => {
    this.hoveredLink = this.connections.find(
      (c) =>
        (c.src === src && c.target === target) ||
        (c.src === target && c.target === src)
    );
    this.hoveringLink = true;
  };

  unhoverLink = () => {
    this.hoveringLink = false;
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

  // TODO: focus on created/updated item
  createClient = async (payload: CreateClientRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.createClient(payload);
      this.resources = [...this.resources, newResource];
      this.hasError = false;
      this.statusMessage = 'Client succesfully created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create client';
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
      this.statusMessage = 'Failed to create server';
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
      this.statusMessage = 'Failed to create database';
    }
    this.isLoading = false;
  };

  updateClient = async (payload: UpdateClientRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.updateClient(payload);
      this.resources = [...this.resources, newResource];
      this.hasError = false;
      this.statusMessage = 'Client succesfully updated';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to update client';
    }
    this.isLoading = false;
  };

  updateServer = async (payload: UpdateServerRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.updateServer(payload);
      this.resources = [...this.resources, newResource];
      this.hasError = false;
      this.statusMessage = 'Server succesfully updated';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to update server';
    }
    this.isLoading = false;
  };

  updateDatabase = async (payload: UpdateDatabaseRequest) => {
    this.isLoading = true;
    try {
      const newResource = await Api.updateDatabase(payload);
      this.resources = [...this.resources, newResource];
      this.hasError = false;
      this.statusMessage = 'Database succesfully updated';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to update database';
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
          connections: r.connections?.filter(
            (c) => c.src !== resource.id && c.target !== resource.id
          ),
        }));
      this.hasError = false;
      this.statusMessage = 'Resource succesfully deleted';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to delete resource';
    }
    this.isLoading = false;
  };

  duplicateResource = async (resource: Resource) => {
    this.isLoading = true;
    try {
      const duplicatedResource = await Api.duplicateResource(
        resource.type,
        resource.id
      );
      this.resources = [...this.resources, duplicatedResource];
      // TODO: focus on duplicated item
      this.hasError = false;
      this.statusMessage = 'Resource succesfully duplicated';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to duplicate resource';
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
        if (r.id === payload.src) {
          return { ...r, connections: [...(r.connections || []), payload] };
        } else if (r.id === payload.target) {
          return { ...r, connections: [...(r.connections || []), payload] };
        }
        return r;
      });
      this.hasError = false;
      this.statusMessage = 'Resource succesfully connected';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to connect resource';
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
            connections: r.connections?.filter(
              (c) =>
                c.src !== payload.resourceId && c.target !== payload.serverId
            ),
          };
        }
        return r;
      });
      this.hasError = false;
      this.statusMessage = 'Resource succesfully disconnected';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to disconnected resource';
    }
    this.isLoading = false;
  };

  initSimulation = () => {
    this.networkWS = new NetworkWS(this.wsHandler);
    this.networkWS.activate();
  };

  pauseSimulation = () => {
    this.networkWS?.pauseSimulation();
  };

  playSimulation = () => {
    this.networkWS?.playSimulation();
  };

  resetSimulation = () => {
    this.networkWS?.resetSimulation();
  };

  wsHandler = (m: any) => {
    try {
      const msg = JSON.parse(m.body);
      if (msg.type === MSG_TYPE.PING) {
        const pings = this.pingFeed.get(msg.id);
        const newPing = {
          src: msg.src,
          target: msg.target,
          id: msg.relationId,
          latency: msg.latency,
          msg: msg.msg,
        };
        if (pings) {
          pings.push(newPing);
          this.pingFeed.set(msg.id, pings);
        } else {
          this.pingFeed.set(msg.id, [newPing]);
        }
      }
      this.hasError = false;
    } catch {
      this.hasError = true;
      this.statusMessage = 'Something went wrong with network simulation';
    }
  };
}
