import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
height: 20px;
background-color: #E5BA73 ;
color: white;
text-align: center;
display: flex;
justify-content: center;
font-size: 18px;
font-weight: 300;
`;
function Annonce() {
  return (
    <Container>
      super deal ! free shipping on order over 5000 DA
    </Container>
  )
}

export default Annonce
