import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/apiCalls';
import { Link } from "react-router-dom";
import { redirect } from 'react-router';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3f3f3;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #f3f3f3;
`;
const Img = styled.img`
height: 100;
width: 100;
border-radius: 50%;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #C58940;
  color: #FFFFFF;
  font-size: 24px;
  border: none;
  border-radius: 4px;
  margin: 16px 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #C58940;
    opacity: 0.8;
  }
`;

function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
 

  const handleClick = (e) => {
   
    e.preventDefault()
    login(dispatch, {username, password});
    
    
  };

  return (
    <Container>
      <FormContainer>
        <Img src="https://i.ibb.co/qJgdY0G/stripe-modified.png" alt="logo" style={{width: 200, marginBottom: 30}} />
        <Input type='text' placeholder='Username' onChange={e => setUsername(e.target.value)} />
       
        <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
        
        <Button onClick={handleClick}>Login</Button>
        
       
      </FormContainer>
    </Container>
  )
}

export default Login;