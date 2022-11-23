import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { Context } from '../../index';

const CreateDevice = observer(({show, onHide}) => {
   const {devices} = useContext(Context);
   const [name, setName] = useState('');
   const [price, setPrice] = useState(0);
   const [file, setFile] = useState(null);
   const [info, setInfo] = useState([]);

   useEffect(() => {
      fetchTypes().then(data => devices.setTypes(data));
      fetchBrands().then(data => devices.setBrands(data));
   }, [])

   const addInfo = () => {
      setInfo([...info, {
         title: '',
         description: '',
         number: Date.now()
      }]);
   }

   const selectFile = e => {
      setFile(e.target.files[0]);
   }

   const removeInfo = (number) => {
      setInfo(info.filter(i => i.number !== number));   
   }

   const changeInfo = (key, value, number) => {
      setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
   }

   const addDevice = () => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', `${price}`);
      formData.append('img', file);
      formData.append('brandId', devices.selectedBrand.id);
      formData.append('typeId', devices.selectedType.id);
      formData.append('info', JSON.stringify(info));

      createDevice(formData).then(data => {
         setName('');
         setPrice('');
         setFile(null);
         devices.setSelectedBrand({});
         devices.setSelectedType({});
         onHide();
      });
   }

   return (
      <Modal
         show={show}
         onHide={onHide}
         size="lg"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Добавить устройство
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
            <Dropdown className='mt-3'>
               <Dropdown.Toggle>{devices.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
               <Dropdown.Menu>
                  {devices.types.map(type =>
                     <Dropdown.Item 
                        onClick={() => devices.setSelectedType(type)}
                        key={type.id}
                     >
                        {type.name}
                     </Dropdown.Item>   
                  )}
               </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='mt-3'>
               <Dropdown.Toggle>{devices.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
               <Dropdown.Menu>
                  {devices.brands.map(brand =>
                     <Dropdown.Item 
                        onClick={() => devices.setSelectedBrand(brand)}
                        key={brand.id}
                     >
                        {brand.name}
                     </Dropdown.Item>   
                  )}
               </Dropdown.Menu>
            </Dropdown>
            <Form.Control 
               value={name}
               onChange={e => setName(e.target.value)}
               className='mt-3'
               placeholder='Введите название'
            />
            <Form.Control 
               value={price}
               onChange={e => setPrice(Number(e.target.value))}
               className='mt-3'
               placeholder='Введите цену'
               type='number'
            />
            <Form.Control 
               className='mt-3'
               type='file'
               onChange={selectFile}
            />
            <Button
               className='mt-3'
               variant='outline-dark'
               onClick={addInfo}
            >
               Добавить характеристику
            </Button>
            {info.map(i =>
               <Row 
                  className='mt-3'
                  key={i.number}
               >
                  <Col md={4}>
                     <Form.Control
                        value={i.title}
                        onChange={e => changeInfo('title', e.target.value, i.number)}
                        placeholder='Введите название характеристики'
                     />
                  </Col>
                  <Col md={4}>
                     <Form.Control
                        value={i.description}
                        onChange={e => changeInfo('description', e.target.value, i.number)}
                        placeholder='Введите описание характеристики'
                     />
                  </Col>
                  <Col md={4}>
                     <Button
                        onClick={() => removeInfo(i.number)}
                        variant='outline-danger'
                     >
                        Удалить
                     </Button>
                  </Col>
               </Row>   
            )}
           </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
         </Modal.Footer>
      </Modal>
   );
})

export default CreateDevice;