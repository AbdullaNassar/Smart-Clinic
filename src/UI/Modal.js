import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.content}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className={classes.actions}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>,
     document.body
  );
};

export default DeleteConfirmationModal;