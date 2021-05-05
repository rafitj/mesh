import { Project } from '../types/Projects';
import {
  Client,
  Connection,
  Database,
  Resource,
  ResourceType,
  Server,
} from '../types/Resources';

export interface GetProjectResponse {
  id: string;
  name: string;
  slug: string;
}

export interface GetProjectInfoResponse extends Project {}

export interface PatchProjectRequest {
  id: string;
  name?: string;
  budget?: number;
  public?: boolean;
}

export interface CreateProjectResponse extends GetProjectInfoResponse {}

export interface CreateProjectRequest {
  name: string;
  budget: number;
  userId: string;
}

export type GetProjectResourcesResponse = Resource[];

export interface CreateResourceRequest {
  label: string;
  description: string;
  projectId: string;
  type: ResourceType;
}

export interface CreateClientRequest extends CreateResourceRequest {
  throughput: number;
  clickRate: number;
}

export interface CreateServerRequest extends CreateResourceRequest {
  instanceType: string;
}

export interface CreateDatabaseRequest extends CreateResourceRequest {
  dbType: string;
  dbResources: string[];
}

export interface UpdateClientRequest extends Client {}
export interface UpdateDatabaseRequest extends Database {}
export interface UpdateServerRequest extends Server {}

export interface CreateClientResponse extends Client {}
export interface CreateServerResponse extends Server {}
export interface CreateDatabaseResponse extends Database {}
export interface UpdateClientResponse extends Client {}
export interface UpdateServerResponse extends Server {}
export interface UpdateDatabaseResponse extends Database {}

export type DuplicateResourceResponse = Client | Server | Database;

export type UpdateResourceRequest = Client | Server | Database;

export interface ConnectResourceRequest extends Connection {}
export interface DisconnectResourceRequest {
  serverId: string;
  resourceId: string;
}
export interface ConnectResourceResponse {
  target: string;
  src: string;
}

export interface UserRequest {
  username: string;
  pin: string;
}
