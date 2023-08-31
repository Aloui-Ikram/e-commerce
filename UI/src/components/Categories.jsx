import React from 'react'
import styled from 'styled-components';
import CategoiesItem from "./CategoriesItem"
import {categories} from "../data"
import CategoiesTitle from "./CategoriesTitle"
import { mobile } from "../responsive";

const Container = styled.div`
display:flex;
padding: 20px;
justify-content : space-between   ;
${mobile({ padding: "0px", flexDirection:"column" })};
`;
function Categories() {
  return (
    <div>
    <CategoiesTitle/>
    <Container>
      {categories.map(item => (
         <CategoiesItem  
         item ={item}
         key={item.id}
         />
      )

        )}
    </Container>
    </div>
  )
}

export default Categories
