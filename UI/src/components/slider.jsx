
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';
import { sliderItems}  from "../data";
import { useState } from 'react';
import { mobile } from "../responsive";
import {Link}from"react-router-dom"
//parent
// eslint-disable-next-line
const container = styled.div`
  display: flex ;
  width :70% ;
  height: 40vh;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

//child
const Arrow = styled.div`
  height: 50px;
  width: 50px;
  background-color: #FAEAB1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  bottom: 0;
  margin : auto;
  position: absolute;
  top :0;
  //make the arrows button in center here they are in the same position to
  //make it one in left nd the othe in right side we're gonne use props 
  //inside arrow ~direction left md right~
  left : ${ (props)=> props.direction === "left" && "10px"};
  right : ${ (props)=> props.direction === "right" && "10px"};
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
// eslint-disable-next-line
 const Warpper =styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${(props)=> props.slideIndex * -100}vw);
    transition: all 1.5s ease;
    width: 200vw;
    
`;
// eslint-disable-next-line
 const Slide = styled.div`
 display: flex;
 align-items: center;
 align-content :center;
 width: 100vw;
 height: 100vh;
 ${mobile({ display: "none" })}
 
 `;

//i'll give to the two container img and info 1 flex cuz will have same space 
// half img and the other half info
// eslint-disable-next-line
const  ImgContainer = styled.div`
width: 50vw;
height: 100%;
margin-left:50px ;
`;

// eslint-disable-next-line
const  InfoContainer = styled.div`
 width: 50vw;
  padding: 48px;

`;
//styling our img
// eslint-disable-next-line
const Image = styled.img`
  height: 80%;
  
`;
const Title = styled.h1`
font-size:50px;
color: #DFA67B;


`;
const Desc = styled.p`
margin: 50px 0px;
font-size:25px;
font-weight :200;
letter-spacing:2px;
line-height: 2;

`;
const Button = styled.button`
  padding: 15px;
  border: 3px solid #C58940;
  background-color: white;
  cursor: pointer;
  font-weight:600;
  color: #3C2A21;
  letter-spacing:2px;
  border-radius: 5px;
  &:hover{
    background-color :#FAEAB1;
  }
  font-size: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
function Slider() {
//function handling arrow
  const [slideIndex , setSlideIndex]=useState(0)
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
         <ArrowBackIos/>
      </Arrow>

        <Warpper slideIndex={slideIndex}>
         {sliderItems.map(item =>(         

        <Slide key={item.id}>
        <ImgContainer>
        <Image src={item.img} />
        </ImgContainer>
         <InfoContainer>
           <Title>{item.title}</Title>
           <Desc>{item.desc}</Desc>
          <Button> <Link style={{ textDecoration: "none", color:"#3C2A21" }} to="/products">Shop now </Link></Button>
         </InfoContainer>
         </Slide>
         ) )}
      </Warpper>
      


      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIos/>
     </Arrow>
    </container>
  )
}

export default Slider
