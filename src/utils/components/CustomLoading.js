import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const CustomLoading = () => {
  return (
    <Button variant="primary" disabled className="custom_loading">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>
  )
}

export default CustomLoading