import { EditOutlined, DeleteFilled, HeartFilled, HeartOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useState } from 'react';
import styles from '../styles/UserCard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserData, updateCurrentUser, updateUserData, setLikedUser } from '../userDataSlice';
import dynamic from "next/dynamic";

const { Meta } = Card;

//lazy loading to improve intial loading performance
const EditDetailsModal = dynamic(import("./EditDetailsModal"));

export default function UserCard() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = useSelector((state) => state.userData);
  const userData = data.userData;
  const currentUser = data.currentUser;

  function handleOpenModal(user) {
    setIsModalOpen(true);
    dispatch(updateCurrentUser(user));
  };

  function handleCloseModal(values) {
    setIsModalOpen(false);
    dispatch(updateUserData([values, currentUser.id]));
  };

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleDelete(user) {
    dispatch(deleteUserData(user));
  };

  //function to get images for each user and store it in array
  function getImage(i) {
    let imgArr = [];
    userData.map(user => {
      imgArr.push(`https://avatars.dicebear.com/v2/avataaars/{{${user.username}}}.svg?options[mood][]=happy`);
    });
    return imgArr[i];
  }

  return (
    <div className={styles.userCardWrapper}>
      {userData?.map((user, index) => {
        return (
          <div key={index}>
          <Card
            style={{
              width: 335,
            }}
            cover={
              <img
                alt="example"
                src={getImage(index)}
                style={{
                  height: 240,
                  backgroundColor: "#f0f0f0"
                }}
              />
            }
            actions={[
              user.liked ? <HeartFilled key="filled-heart" style={{ color: 'red', fontSize: '18px' }} onClick={() => dispatch(setLikedUser(user.id))} /> 
              : <HeartOutlined key="heart" style={{ color: 'red', fontSize: '18px' }} onClick={() => dispatch(setLikedUser(user.id))}/>,
              <EditOutlined key="edit" onClick={() => handleOpenModal(user)} style={{ fontSize: '18px' }}/>,
              <DeleteFilled key="delete" onClick={() => handleDelete(user)} style={{ fontSize: '18px' }}/>,
            ]}
          >
          <Meta
            title={user.name}
            description={
              <div>
                  <div className={styles.contactInfoWrapper}>
                    <MailOutlined key="email"/>
                    <p className={styles.contactInfo}>{user.email}</p>
                  </div>
                  <div className={styles.contactInfoWrapper}>
                    <PhoneOutlined key="phone-number"/>
                    <p className={styles.contactInfo}>{user.phone}</p>
                  </div>
                  <div className={styles.contactInfoWrapper}>
                    <GlobalOutlined key="website"/>
                    <p className={styles.contactInfo}>{user.website}</p>
                  </div>
              </div>
            }
          />
          </Card>
          </div>
        )
      })}
    <EditDetailsModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleCancel={handleCancel} />
    </div>
  )
}