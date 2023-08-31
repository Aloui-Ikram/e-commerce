import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Annonce from '../components/Annonce';
import Footer from "../components/Footer"
import { Add, Remove } from '@mui/icons-material';
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
import { pubReq } from '../reqMethod';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
const Container = styled.div`

`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-wrap:wrap;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  ${mobile({   maxHeight: "50%" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 100;
  
  margin-bottom: 1em;
  font-size: 60px;
  font-family: 'Urbanist', sans-serif;
`;

const Desc = styled.p`
   line-height: 2;
  margin-bottom: 1em;
  margin: 20px 0px;
  font-size: 20px;
  font-family: 'Urbanist', sans-serif;
`;

const Price = styled.span`
  font-weight: 350;
  font-size: 50px;
  color:#C58940;
  
`;

const FilterContainer = styled.div`
  width: 40%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 250;
  font-family: 'Urbanist';
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-style: solid;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;


const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  color: #444;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  font-weight:600;
  ${mobile({ width: "100%" })}
`;


const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #C58940;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight:600;
  margin: 0px 5px;
`;


const Button = styled.button`
  padding: 15px;
  border: 3px solid #C58940;
  background-color: white;
  cursor: pointer;
  font-weight:600;
  color: #3C2A21;
  margin-left: 1em;
  border-radius: 5px;
  &:hover{
    background-color :#D5CEA3;
  }
  font-size: 20px;
  font-family: 'Urbanist', sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

function Productpage() {
  const location =useLocation();
  //product id
 const id = location.pathname.split("/")[2];
 const [product,setProduct]= useState({});
 const [quant,setQuant]= useState(1);
 const [color, setColor] = useState("");
 const [size, setSize] = useState("");
 const dispatch= useDispatch()
 useEffect(()=>{
   const getProduct = async()=>{
    try{
    const res = await  pubReq.get("/products/find/"+id);
    setProduct(res.data)
    }catch(err){

    }
   };
   getProduct();
 },[id])

 const handelQuant = (type)=>{
  if(type==="dec"){
    quant>1 && setQuant(quant-1);
  }else{
    setQuant(quant+1);
  }
 }
const handelClick = ()=>{
  //update cart
  dispatch(
    addProduct({...product,quant,color,size})
  
  )

}


 
  return (
    <Container>
      <Navbar />
      <Annonce />
      <Wrapper>
        <ImgContainer>
        <Image  src={product.img}/>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc} </Desc>
          <Price>{product.price} DA</Price>
         
          <FilterContainer>
            <Filter>
              <FilterTitle>Color :</FilterTitle>
              {product.color?.map((c)=>(
                <FilterColor color={c} key={c} onClick={() => setColor(c)}/>
              
  ))}
              
              
           </Filter>

       <Filter>
       <FilterTitle > Size :</FilterTitle>
       
       <FilterSize onChange={(e) => setSize(e.target.value)}>
          
            {product.size?.map((s) => (
              <FilterSizeOption key={s} >{s}</FilterSizeOption>
            ))}
      
            </FilterSize>
      </Filter>
      </FilterContainer>
      <AddContainer>
           
            <Remove onClick ={()=>handelQuant("dec")} cursor="pointer"/>
            <Amount>{quant}</Amount>
            
            <Add onClick ={()=>handelQuant("inc")} cursor="pointer"/>
            
            <Button onClick={handelClick}>Add to cart</Button>
            
            </AddContainer>
        
       </InfoContainer>
      
      </Wrapper>
     
     
      <Footer/>
    </Container>
      
  )
}

export default Productpage;