export type Resource = Server | Client | Database;

export type ResourceType = 'SERVER' | 'CLIENT' | 'DATABASE';

interface BaseResource {
  id: string;
  label: string;
  connections?: Connection[];
  alive: boolean;
  type: ResourceType;
  cost: number;
  description: string;
}

export interface Server extends BaseResource {
  instanceType: string;
}

export interface Database extends BaseResource {
  dbType: string;
  dbResources: string[];
}

export interface Client extends BaseResource {
  throughput: number;
  clickrate: number;
}

export interface Connection {
  src: string;
  target: string;
  latency: number;
  frequency: number;
  relationId: number;
}

export interface Ping {
  src: string;
  target: string;
  latency: number;
  id: number;
  msg: string;
}
