import axios, { Method } from 'axios';
import { ResourceType } from '../types/Resources';
import { User } from '../types/User';
import {
  ConnectResourceRequest,
  ConnectResourceResponse,
  CreateClientRequest,
  CreateClientResponse,
  CreateDatabaseRequest,
  CreateDatabaseResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  CreateServerRequest,
  CreateServerResponse,
  DisconnectResourceRequest,
  DuplicateResourceResponse,
  GetProjectInfoResponse,
  GetProjectResourcesResponse,
  GetProjectResponse,
  PatchProjectRequest,
  UpdateClientRequest,
  UpdateClientResponse,
  UpdateDatabaseRequest,
  UpdateDatabaseResponse,
  UpdateServerRequest,
  UpdateServerResponse,
  UserRequest,
} from './protos';

export const baseUrl = 'http://localhost:8090/';

export class Api {
  static createRequest = <T, S>(
    endpoint: string,
    requestType: Method,
    payload?: T
  ): Promise<S> =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.request({
          url: `${baseUrl}${endpoint}`,
          method: requestType,
          headers: {
            'Content-Type': 'application/json',
          },
          data: payload || {},
        });
        resolve(response.data as S);
      } catch (e) {
        reject(e);
      }
    });

  static getProjects = async () => {
    const data = await Api.createRequest<null, GetProjectResponse[]>(
      'project/all',
      'GET'
    );
    return data;
  };

  static getProjectInfoById = async (id: string) => {
    const data = await Api.createRequest<null, GetProjectInfoResponse>(
      `project/${id}`,
      'GET'
    );
    return data;
  };

  static getProjectResourcesById = async (id: string) => {
    const data = await Api.createRequest<null, GetProjectResourcesResponse>(
      `project/${id}/resources`,
      'GET'
    );
    return data;
  };

  static updateProject = async (payload: PatchProjectRequest) => {
    const data = await Api.createRequest<
      PatchProjectRequest,
      GetProjectInfoResponse
    >(`project/${payload.id}`, 'PATCH', payload);
    return data;
  };

  static deleteProject = async (id: string) => {
    const data = await Api.createRequest<null, null>(`project/${id}`, 'DELETE');
    return data;
  };

  static createProject = async (payload: CreateProjectRequest) => {
    const data = await Api.createRequest<
      CreateProjectRequest,
      CreateProjectResponse
    >(`project`, 'POST', payload);
    return data;
  };

  static createServer = async (payload: CreateServerRequest) => {
    const data = await Api.createRequest<
      CreateServerRequest,
      CreateServerResponse
    >('server', 'POST', payload);
    return data;
  };

  static createClient = async (payload: CreateClientRequest) => {
    const data = await Api.createRequest<
      CreateClientRequest,
      CreateClientResponse
    >('client', 'POST', payload);
    return data;
  };

  static createDatabase = async (payload: CreateDatabaseRequest) => {
    const data = await Api.createRequest<
      CreateDatabaseRequest,
      CreateDatabaseResponse
    >('database', 'POST', payload);
    return data;
  };

  static updateServer = async (payload: UpdateServerRequest) => {
    const data = await Api.createRequest<
      UpdateServerRequest,
      UpdateServerResponse
    >(`server/${payload.id}`, 'PATCH', payload);
    return data;
  };

  static updateClient = async (payload: UpdateClientRequest) => {
    const data = await Api.createRequest<
      UpdateClientRequest,
      UpdateClientResponse
    >(`client/${payload.id}`, 'PATCH', payload);
    return data;
  };

  static updateDatabase = async (payload: UpdateDatabaseRequest) => {
    const data = await Api.createRequest<
      UpdateDatabaseRequest,
      UpdateDatabaseResponse
    >(`database/${payload.id}`, 'PATCH', payload);
    return data;
  };

  static deleteResource = async (resourceType: ResourceType, id: string) => {
    const data = await Api.createRequest<null, null>(
      `${resourceType.toLowerCase()}/${id}`,
      'DELETE'
    );
    return data;
  };

  static duplicateResource = async (resourceType: ResourceType, id: string) => {
    const data = await Api.createRequest<null, DuplicateResourceResponse>(
      `${resourceType.toLowerCase()}/${id}/duplicate`,
      'POST'
    );
    return data;
  };

  static connectResource = async (
    resourceType: ResourceType,
    payload: ConnectResourceRequest
  ) => {
    const data = await Api.createRequest<
      ConnectResourceRequest,
      ConnectResourceResponse
    >(`${resourceType.toLowerCase()}/connect`, 'POST', payload);
    return data;
  };

  static disconnectResource = async (payload: DisconnectResourceRequest) => {
    const data = await Api.createRequest<DisconnectResourceRequest, null>(
      `resource/disconnect`,
      'DELETE',
      payload
    );
    return data;
  };

  static checkUsernameAvailability = async (username: string) => {
    const data = await Api.createRequest<string, boolean>(
      `user/check`,
      'GET',
      username
    );
    return data;
  };

  static loginUser = async (payload: UserRequest) => {
    const data = await Api.createRequest<UserRequest, User>(
      `user/login`,
      'POST',
      payload
    );
    return data;
  };

  static signupUser = async (payload: UserRequest) => {
    const data = await Api.createRequest<UserRequest, User>(
      `user/signup`,
      'POST',
      payload
    );
    return data;
  };
}
