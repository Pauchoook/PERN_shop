import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import bigStar from '../assets/bigStar.svg';
import { fetchDeviceOne } from '../http/deviceAPI';

function DevicePage(props) {
   const [device, setDevice] = useState({info: []})
   const {id} = useParams();

   useEffect(() => {
      fetchDeviceOne(id).then(data => setDevice(data));
   }, []);

   return (
      <Container className='mt-3'>
         <Row>
            <Col md={4}>
               <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
            </Col>
            <Col md={4}>
               <Row className='d-flex flex-column align-items-center'>
                  <h2 style={{textAlign: 'center'}}>{device.name}</h2>
                  <div 
                     className="d-flex align-items-center justify-content-center"
                     style={{background: `url(${bigStar}) 0 0 / 100% 100% no-repeat`, width: 240, height: 240}}
                  >
                     <span style={{fontSize: 64, color: 'white'}}>{device.rating}</span>
                  </div>
               </Row>
            </Col>
            <Col md={4}>
               <Card
                  className='d-flex flex-column align-items-center justify-content-center'
                  style={{border: '5px solid light', padding: 10}}
               >
                  <h3 style={{fonstSize:32}}>От: {device.price} руб.</h3>
                  <Button variant='outline-dark'>Добавить в корзину</Button>
               </Card>
            </Col>
         </Row>
         <Row
            className='d-flex flex-column-start mt-3'
         >
            <h2>Характеристики:</h2>
            {device.info.map((descr, index) => 
               <Row 
                  key={descr.id} 
                  style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: '5px 10px'}}>
               <span>
                  {descr.title} : {descr.description}
               </span>   
               </Row>
            )}
         </Row>
      </Container>
   );
}

export default DevicePage;