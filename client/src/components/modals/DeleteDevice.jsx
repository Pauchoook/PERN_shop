import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteDevice } from '../../http/deviceAPI';

function DeleteDevice({show, onHide}) {
   const [value, setValue] = useState('');

   const deleteHandler = () => {
      deleteDevice(value);
      setValue('');
      onHide();
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
               Удалить устройство
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
            <Form.Control 
               value={value}
               onChange={(e) => setValue(e.target.value)}
               placeholder='Введите номер устройства'
            />
           </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant='outline-success' onClick={deleteHandler}>Удалить</Button>
         </Modal.Footer>
      </Modal>
   );
}

export default DeleteDevice;