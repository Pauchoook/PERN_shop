import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createType } from '../../http/deviceAPI';

function CreateType({show, onHide}) {
   const [value, setValue] = useState('');

   const addType = () => {
      createType({name: value});
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
               Добавить тип
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
            <Form.Control 
               value={value}
               onChange={(e) => setValue(e.target.value)}
               placeholder='Введите название'
            />
           </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant='outline-success' onClick={addType}>Удалить</Button>
         </Modal.Footer>
      </Modal>
   );
}

export default CreateType;