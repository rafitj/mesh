export type Resource = Server | Client | Database;

export type ResourceType = 'SERVER' | 'CLIENT' | 'DATABASE';

interface BaseResource {
  id: string;
  label: string;
  connections: string[];
  alive: boolean;
  type: ResourceType;
  cost: number;
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
