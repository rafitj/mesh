import { action, computed, observable } from 'mobx';
import { Api } from '../network/api';
import {
  CreateClientRequest,
  CreateDatabaseRequest,
  CreateServerRequest,
} from '../network/protos';
import { NetworkLink, NetworkNode } from '../types/Network';
import { Resource } from '../types/Resources';
import ClientIcon from '../ui/assets/ClientIcon.svg';
import DatabaseIcon from '../ui/assets/DatabaseIcon.svg';
import ServerIcon from '../ui/assets/ServerIcon.svg';

export class NetworkState {
  @observable
  resources: Resource[] = [];

  @observable
  links: NetworkLink[] = [];

  @observable
  nodes: NetworkNode[] = [];

  @observable
  selectedItem?: Resource;

  @observable
  isLoading: boolean = false;

  @observable
  hasError: boolean = false;

  @observable
  statusMessage: string = '';

  @computed
  get graph() {
    return { nodes: this.nodes, links: this.links };
  }

  @action
  deselectItem = () => {
    this.selectedItem = undefined;
  };

  @action
  selectResource = (itemId: string) => {
    this.selectedItem = this.resources.find((r) => r.id === itemId);
  };

  @action
  fetchProjectResources = async (projectId: string) => {
    this.isLoading = true;
    try {
      this.resources = await Api.getProjectResourcesById(projectId);
      this.createNetwork();
      this.statusMessage = 'Project loaded';
      console.log(this.statusMessage)
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
      const nodes: NetworkNode[] = [];
      const links: NetworkLink[] = [];
      this.resources.forEach((r) => {
        const icon =
          r.type === 'CLIENT'
            ? ClientIcon
            : r.type === 'SERVER'
            ? ServerIcon
            : DatabaseIcon;
        nodes.push({ id: r.id, label: r.label, svg: icon });
        r.connections.forEach((connectionId) => {
          links.push({ source: r.id, target: connectionId });
        });
      });
      this.nodes = nodes;
      this.links = links;
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
