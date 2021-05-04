import { action, makeObservable, observable } from 'mobx';
import { Api } from '../network/api';
import { UserRequest } from '../network/protos';
import { User } from '../types/User';

export class UserState {
  isAuthorized: boolean = false;

  isLoading: boolean = false;

  hasError: boolean = false;

  statusMessage: string = '';

  user?: User;

  constructor() {
    makeObservable(this, {
      isAuthorized: observable,
      isLoading: observable,
      hasError: observable,
      statusMessage: observable,
      user: observable,
      loginUser: action,
      checkUsernameAvailability: action,
      signupUser: action,
    });
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
      // Project stuff
      this.hasError = false;
      this.statusMessage = 'User registered';
    } catch (e) {
      this.hasError = true;
      this.statusMessage = 'Failed to register new user';
    }
    this.isLoading = false;
  };
}
