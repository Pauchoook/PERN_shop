import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import { fetchDeviceOne } from '../../http/deviceAPI';
import { DEVICE_ROUTE } from '../../utils/path';
import star from '../../assets/star.svg';
import { countDevice, deleteDevice } from '../../http/basketAPI';
import { observer } from 'mobx-react-lite';

const BasketItem = observer(({deviceId, instances}) => {
   const navigate = useNavigate();
   const {user, basket} = useContext(Context);
   const [device, setDevice] = useState({});
   const [count, setCount] = useState(instances);
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      fetchDeviceOne(deviceId).then(data => setDevice(data));
   }, []);
   
   const counterPlus = async (e) => {
      e.stopPropagation();
      await countDevice(user.id, deviceId, count + 1);
      setCount(count + 1);
   }

   const counterMinus = async (e) => {
      e.stopPropagation();
      if (count > 0) {
         await countDevice(user.id, deviceId, count - 1);
         setCount(count - 1);
      }
      if (count === 1) {
         await deleteDevice(user.id, deviceId);
         basket.setTotalCount(basket.count - 1);
         setVisible(false);
      }
   }

   const deleteItem = async (e) => {
      e.stopPropagation();
      await deleteDevice(user.id, deviceId);
      basket.setTotalCount(basket.count - 1);
      setVisible(false);
   }

   if (!visible) {
      return (<></>)
   }

   return (
      <Col 
         md={4} 
         className='mt-3'
         onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}
      >
            <Card style={{cursor: 'pointer', width: 200}} border='light'>
               <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
               <div className="d-flex justify-content-between align-items-center mt-2">
                  <h5 className='text-black-50'>Samsung</h5>
                  <div className="d-flex align-items-center">
                     <span style={{marginRight: 5}}>{device.rating}</span>
                     <Image width={18} height={18} src={star}/>
                  </div>
               </div>
               <span>{device.name}</span>
               <div className="d-flex align-items-center justify-content-between">
                  <span>Количество: {count}</span>
                  <Button 
                     onClick={counterMinus}
                     style={{color: 'black', width: 40}}
                     variant={'outline-light'}
                  >
                     -
                  </Button>
                  <Button 
                     onClick={counterPlus}
                     style={{color: 'black', width: 40}}
                     variant={'outline-light'}
                  >
                     +
                  </Button>
               </div>
               <Button 
                  onClick={deleteItem}
                  style={{color: 'black', width: 200}}
                  variant={'outline-light'}
               >
                  Удалить
               </Button>
            </Card>
      </Col>
   );
})

export default BasketItem;