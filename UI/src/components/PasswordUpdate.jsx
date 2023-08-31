import styles from '../styles/Account.module.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
import { updateInfo } from '../redux/userRedux'

const PasswordUpdate = ({currentUser}) => {
 
 const [currentPassword,setCurrentPassword] = useState('')
 const [newPassword,setNewPassword] = useState('')
 const [wrongCredential,setWrongCredential] = useState(false)
 const [success,setSuccess] = useState(false)
 const [token,setToken] = useState()
 const [error,setError] =useState(false)

 const handleChangePassword = async(e)=>{
  e.preventDefault()
  setWrongCredential(false)
  setSuccess(false)
  const req = {
   currentPassword:currentPassword,
   password:newPassword
  }
 /* try{ 
   const res = typeof(window)!=="undefined" &&  await axios.put(`${window.location.origin}/api/user/${currentUser._id}`,req,{headers:{token:token}})  
   setSuccess(true)
  }catch(err){
    if(err.response.data == "wrong credential"){
     setWrongCredential(true)
    }
  }*/
  try{  
    const data = {
      currentPassword:currentPassword,
      password:newPassword
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
    //dispatch(updateInfo(res.data))
  }catch(err){
   setError(true)
   console.log(err);
   console.log(token);
  }
}

useEffect(()=>{
 //setName(currentUser?.name)
 //setLastName(currentUser?.lastName)
 //setUsername(currentUser?.username)
// setEmail(currentUser?.email)
 setToken(currentUser?.accessToken)
 //setPhoneNumber(currentUser?.phoneNumber)
},[currentUser])
 
  return (
   
   <form className={styles.form} onSubmit={(e)=>handleChangePassword(e)}>
   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='currentPassword'>currnetPassword</label>
   <input className={styles.input} type='password' value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} />
   </div>
   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='newPassword'>newPassword</label>
   <input className={styles.input} type='password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
   </div>
   {success && <span style={{color:'green'}}>PASSWORD HAS CHANGED SUCCESSFULY</span>}
   {wrongCredential && <span style={{color:'red',fontSize:'13px',margin:'10px 0'}}>THE CURRENT PASSWORD IS NOT CORRECT!</span>}
   <div className={styles.buttonContainer }>
     <button className={styles.button} type='submit'>SAVE</button>
   </div>
   </form>
  )
}

export default PasswordUpdate