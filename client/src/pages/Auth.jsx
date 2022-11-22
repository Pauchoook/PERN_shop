import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form} from 'react-bootstrap';
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../utils/path';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';

const Auth = observer((props) => {
   const {user} = useContext(Context);
   const location = useLocation();
   const isLogin = location.pathname === LOGIN_ROUTE;
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   
   const signIn = async () => {
      try {
         let data;
         if (isLogin) {
            data = await login(email, password);
         } else {
            data = await registration(email, password);
         }
   
         user.setUser(user);
         user.setIsAuth(true);

         navigate(SHOP_ROUTE);
      } catch(e) {
         alert(e.response.data.message);
      }
   }

   return (
      <Container 
         className='d-flex justify-content-center align-items-center'
         style={{height: window.innerHeight - 54}}   
      >
         <Card style={{width:600}} className='p-5'>
            <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
            <Form className='d-flex flex-column'>
               <Form.Control 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='mt-3'
                  placeholder='Введите email...'
               />
               <Form.Control 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='mt-3'
                  placeholder='Введите пароль...'
                  type='password'
               />
               <Button
                  onClick={signIn}
                  className='mt-3'
                  variant={'outline-success'}
               >
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
               </Button>
               {isLogin
               ?
                  <div className='mt-3'>
                     Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                  </div>
               :
               <div className='mt-3'>
                  Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизуйтесь</NavLink>
               </div>
               }
            </Form>
         </Card>
      </Container>
   );
})

export default Auth;