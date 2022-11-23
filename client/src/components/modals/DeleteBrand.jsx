import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteBrand } from '../../http/deviceAPI';

function DeleteBrand({show, onHide}) {
   const [value, setValue] = useState('');

   const deleteHandler = () => {
      deleteBrand(value);
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
               Удалить бренд
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
            <Form.Control 
               value={value}
               onChange={(e) => setValue(e.target.value)}
               placeholder='Введите название бренда'
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

export default DeleteBrand;