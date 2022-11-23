import { $authHost, $host } from "./index";
import {BASKET_ROUTE} from '../utils/path';

export const addDeviceBasket = async (basketId, deviceId) => {
   try {
      const {data} = await $authHost.post(`api${BASKET_ROUTE}/add`, {basketId, deviceId});
      return data;
   } catch(e) {
      console.log(e);
   }
}

export const fetchBasketDevices = async (basketId) => {
   try {
      const {data} = await $authHost.get(`api${BASKET_ROUTE}/devices`, {params: {basketId}});
      return data;
   } catch (e) {
      console.log(e);
   }
}

export const countDevice = async (basketId, deviceId, count) => {
   try {
      const {data} = await $authHost.put(`api${BASKET_ROUTE}/update`, {basketId, deviceId, count});
      return data;
   } catch (e) {
      console.log(e);
   }
}

export const deleteDevice = async (basketId, deviceId) => {
   try {
      const {data} = await $authHost.delete(`api${BASKET_ROUTE}/delete`, {params: {basketId, deviceId}});
      return data;
   } catch (e) {
      console.log(e);
   }
}
