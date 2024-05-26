import { makeAutoObservable } from "mobx";

class PopupCrop {
  _isOpen = false;
  _isError = "";
  _srcImg = "";
  _srcAvatar = process.env.PUBLIC_URL + "images/NoFaceAva.jpg";

  constructor() {
    makeAutoObservable(this);
  }
  setIsOpen(isOpen) {
    this._isOpen = isOpen;
  }
  get isOpen() {
    return this._isOpen;
  }
  setIsError(isError) {
    this._isError = isError;
  }
  get isError() {
    return this._isError;
  }
  setSrcImg(srcImg) {
    this._srcImg = srcImg;
  }
  get srcImg() {
    return this._srcImg;
  }
  setSrcAvatar(srcAvatar) {
    this._srcAvatar = srcAvatar;
  }
  get srcAvatar() {
    return this._srcAvatar;
  }
}

export default PopupCrop;
