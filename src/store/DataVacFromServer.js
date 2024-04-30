import { makeAutoObservable } from "mobx";

class DataVacFromServer {
  _isLoadFromServer = false;
  _listVacancies = [];

  constructor() {
    makeAutoObservable(this);
  }
  setListVacancies(listVacancies) {
    this._listVacancies = listVacancies;
  }
  get listVacancies() {
    return this._listVacancies;
  }
  async getFromFirebase() {
    const responce = await getVacanciesList();
    const sortedVacancies = responce.sort((a, b) => {
      return b.date.seconds - a.date.seconds;
    });
    this.setListVacancies(sortedVacancies);
  }
  setIsLoadFromServer(isLoadFromServer) {
    this._isLoadFromServer = isLoadFromServer;
  }
  get isLoadFromServer() {
    return this._isLoadFromServer;
  }
}

export default DataVacFromServer;
