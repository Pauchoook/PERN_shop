import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import DeleteBrand from '../components/modals/DeleteBrand';
import DeleteDevice from '../components/modals/DeleteDevice';
import DeleteType from '../components/modals/DeleteType';

function Admin(props) {
   const [brandVisible, setBrandVisible] = useState(false);
   const [typeVisible, setTypeVisible] = useState(false);
   const [deviceVisible, setDeviceVisible] = useState(false);
   const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false);
   const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
   const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);

   return (
      <Container className='d-flex flex-column'>
         <Button
            onClick={() => setTypeVisible(true)}
            className='mt-2'
            variant='outline-dark'
         >
            Добавить тип
         </Button>
         <Button
            onClick={() => setBrandVisible(true)}
            className='mt-2'
            variant='outline-dark'
         >
            Добавить бренд
         </Button>
         <Button
            onClick={() => setDeviceVisible(true)}
            className='mt-2'
            variant='outline-dark'
         >
            Добавить устройство
         </Button>
         <Button
            onClick={() => setDeleteDeviceVisible(true)}
            className='mt-2'
            variant='outline-dark'
         >
            Удалить устройство
         </Button>
         <Button
            onClick={() => setDeleteTypeVisible(true)}
            className='mt-2'
            variant='outline-dark'
         >
            Удалить тип
         </Button>
         <Button
            onClick={() => setDeleteBrandVisible(true)}
            className='mt-2'
            variant='outline-dark'
         >
            Удалить бренд
         </Button>

         <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
         <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
         <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
         <DeleteDevice show={deleteDeviceVisible} onHide={() => setDeleteDeviceVisible(false)} />
         <DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)} />
         <DeleteBrand show={deleteBrandVisible} onHide={() => setDeleteBrandVisible(false)} />
      </Container>
   );
}

export default Admin;