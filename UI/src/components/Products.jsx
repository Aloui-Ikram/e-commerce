/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Product from "./Product"



const Container = styled.div`
  padding: 20px;
  display: flex;
  //to made rows of prodect mydjoh horizontal
  flex-wrap :wrap;
  justify-content : space-between;
`;

function Products({cat, filters, sort}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        console.log({cat})
        const url = cat
        ? `http://localhost:3000/api/products?category=${cat}`
        : "http://localhost:3000/api/products";
        const res = await axios.get(url);
        //update my products 
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);
   

  //filterd products
  useEffect(() => {
    cat &&
      setFilteredProducts(
        //we re gonna chose our filters and look inside each key color yellow size M
        //in this case the key is color and size and the value is yelow and midieum id any 
        //item match the value we're gonna display them   
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);
  
 // sort products
 
 useEffect(() => {
  if (sort === "Newest") {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    );
  
  } else if (sort === "asc") {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
    );
  } else {
    setFilteredProducts((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
    );
  }
}, [sort]);
  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(3, 11)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;