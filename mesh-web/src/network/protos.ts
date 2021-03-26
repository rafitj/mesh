import { Project } from '../types/Projects';
import { Client, Database, Resource, Server } from '../types/Resources';

export interface GetProjectResponse {
  id: string;
  name: string;
}

export interface GetProjectInfoResponse extends Project {}

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
export interface CreateDatabasetResponse extends Database {}
