//import styles from '../styles/Account.module.css'
import styles from '../styles/Account.module.css'
import { useSelector,useDispatch } from 'react-redux'
import {updateInfo} from 'react-redux'
import PasswordUpdate from '../components/PasswordUpdate'
import AdressesUpdate from '../components/AdressesUpdate'
import{Link}from"react-router-dom"
import InformationUpdate from '../components/InformationUpdate'
import {useEffect,useState} from 'react'
//import Router from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Navigate, Route, Routes } from "react-router-dom";
import Annonce from '../components/Annonce'

const Account = ({token}) => {
 const [menu,setMenu] = useState('My details') 
 const currentUser = useSelector((state)=>state.user?.currentUser)
 
 const dispatch = useDispatch()
 useEffect(()=>{
   if(!currentUser || !token){
    //Router.push('/login')

   <Navigate replace  to="/Login" />
  }
 },[currentUser,token]) 

  return (
    <>
    <Annonce/>
    <Navbar token={token}/>
    <div className={styles.Container}>
     <h1 className={styles.title}>MY ACCOUNT</h1>
     <div className={styles.wrapper}>
      <div className={styles.left}>
       <ul className={styles.ul}>
        <li className={styles.li} style={{backgroundColor: menu == 'My details'? 'rgb(228, 205, 163)' : 'whitesmoke',color: menu == 'My details'? 'black' : 'black' }} onClick={()=>setMenu('My details')}>My details</li>
        <li className={styles.li} style={{backgroundColor: menu == 'My orders'? 'rgb(228, 205, 163)' : 'whitesmoke',color: menu == 'My orders'? 'black' : 'black' }} onClick={()=>{setMenu('My orders');}}><Link style={{textDecoration:"none", color:"black"}}  to="/order" >My orders</Link></li>
       </ul>
      </div>
      <div className={styles.right}>
       <h1 className={styles.subTitle}>My details</h1>
       <h1 className={styles.detailItemTitle}>Personal information</h1>
       <hr className={styles.hr}></hr>
       <InformationUpdate currentUser={currentUser} dispatch={dispatch} token={token} />
        <h1 className={styles.detailItemTitle}>Change your password</h1>
       <hr className={styles.hr}></hr>
        <PasswordUpdate currentUser={currentUser} token={token}/>
      </div>
     </div>
    </div>
    <Footer/>
    </>
  )
}
export  const getServerSideProps = (ctx)=>{
  const cookies = ctx.req?.cookies || null
  if (!cookies.token){
    return{
     redirect : {
      destination : '/login',
      permanent : false
     }
    }
   }
  return{
   props:{
    token:cookies?.token || null
   }
  }
}
export default Account