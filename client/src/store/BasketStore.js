import {makeAutoObservable} from 'mobx';

export default class BasketStore {
   constructor() {
      this._basket = {};
      this._devices = [];
      this._totalCount = 0;

      makeAutoObservable(this); // mobx следит за изменениями класса
   }

   setBasket(basket) {
      this._basket = basket;
   }

   setDevices(devices) {
      this._devices = devices;
   }

   setTotalCount(count) {
      this._totalCount = count;
   }

   get devices() {
      return this._devices;
   }

   get count() {
      return this._totalCount;
   }
}