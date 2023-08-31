import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Annonce from "../components/Annonce";
import Products from "../components/Products";
import Footer from "../components/Footer"
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
const Container = styled.div`
  width: 100%;

`;
const Title = styled.h1`
  margin:20px;
  color: #C58940;
  font-family: 'Urbanist';
  text-transform: capitalize;
  
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const Filter = styled.div`
 display: flex;
  align-items: center;
  margin: 0 20px;
  
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3c2a21;
  font-family: 'Urbanist', sans-serif;
  ${mobile({ marginRight: "0px" })};
`;
const Select = styled.select`
 
  margin-left: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f8f1e7;
  color: #3c2a21;
  font-size: 20px;
  font-family: 'Urbanist', sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  ${mobile({ margin: "10px 0px" })};
`;
const Option = styled.option``;
const ProductList = () => {
  const location =useLocation();
 const cat = location.pathname.split("/")[2];
 const [filters,setFilters]=useState({});
 const [sort,setSort]=useState("Newest");
 //event --> we re gonna take value from our select method from our option
 const handleFilters= (event )=>{
   const value =event.target.value;
   setFilters({
    ...filters,
   [event.target.name]:value,

   });
 };

  return (
    <Container>
      <Navbar />
      <Annonce />
      <Title> {cat} </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Product: </FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option >
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>yellow</Option>
            <Option>brown</Option>
            <Option>red</Option>
            <Option>green</Option>
            <Option>blue</Option>
            <Option>orange</Option>
            <Option>pink</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Product: </FilterText>
          <Select onChange={event=>{setSort(event.target.value)}}>
            <Option value="Newest">Newest</Option>
            <Option value="asc">Price (low to high)</Option>
            <Option value="desc">Price (high to low)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products  cat={cat} filters={filters} sort={sort}/>
      <Footer />
    </Container>
  )
}

export default ProductList