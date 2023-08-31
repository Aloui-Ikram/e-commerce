

import { Link  } from 'react-router-dom';
import styled from 'styled-components';


 const Container  = styled.div`
 flex:1;
 position: relative;
 margin :4px;
 margin-top:10px ;
 height:  70vh ;
 `;


  const Info  = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  `;
  const Title  = styled.h1`
  margin-bottom:25px ;
  margin-top:25px ;
  color : white;
  `;
  const Button  = styled.button`
  font-weight :600;
  letter-spacing:2px;
  border-radius: 50%;
  font-family: 'Urbanist', sans-serif;
  padding: 13px;
  background-color: white;
  color:#3C2A21 ;
  cursor: pointer;
  &:hover {
    background-color: #FAF8F1;
    transform: scale(1.1);
  }
  `;
  const Image  = styled.img`
  width: 100%;
  height:100%;
  object-fit :cover;
 
  `;

function CategoriesItem({item}) {
  
  return (
   
    <Container>
   <Link   to={`/products/${item.cat}` }>
      <Image src={item.img}/>
      <Info>
         <Title> {item.title} </Title>
       
         <Button  > SHOP NOW </Button>
      </Info>
      </Link >
    </Container>
    
  )
}

export default CategoriesItem;
