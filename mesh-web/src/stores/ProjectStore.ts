import { action, observable } from 'mobx';
import { Api } from '../network/api';
import { GetProjectResponse } from '../network/protos';
import { Project } from '../types/Projects';
import { NetworkState } from './NetworkStore';

export class ProjectState {
  @observable
  projects: GetProjectResponse[] = [];

  @observable
  selectedProject?: GetProjectResponse;

  @observable
  selectedProjectInfo?: Project;

  @observable
  isLoading: boolean = false;

  @observable
  hasError: boolean = false;

  @observable
  statusMessage: string = '';

  @observable
  networkState: NetworkState;

  constructor(networkState: NetworkState) {
    this.networkState = networkState;
  }

  @action
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

  @action
  fetchProjects = async () => {
    this.isLoading = true;
    try {
      this.projects = await Api.getProjects();
      if (this.projects.length > 0) {
        await this.networkState.fetchProjectResources(this.projects[0].id);
      }
      this.statusMessage = 'Projects loaded';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to load projects';
    }
    this.isLoading = false;
  };

  @action
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