import { Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../styles/EditDetailsModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentUser } from '../userDataSlice';


export default function EditDetailsModal(props) {
  const dispatch = useDispatch();
  const { isModalOpen, handleCloseModal, handleCancel } = props;
  const data = useSelector((state) => state.currentUser);
  const currentUser = data.currentUser;

  //to handle change in input fields and edit currentUser data in state
  function handleChange(field, value) {
    //input field should not be empty
    if(value !== ""){
      dispatch(editCurrentUser([field, value]));
    }
  } 

  return (
    <Modal
      title="Edit" 
      open={isModalOpen} 
      onOk={handleCloseModal} 
      onCancel={handleCancel}>
        <div className={styles.editFieldWrapper}>
          <div className={styles.label}>
            <p>*</p>
            Name:
          </div>
          <Input styles={{ height: "fit-content" }} value={currentUser?.name} onChange={(e) => {handleChange('name', e.target.value);}} required/>
        </div>
        <div className={styles.editFieldWrapper}>
          <div className={styles.label}>
            <p>*</p>
            Email:
          </div>
          <Input type='email' styles={{ height: "fit-content" }} value={currentUser?.email}  onChange={(e) => {handleChange('email', e.target.value);}}/>
        </div>
        <div className={styles.editFieldWrapper}>
          <div className={styles.label}>
            <p>*</p>
            Phone:
          </div>
          <Input styles={{ height: "fit-content" }} value={currentUser?.phone}  onChange={(e) => {handleChange('phone', e.target.value)}}/>
        </div>
        <div className={styles.editFieldWrapper}>
          <div className={styles.label}>
            <p>*</p>
            Website:
          </div>
          <Input styles={{ height: "fit-content" }} value={currentUser?.website}  onChange={(e) => {handleChange('website', e.target.value);}}/>
        </div>
    </Modal>
  )
}