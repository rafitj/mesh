import { action, makeObservable, observable } from 'mobx';
import { Api } from '../network/api';
import { CreateProjectRequest, GetProjectResponse } from '../network/protos';
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
      fetchProjectInfo: action,
      selectProject: action,
      fetchProjects: action,
      createProject: action,
    });
    this.networkState = networkState;
  }

  createProject = async (project: CreateProjectRequest) => {
    this.isLoading = true;
    try {
      const newProject = await Api.createProject(project);
      this.projects = [...this.projects, newProject];
      this.selectProject(newProject);
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
      this.statusMessage = 'Project info loaded';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to load project info';
    }
    this.isLoading = false;
  };
}
