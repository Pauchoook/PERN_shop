import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.svg';
import { DEVICE_ROUTE } from '../utils/path';

function DeviceItem({device}) {
   const navigate = useNavigate();
   
   return (
     <Col 
      md={3} 
      className='mt-3'
      onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}
     >
         <Card style={{cursor: 'pointer', width: 150}} border='light'>
         <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
         <div className="d-flex justify-content-between align-items-center mt-2">
            <h5 className='text-black-50'>Samsung</h5>
            <div className="d-flex align-items-center">
               <span style={{marginRight: 5}}>{device.rating}</span>
               <Image width={18} height={18} src={star} />
            </div>
         </div>
         <span>{device.name}</span>
         </Card>
     </Col>
   );
}

export default DeviceItem;