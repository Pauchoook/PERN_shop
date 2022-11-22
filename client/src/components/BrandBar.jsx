import React from 'react';
import { useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { Card, Row } from 'react-bootstrap';

const BrandBar = observer(() => {
   const {devices} = useContext(Context);

   return (
      <Row className='d-flex'>
         {devices.brands.map(brand => 
            <Card
               style={{width: 'auto', cursor: 'pointer', marginRight: 10}}
               key={brand.id}
               className='p-3'
               onClick={() => devices.setSelectedBrand(brand)}
               border={brand.id === devices.selectedBrand.id ? 'denger' : 'light'}
            >
               {brand.name}
            </Card>   
         )}
      </Row>
   );
})

export default BrandBar;