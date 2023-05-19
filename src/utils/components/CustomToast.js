import React from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

const CustomToast = ({item}) => {
  return (
    <ToastContainer className="p-3" position='bottom-end' >
      <Toast bg={item.status} position='bottom-end'>
          <Toast.Body>
            {item.txt}
          </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default CustomToast