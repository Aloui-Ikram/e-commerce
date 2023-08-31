import React from 'react'
import styled from 'styled-components';
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* add this line */
  margin-bottom:30px;
  
`;

const BigTitle = styled.h1`
 
letter-spacing:3px;
 font-size: 30px;
 font-weight:300 ;
  transition: font-size 0.3s ease-in-out;
  &:hover {
    font-size: 50px;
  }
color: #DFA67B;
`;
function InfoTitle() {
  return (
    <TitleContainer>
      <BigTitle>About Us</BigTitle>
    </TitleContainer>
  )
}

export default  InfoTitle;
