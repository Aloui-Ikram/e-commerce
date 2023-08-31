import React from 'react'
import styled from 'styled-components';
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* add this line */
  
`;

const BigTitle = styled.h1`
 
letter-spacing:3px;
 font-size: 30px;
  transition: font-size 0.3s ease-in-out;
  &:hover {
    font-size: 50px;
  }
color: #DFA67B;
`;
function CategoriesTitle() {
  return (
    <TitleContainer>
      <BigTitle> Categories </BigTitle>
    </TitleContainer>
  )
}

export default CategoriesTitle
