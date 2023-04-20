import React, { useEffect, useState } from 'react';
import UserCard from '../Components/UserCard'
import styles from '../styles/Home.module.css';
import { useDispatch } from 'react-redux';
import { setUserData } from '../userDataSlice'; 

export default function Home(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      //updating state with user-data as the page mounts
      dispatch(setUserData(props.data));
      setLoading(false);
    }, 1500);
  }, []);

  return (
    isLoading ? 
    <div className={styles.spinner}></div> 
    :
    <UserCard />
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}