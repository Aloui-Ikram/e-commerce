/*import React from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";


const Container = styled.div`
  background-image: -webkit-linear-gradient(65deg, #E5BA73 50%, #FAEAB1 50%);
  min-height: 100vh;
  font-family: 'Helvetica Neue';
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #C58940;
  text-align: center;
  margin-top: 64px;
  margin-bottom: 32px;
  text-shadow: 2px 2px #FFFFFF;
  letter-spacing: 5px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;


 const Input = styled.input`
  flex: 1;
  min-width: 40%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 8px 0;
  box-sizing: border-box;
  background-color: #FAF8F1;
  flex: 1;

  font-size: 24px;
`;


const Button = styled.button`
  background-color: #C58940;
  color: #FFFFFF;
  font-size: 24px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #FFFFFF;
    color: #C58940;
  }
`;

function Register() {

  return (
    <Container>
      <Wrapper>
        <Title>Sign Up</Title>
        <Form>
        
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm password" />
          <Button>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;*/
import styles from '../styles/Register.module.css'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { register } from '../redux/apiCalls'
import { Navigate, Route, Routes } from "react-router-dom";
import Annonce from '../components/Annonce';
import Navbar from '../components/Navbar';

//import Router from 'next/router'
//import Image from 'next/image'

const Register = ({token}) => {
//const [name,setName] = useState('')
//const [lastName,setLastName] = useState('')
const [username,setUsername] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [passwordToast,setPasswordToast]=useState(false)
//const [phoneNumber,setPhoneNumber] = useState('')
const [error,setError] = useState(false)

const dispatch = useDispatch()
let currentUser =  useSelector((state)=>state.user.currentUser)

useEffect(()=>{
  if(currentUser && token){
    <Navigate replace  to="/" />
  }
 },[currentUser,token])
const sendRequest = async(e)=>{
  e.preventDefault()
  if( !username || !email || !password || !confirmPassword || password!==confirmPassword){
     return
  }else {
     const res = await register(dispatch,{username,email,password})
     res ? <Navigate replace  to="/" /> : setError(true)
 
  }
}
  return (
    <div>
  <Annonce/>
  <Navbar/>
<div className={styles.Container}>

   <form className={styles.Form} onSubmit={(e)=>sendRequest(e)}>
    <h1 className={styles.Title}>Sign Up</h1>
    <div className={styles.InputContainer}>
      
      
      <input className={styles.Input} value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' required={true}/>
      <input className={styles.Input} placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} type='email' required={true}/>
      <input className={styles.Input} minLength={6} placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value);e.target.value!==confirmPassword ? setPasswordToast(true):setPasswordToast(false)}} type='password' required={true}/>
      <input className={styles.Input} minLength={6} placeholder='Confirm Password' value ={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value);e.target.value!==password ? setPasswordToast(true):setPasswordToast(false)}} type='password'/>
      {passwordToast && 
      <div style={{color:'red'}}>
        Passwords don't matchs
      </div>}
     
     </div>
     <div className={styles.Agreement}>BY CREATING AN ACCOUNT I CONSENT TO THE PROCESSING OF MY PERSONAL DATA IN ACCORDANCE WITH THE <b>PRIVACY POLICY</b></div>
    <button className={styles.Button}>CREATE</button>
    {error && <span>something went wrong</span>}
  </form>
  
  </div>
  </div>
  )
}



export default Register