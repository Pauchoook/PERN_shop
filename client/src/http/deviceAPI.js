// функция регистрации, авторизации и проверка токена на валидность
import { $authHost, $host } from "./index";
import {BRAND_ROUTE, DEVICE_ROUTE, TYPE_ROUTE} from '../utils/path';

export const createType = async (type) => {
   const {data} = await $authHost.post(`api${TYPE_ROUTE}`, type);
   return data;
}

export const fetchTypes = async () => {
   const {data} = await $authHost.get(`api${TYPE_ROUTE}`);
   return data;
}

export const deleteType = async (name) => {
   const {data} = await $authHost.delete(`api${TYPE_ROUTE}/delete`, {params: {name}});
   return data;
}

export const createBrand = async (brand) => {
   const {data} = await $authHost.post(`api${BRAND_ROUTE}`, brand);
   return data;
}

export const fetchBrands = async () => {
   const {data} = await $authHost.get(`api${BRAND_ROUTE}`);
   return data;
}

export const deleteBrand = async (name) => {
   const {data} = await $authHost.delete(`api${BRAND_ROUTE}/delete`, {params: {name}});
   return data;
}

export const createDevice = async (device) => {
   const {data} = await $authHost.post(`api${DEVICE_ROUTE}`, device);
   return data;
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
   const {data} = await $host.get(`api${DEVICE_ROUTE}`, {params:
      {typeId, brandId, page, limit}
   });
   return data;
}

export const fetchDeviceOne = async (id) => {
   const {data} = await $host.get(`api${DEVICE_ROUTE}/${id}`);
   return data;
}

export const deleteDevice = async (id) => {
   const {data} = await $authHost.delete(`api${DEVICE_ROUTE}/${id}`);
   return data;
}

export const updateRating = async (id, rate) => {
   const {data} = await $authHost.put(`api${DEVICE_ROUTE}/rating`, {id, rate});
   return data;
}