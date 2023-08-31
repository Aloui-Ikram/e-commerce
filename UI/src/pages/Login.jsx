import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { Link  } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Annonce from '../components/Annonce';

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
  &:disabled {
    background-color: green;
    cursor: not-allowed;
  }
  
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  
`;

/*const Link = styled.a`
  margin: 5px 0px;
  font-size: 18px;
  cursor: pointer;
  color: #C58940;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
color:#FAEAB1;
  &:hover {
    color: #FFFFFF;
    text-decoration: underline;
  }
`;*/
const Error=styled.span`
color:red;
`;
function Login () {
 const [username,setUsername]=useState("");
 const [password,setPassword]=useState("");
 const dispatch =useDispatch();
 // i can use isFetching and error now buy using useselctor hook
 
 const {isFetching , error}=useSelector((state)=>state.user);
 const handleLogin =(e)=>
 {
  e.preventDefault() //for stop referching when i clichk the button
  login(dispatch , {username ,password});
 }
  return (
  <div>
  <Annonce/>
  <Navbar/>
    <Container>
    
      <Wrapper>
      
        <Title>Sign In </Title>
        <Form>
        
          <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
         
          <Input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value) }/>
         
          <Button onClick={handleLogin} disabled={isFetching}>Log in</Button>
          
        { error && <Error>somthing wrong</Error>}
        </Form>
        <Link style={{textDecoration:"none", color:"white"}} to="/register">Creat a new account</Link>
      </Wrapper>
    </Container>
    </div>
  );
}

export default Login;
