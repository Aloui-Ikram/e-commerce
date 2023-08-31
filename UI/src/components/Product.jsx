import React  from 'react';
import styled from 'styled-components';
import {  SearchOutlined } from '@mui/icons-material';
import { Link  } from 'react-router-dom';
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FAF8F1;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Img = styled.img`
  height: 80%;
  width: 100%;
  object-fit: contain;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  //do some animation
  transition: all 0.5s ease;
  &:hover {
    background-color: #FAEAB1;
    transform: scale(1.1);
  }
`;

function Product({item, isLast}) {
  const height = isLast ? "70%" : "90%";

  return (
    <Container>
      <Img src={item.img} style={{height: height}} />
      <Info>
        
       
        <Icon>
        <Link to ={`/product/${item._id}`}>
          <SearchOutlined style={{color: "#3C2A21"}} />
          </Link>
        </Icon>
       
      </Info>
    </Container>
  );
}

export default Product;