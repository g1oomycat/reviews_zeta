import { makeAutoObservable } from "mobx";

class PlaceList {
  _placesData = [];

  constructor() {
    makeAutoObservable(this);
  }
  setPlacesData(placesData) {
    this._placesData = placesData;
  }
  get placesData() {
    return this._placesData;
  }
}

export default PlaceList;
