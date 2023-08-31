import React from 'react'
import styles from '../styles/Account.module.css'
import {useState,useEffect} from 'react'
import { updateInfo } from '../redux/userRedux'
import axios from 'axios'


const InformationUpdate = ({currentUser,dispatch}) => {
  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [token,setToken] = useState()

  const [success,setSuccess] = useState(false)
  const [error,setError] =useState(false)
  console.log(token);
  const handleChange = async(e)=>{
    e.preventDefault()
    setSuccess(false)
    setError(false)
    try{  
      const data = {
        username: username,
        email: email,
      };

      const config = {
        method: 'put',
        url: `http://localhost:3000/api/users/${currentUser?._id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer '+token,
        },
        data: JSON.stringify(data),
      };

      const res = await axios(config);
      console.log(res.data);
      setSuccess(true)
      dispatch(updateInfo(res.data))
    }catch(err){
     setError(true)
     console.log(err);
     console.log(token);
    }
  }
  
  useEffect(()=>{
   //setName(currentUser?.name)
   //setLastName(currentUser?.lastName)
   setUsername(currentUser?.username)
   setEmail(currentUser?.email)
   setToken(currentUser?.accessToken)
   //setPhoneNumber(currentUser?.phoneNumber)
  },[currentUser])
  return (
  
   <form className={styles.form} onSubmit={(e)=>handleChange(e)}>
  
   
   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='username'>username</label>
   <input className={styles.input} value={username} required={true} onChange={(e)=> setUsername(e.target.value)} />
   </div>

   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='email'>email</label>
   <input className={styles.input} type='email' value={email} required={true} onChange={(e)=> setEmail(e.target.value)} />
   </div>
   {success && <span style={{color:'green',width:'100%'}}>YOUR INFORMATIONS HAS CHANGED SUCCESSFULY</span>}
   {error && <span style={{color:'red',fontSize:'13px',margin:'10px 0',width:'100%'}}>SOMETHING WENT WRONG!</span>}
    <div className={styles.buttonContainer }>
     <button className={styles.button} type='submit'>SAVE</button>
   </div>
  </form>
  )
}

export default InformationUpdate/** */



/*const InformationUpdatess = ({currentUser,dispatch,token}) => {
  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [success,setSuccess] = useState(false)
  const [error,setError] =useState(false)
  useEffect((e) => {
    handleChange(e);
  }, []);

  const handleChange = async (e) => {
    e.preventDefault()
    setSuccess(false)
    setError(false)
    try {
      const data = {
        username: username,
        email: email,
      };

      const config = {
        method: 'put',
        url: `http://localhost:3000/api/users/${currentUser?._id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer '+token,
        },
        data: JSON.stringify(data),
      };

      const res = await axios(config);
      console.log(res.data);
      setSuccess(true)
      dispatch(updateInfo(res.data))
    } catch (error) {
      setError(true)
      console.error(error);
    }
    
  };

  return (
    // JSX for your component
    <form className={styles.form} onSubmit={(e)=>handleChange(e)}>
      <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor='username'>username</label>
      <input className={styles.input} value={username} required={true} onChange={(e)=> setUsername(e.target.value)} />
      </div>
      <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor='email'>email</label>
      <input className={styles.input} type='email' value={email} required={true} onChange={(e)=> setEmail(e.target.value)} />
      </div>
      {success && <span style={{color:'green',width:'100%'}}>YOUR INFORMATIONS HAS CHANGED SUCCESSFULY</span>}
      {error && <span style={{color:'red',fontSize:'13px',margin:'10px 0',width:'100%'}}>SOMETHING WENT WRONG!</span>}
        <div className={styles.buttonContainer }>
        <button className={styles.button} type='submit'>SAVE</button>
      </div>
  </form>
  
  );
};

export default InformationUpdatess;/** */
