// функция регистрации, авторизации и проверка токена на валидность
import { $host, $authHost } from "./index";
import {REGISTRATION_ROUTE, LOGIN_ROUTE, AUTH_ROUTE} from '../utils/path';
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
   const {data} = await $host.post(`api/user${REGISTRATION_ROUTE}`, {email, password, role: 'ADMIN'});
   localStorage.setItem('token', data.token);
   return jwt_decode(data.token);
}

export const login = async (email, password) => {
   const {data} = await $host.post(`api/user${LOGIN_ROUTE}`, {email, password, role: 'ADMIN'});
   localStorage.setItem('token', data.token);
   return jwt_decode(data.token);
}

export const check = async () => {
   const {data} = await $authHost.get(`api/user${AUTH_ROUTE}`);
   localStorage.setItem('token', data.token);
   return jwt_decode(data.token);
}