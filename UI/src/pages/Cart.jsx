
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Add, Remove } from '@mui/icons-material'
import { removeProduct, updateProduct, clearCart } from "../redux/cartRedux";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Annonce from "../components/Annonce";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userReq } from "../reqMethod";
import { useHistory, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE_PUB_KEY;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;


const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
color: #B05B3B;
`;

const ProductId = styled.span``;

const ProductClr = styled.div`

height :20px;
width: 20px;
border-radius:50%;
border-style: solid;
background-color: ${(props) => props.color};

`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 0.1px solid black;
  margin: 0% 2%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 41vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Button2 = styled.button`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: red;
  cursor: pointer;
  border: none;
`;

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const quant= useSelector((state) => state.cart.quant);
  const [stripeToken, setStripeToken] = useState(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        if (stripeToken) {
          const res = await userReq.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: 5000,
          });
  
          Navigate("/success", {
            state: {
              stripeData: res.data,
              products: cart,
            },
          });
  
          dispatch(clearCart());
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    makeRequest();
  }, [stripeToken, cart.total, Navigate, dispatch]);
   

  const handleClick = (x, y, z) => {
    dispatch(removeProduct({ x, y, z }));
  };

  const handleQuantity = (mark, x) => {
    if (mark === "-") {
      dispatch(updateProduct({ mark, x }));
    } else {
      dispatch(updateProduct({ mark, x }));
    }
  };

  return (
    <Container>
      <Navbar />
      <Annonce />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                    <b>Identifier:</b> {product._id}
                    </ProductId>
                    <ProductClr  color={product.color}/>
                      
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => handleQuantity("+", product._id)} />
                    <ProductAmount>{product.quant}</ProductAmount>
                    <Remove onClick={() => handleQuantity("-", product._id)} />
                    <Button2 onClick={() => handleClick(product._id, product.price, product.quantity)}>
                      <DeleteOutlineOutlinedIcon />
                    </Button2>
                  </ProductAmountContainer>
                  <ProductPrice>{product.price * product.quant} DA</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            
             
          
        
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total} DA</SummaryItemPrice>
            </SummaryItem>
          
            {cart.total !== 0 && user ? (
              <StripeCheckout
                name="Malrik Shop"
                image="https://i.ibb.co/qJgdY0G/stripe-modified.png"
                billingAddress
                shippingAddress
                description={`Your total is ${cart.total} DA`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
              <TopButton style={{ marginBottom: "20px" }}>CHECKOUT NOW</TopButton>
              </StripeCheckout>
            ) : (
              <div>
              <TopButton style={{ marginBottom: "20px" }}> <Link to="/login"> CHECKOUT NOW </Link></TopButton>
            
              </div>
            )}
            <Link to="/" style={{}}>
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;