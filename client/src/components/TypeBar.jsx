import React from 'react';
import { useContext } from 'react';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';
import { observer } from 'mobx-react-lite';

const TypeBar = observer(() => {
   const {devices} = useContext(Context);

   return (
      <ListGroup>
         {devices.types.map(type => 
            <ListGroup.Item 
               style={{cursor: 'pointer'}}
               onClick={() => devices.setSelectedType(type)}
               active={type.id === devices.selectedType.id}
               key={type.id}
            >
               {type.name}
            </ListGroup.Item>   
         )}
      </ListGroup>
   );
})

export default TypeBar;