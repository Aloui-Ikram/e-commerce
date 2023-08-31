/* eslint-disable */
import styles from '../styles/Account.module.css'
import { Delete } from '@mui/icons-material'
import { updateInfo } from '../redux/userRedux'
import axios from 'axios'
import {useState} from 'react'

const AdressesUpdate = ({currentUser,token,dispatch}) => {
 
 const wilaya = ['adrar','chlef','laghouat','alg']
 const [newAddress,setNewAddress] = useState([])

 const handleChangeNewAddress =(e) =>{
  setNewAddress({...newAddress,[e.target.name]:e.target.value})
}

 const sendReq = async(e)=>{
  e.preventDefault()
  const req = {
   adresses:[...currentUser?.adresses, newAddress]
  }
  try{
    const res = typeof(window)!=="undefined" && await axios.put( `${window.location.origin}/api/user/${currentUser?._id}`,req,{headers:{token:token}}) 
    dispatch(updateInfo(res.data))
 
    
   }catch(err){
  }
}

 const handleChangePrincipeAddress = async(e)=>{
  const req = {
   principleAddress:e.target.value
  }
  try{
  const res =typeof(window)!=="undefined" && await axios.put(`${window.location.origin}/api/user/${currentUser._id}`,req,{headers:{token:token}})
  
  dispatch(updateInfo(res.data))
  
 }catch(err){
 }}
 const handleDeleteAddress = async(a)=>{
  const req = {
   adresses : currentUser?.adresses.filter((ad)=>ad._id!==a._id),
   principleAddress:currentUser?.principleAddress == a._id ? "" : currentUser?.principleAddress
  }
  try{
   const res =typeof(window)!=="undefined" && await axios.put(`${window.location.origin}/api/user/${currentUser?._id}`,req,{headers:{token:token}}) 
   dispatch(updateInfo(res.data))

  }catch(err){
    
 }
 }
  return (
    <>
      <h1 className={styles.detailItemTitle}>your principle address</h1>
         <div className={styles.form}>
                   {
           currentUser?.adresses.map((a)=>(
           <div className={styles.radioLign} key={a._id}>
           <label className={styles.radioLabel} >
            <input className={styles.radioInput} type="radio" value={a._id} checked={currentUser?.principleAddress == a._id} onChange={(e)=>handleChangePrincipeAddress(e)} />
              {a.street}, {a.commune}, {a.wilaya}
          </label>
          <Delete className={styles.delete} onClick={()=>handleDeleteAddress(a)} />
          </div>
          ))
         }
         </div>

       <h1 className={styles.detailItemTitle}>Add an adress</h1>
       <form className={styles.form} onSubmit={(e)=>sendReq(e)}>
        <div className={styles.inputContainer}>
         
        <label className={styles.label} htmlFor='wilaya'>wilaya</label>
        <select id='wilaya' name='wilaya' className={styles.input} onChange={(e)=>handleChangeNewAddress(e)}>
        <option disabled selected></option>
         {wilaya.map((w,i)=>(
          <option  key={i} value={w}>{w}</option>
         ))}
        </select>
        </div>
        <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor='commune'>commune</label>
        <input name='commune' className={styles.input} onChange={(e)=>handleChangeNewAddress(e)}  />
        </div>
        <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor='street'>street</label>
        <input name='street' className={styles.input} onChange={(e)=>handleChangeNewAddress(e)}  />
        </div>
        <div className={styles.buttonContainer }>
          <button className={styles.button} type='submit'>ADD</button>
        </div>
        </form>
    </>
  )
}

export default AdressesUpdate