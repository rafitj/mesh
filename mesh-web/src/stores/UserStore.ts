import { action, makeObservable, observable } from 'mobx';
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

  authToken?: string;

  projectState: ProjectState;

  returningUsername?: string;

  constructor(projectState: ProjectState) {
    makeObservable(this, {
      isAuthorized: observable,
      isLoading: observable,
      hasError: observable,
      statusMessage: observable,
      user: observable,
      projectState: observable,
      authToken: observable,
      returningUsername: observable,
      loginUser: action,
      checkUsernameAvailability: action,
      signupUser: action,
      logoutUser: action,
      fetchUser: action,
      checkUserSession: action,
      fetchUserAndProjects: action,
    });
    this.projectState = projectState;
    this.checkUserSession();
  }

  checkUserSession = async () => {
    this.isLoading = true;
    try {
      const token = localStorage.getItem('auth');
      if (token != null) {
        if (await Api.verifyToken(token.split(' ')[1])) {
          this.returningUsername = token.split(' ')[0];
          this.authToken = token.split(' ')[1];
          this.isAuthorized = true;
          await this.fetchUserAndProjects(this.returningUsername);
        } else {
          localStorage.clear();
        }
      } else {
        localStorage.clear();
      }
      this.hasError = false;
      this.statusMessage = 'Verified token';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to verify token';
    }
    this.isLoading = false;
  };

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
    }
    return isAvailable;
  };

  fetchUserAndProjects = async (username: string) => {
    this.isLoading = true;
    try {
      const data = await Api.getUser(username);
      this.user = data;
      await this.projectState.fetchProjectsByUserId(this.user.id);
      this.hasError = false;
      this.statusMessage = 'User logged-in';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to login user';
    }
    this.isLoading = false;
  };

  fetchUser = async (username: string) => {
    this.isLoading = true;
    try {
      const data = await Api.getUser(username);
      this.user = data;
      this.hasError = false;
      this.statusMessage = 'User data fetched';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to fetch user';
    }
    this.isLoading = false;
  };

  loginUser = async (payload: UserRequest) => {
    this.isLoading = true;
    try {
      const data = await Api.loginUser(payload);
      this.authToken = data.split(' ')[1];
      localStorage.setItem('auth', data);
      await this.fetchUser(payload.username);
      this.isAuthorized = true;
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
      await Api.signupUser(payload);
      await this.loginUser(payload);
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
