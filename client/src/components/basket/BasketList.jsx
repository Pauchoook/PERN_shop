import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../../index';
import BasketItem from './BasketItem';

const BasketList = observer(() => {
   const {basket} = useContext(Context);

   return (
      <Row className='d-flex'>
         {basket.devices.map(device =>
            <BasketItem key={device.id} deviceId={device.deviceId} instances={device.count} /> 
         )}
      </Row>
   );
})

export default BasketList;