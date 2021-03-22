export type Resource = Server | Client | Database;

export type ResourceType = "SERVER" | "CLIENT" | "DATABASE";

interface BaseResource {
    id: string,
    label: string,
    resources: Array<string>,
    alive: Boolean,
    type: ResourceType
}

export interface Server extends BaseResource {
    instanceType: string,
};

export interface Database extends BaseResource {
    dbType: string,
    dbResources: Array<string>
};

export interface Client extends BaseResource {
    throughput: Number,
    clickrate: Number
};

