import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

export function ConfirmationModal ({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.content}>
        {/* <h2>انهاء الحجز</h2>
        <hr/> */}
        <p>هل تريد انهاء هذا الحجز </p>
        <div className={classes.actions}>
          <button  className={classes.cncl} onClick={onCancel}>لا</button>
          <button className={classes.cnfrm} onClick={onConfirm}>نعم</button>
        </div>
      </div>
    </div>,
     document.body
  );
};
const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.content}>
        <h2>تأكيد الحذف</h2>
        <hr/>
        <p>هل انت متأكد من حذف هذا الحجز؟ لا يمكن التراجع عن هذا الاجراء فيما بعد </p>
        <div className={classes.actions}>
          <button  className={classes.cncl} onClick={onCancel}>الغاء</button>
          <button className={classes.delete} onClick={onConfirm}>حذف</button>
        </div>
      </div>
    </div>,
     document.body
  );
};

export default DeleteConfirmationModal;