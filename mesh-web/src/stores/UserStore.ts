import { action, computed, makeObservable, observable } from 'mobx';
import { Api } from '../network/api';
import { UserRequest } from '../network/protos';
import { User } from '../types/User';
import { ProjectState } from './ProjectStore';

export class UserState {
  isAuthorized: boolean = false;

  isLoading: boolean = false;

  hasError: boolean = false;

  statusMessage: string = '';

  user?: User;

  projectState: ProjectState;

  constructor(projectState: ProjectState) {
    makeObservable(this, {
      isAuthorized: observable,
      isLoading: observable,
      hasError: observable,
      statusMessage: observable,
      user: observable,
      projectState: observable,
      loginUser: action,
      checkUsernameAvailability: action,
      signupUser: action,
      logoutUser: action,
      returningUser: computed,
    });
    this.projectState = projectState;
    const user = this.returningUser;
    if (user !== null) {
      this.isAuthorized = true;
      this.user = user;
    }
  }

  get returningUser() {
    const user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }

  checkUsernameAvailability = async (username: string) => {
    this.isLoading = true;
    let isAvailable = false;
    try {
      isAvailable = await Api.checkUsernameAvailability(username);
      this.hasError = false;
      this.statusMessage = 'Username checked';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to check username availability';
    } finally {
      this.isLoading = false;
      return isAvailable;
    }
  };

  loginUser = async (payload: UserRequest) => {
    this.isLoading = true;
    try {
      const data = await Api.loginUser(payload);
      this.user = data;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.isAuthorized = true;
      // Project stuff
      this.hasError = false;
      this.statusMessage = 'User logged-in';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to login user';
    }
    this.isLoading = false;
  };

  signupUser = async (payload: UserRequest) => {
    this.isLoading = true;
    try {
      this.user = await Api.signupUser(payload);
      this.isAuthorized = true;
      // Project stuff
      this.hasError = false;
      this.statusMessage = 'User registered';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to register new user';
    }
    this.isLoading = false;
  };

  logoutUser = async () => {
    this.isLoading = true;
    try {
      this.user = undefined;
      localStorage.clear();
      this.projectState.clearProjects();
      // Project stuff
      this.isAuthorized = false;
      this.hasError = false;
      this.statusMessage = 'User logged out';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to logout user';
    }
    this.isLoading = false;
  };
}
