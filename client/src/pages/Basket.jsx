import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import BasketList from '../components/basket/BasketList';
import Loader from '../components/Loader';
import { fetchBasketDevices } from '../http/basketAPI';
import { Context } from '../index';

const Basket = observer((props) => {
   const {user, basket} = useContext(Context);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (user.isAuth) {
         fetchBasketDevices(user.id)
            .then(data => {
               basket.setDevices(data);
               basket.setTotalCount(basket.devices.length)
            })
            .finally(() => setIsLoading(false));
      }
   }, []);

   if (isLoading) {
      return  <Loader />
   }

   return (
      <Container className='mt-3'>
         <Row>
            <div
               className="d-flex align-items-center"
            >
               <h1>Корзина</h1>
               <span
                  style={{fontSize: 24, marginLeft: 'auto'}}
                  className='ml-auto'
               >
                  Кол-во товаров: {basket.count}
               </span>
            </div>
            <BasketList />
         </Row>
      </Container>
   );
})

export default Basket;