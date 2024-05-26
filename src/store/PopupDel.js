import { makeAutoObservable } from 'mobx';

class PopupDel {
	_isOpen = false;
	_handleDelete = null;
	_message = '';

	constructor() {
		makeAutoObservable(this);
	}
	setIsOpen(isOpen) {
		this._isOpen = isOpen;
	}
	get isOpen() {
		return this._isOpen;
	}
	setHandleDelete(handleDelete) {
		this._handleDelete = handleDelete;
	}
	get handleDelete() {
		return this._handleDelete;
	}
	setMessage(message) {
		this._message = message;
	}
	get message() {
		return this._message;
	}
}

export default PopupDel;
