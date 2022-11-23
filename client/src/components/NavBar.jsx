import React, { useContext } from 'react';
import { Context } from '../index';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/path';
import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';

const NavBar = observer(() => {
   const { user } = useContext(Context);
   const navigate = useNavigate();

   const exit = () => {
      navigate(LOGIN_ROUTE);
      user.setIsAuth(false);
      user.setUser({});
   }

   return (
      <Navbar bg="dark" variant="dark">
         <Container>
            <NavLink style={{color: 'white'}} to={SHOP_ROUTE} href="#home">КупиДевайс</NavLink>
            {user.isAuth
            ?
            <Nav className="ml-auto">
               <Button 
                  onClick={() => navigate(ADMIN_ROUTE)} 
                  variant={'outline-light'} 
                  style={{marginRight: 10}}
               >
                  Панель администратора
               </Button>
               <Button 
                  variant={'outline-light'}
                  onClick={exit} 
               >
                  Выйти
               </Button>
               <Button 
                  style={{marginLeft: 30}}
                  variant={'outline-light'}
                  onClick={() => navigate(BASKET_ROUTE)} 
               >
                  Корзина
               </Button>
            </Nav>
            :
            <Nav className="ml-auto">
               <Button 
                  onClick={() => navigate(LOGIN_ROUTE)} 
                  variant={'outline-light'}
               >
                  Авторизация
               </Button>
            </Nav>
            }
         </Container>
      </Navbar>
   );
})

export default NavBar;