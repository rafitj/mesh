import axios, { Method } from 'axios';
import {
  CreateClientRequest,
  CreateClientResponse,
  CreateDatabaseRequest,
  CreateDatabasetResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  CreateServerRequest,
  CreateServerResponse,
  GetProjectInfoResponse,
  GetProjectResourcesResponse,
  GetProjectResponse,
} from './protos';

export const baseUrl = 'http://localhost:8080/';

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
        const {
          response: { data },
        } = e;
        reject(data);
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
      CreateDatabasetResponse
    >('database', 'POST', payload);
    return data;
  };
}
