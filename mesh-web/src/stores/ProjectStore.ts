import { action, computed, makeObservable, observable } from 'mobx';
import { Api } from '../network/api';
import {
  CreateProjectRequest,
  GetProjectResponse,
  PatchProjectRequest,
} from '../network/protos';
import { Project } from '../types/Projects';
import { NetworkState } from './NetworkStore';

export class ProjectState {
  projects: GetProjectResponse[] = [];

  selectedProject?: GetProjectResponse;

  selectedProjectInfo?: Project;

  isLoading: boolean = false;

  hasError: boolean = false;

  statusMessage: string = '';

  networkState: NetworkState;

  constructor(networkState: NetworkState) {
    makeObservable(this, {
      projects: observable,
      selectedProjectInfo: observable,
      isLoading: observable,
      hasError: observable,
      statusMessage: observable,
      networkState: observable,
      selectedProject: observable,
      numClients: computed,
      numDatabases: computed,
      numServers: computed,
      numResources: computed,
      resourceCost: computed,
      fetchProjectInfo: action,
      selectProject: action,
      fetchProjects: action,
      createProject: action,
      updateProject: action,
      deleteProject: action,
    });
    this.networkState = networkState;
  }

  get resourceCost() {
    return this.networkState.resources
      .map((r) => r.cost)
      .reduce((a, b) => a + b, 0);
  }

  get numResources() {
    return this.networkState.resources.length;
  }

  get numServers() {
    return this.networkState.resources.filter((r) => r.type === 'SERVER')
      .length;
  }

  get numClients() {
    return this.networkState.resources.filter((r) => r.type === 'CLIENT')
      .length;
  }

  get numDatabases() {
    return this.networkState.resources.filter((r) => r.type === 'DATABASE')
      .length;
  }

  createProject = async (project: CreateProjectRequest) => {
    this.isLoading = true;
    try {
      const newProject = await Api.createProject(project);
      this.projects = [...this.projects, newProject];
      this.selectProject(newProject);
      this.hasError = false;
      this.statusMessage = 'New project created';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to create project';
    }
    this.isLoading = false;
  };

  selectProject = async (project: GetProjectResponse) => {
    this.isLoading = true;
    try {
      this.selectedProject = project;
      await this.fetchProjectInfo(project.id);
      await this.networkState.fetchProjectResources(project.id);
      this.hasError = false;
      this.statusMessage = 'New project selected';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to select project';
    }
    this.isLoading = false;
  };

  fetchProjects = async () => {
    this.isLoading = true;
    try {
      this.projects = await Api.getProjects();
      if (this.projects.length > 0) {
        await this.selectProject(this.projects[0]);
      }
      this.hasError = false;
      this.statusMessage = 'Projects loaded';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to load projects';
    }
    this.isLoading = false;
  };

  fetchProjectInfo = async (projectId: string) => {
    this.isLoading = true;
    try {
      this.selectedProjectInfo = await Api.getProjectInfoById(projectId);
      this.hasError = false;
      this.statusMessage = 'Project info loaded';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to load project info';
    }
    this.isLoading = false;
  };

  updateProject = async (updatedProject: PatchProjectRequest) => {
    this.isLoading = true;
    try {
      this.selectedProjectInfo = await Api.updateProject(updatedProject);
      this.hasError = false;
      this.statusMessage = 'Project updated';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to update project info';
    }
    this.isLoading = false;
  };

  deleteProject = async (id: string) => {
    this.isLoading = true;
    try {
      await Api.deleteProject(id);
      this.projects.filter((p) => p.id !== id);
      this.hasError = false;
      this.statusMessage = 'Project deleted';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to delete project';
    }
    this.isLoading = false;
  };
}
