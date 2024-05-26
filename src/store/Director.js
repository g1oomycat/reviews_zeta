import { makeAutoObservable } from "mobx";

class Director {
  _director = {};
  _isAuthenticated = false;
  _isAuthReady = false;

  constructor() {
    makeAutoObservable(this);
  }
  setDirector(director) {
    this._director = director;
  }
  get director() {
    return this._director;
  }
  setIsAuthenticated(isAuthenticated) {
    this._isAuthenticated = isAuthenticated;
  }
  get isAuthenticated() {
    return this._isAuthenticated;
  }
  setIsAuthReady(isAuthReady) {
    this._isAuthReady = isAuthReady;
  }
  get isAuthReady() {
    return this._isAuthReady;
  }
}

export default Director;
