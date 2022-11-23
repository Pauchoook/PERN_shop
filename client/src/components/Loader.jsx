import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader(props) {
   return (
      <div 
         style={{height: '100vh'}}
         className='d-flex justify-content-center align-items-center'
      >
         <Spinner animation='grow' />
      </div>
   );
}

export default Loader;