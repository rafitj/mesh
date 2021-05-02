import { Project } from '../types/Projects';
import {
  Client,
  Connection,
  Database,
  Resource,
  Server,
} from '../types/Resources';

export interface GetProjectResponse {
  id: string;
  name: string;
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
}

export type GetProjectResourcesResponse = Resource[];

export interface CreateResourceRequest {
  label: string;
  description: string;
  projectId: string;
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
}

export interface CreateClientResponse extends Client {}
export interface CreateServerResponse extends Server {}
export interface CreateDatabaseResponse extends Database {}

export interface ConnectResourceRequest extends Connection {}
export interface DisconnectResourceRequest {
  serverId: string;
  resourceId: string;
}
export interface ConnectResourceResponse {
  target: string;
  src: string;
}
