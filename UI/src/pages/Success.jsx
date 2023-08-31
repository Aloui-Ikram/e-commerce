import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userReq } from "../reqMethod";
import {Link} from "react-router-dom";
import styled from "styled-components";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Navbar from "../components/Navbar";
import Annonce from "../components/Annonce";

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
const Container = styled.div`
  height: fit-content;
  padding-bottom: 1%;
  width: 30%;
  margin: 3% auto;
  border: 2px solid #C58940;
`;

const Container2 = styled.div`
  display: flex;
  align-items: center;
  margin: 2% 3%;
  justify-content: space-between;
  font-weight: normal;
  font-size: 25px;
  color:#C58940;
`;


const Container3 = styled.div`
  display: flex;
  align-items: center;
  margin: 2% 3%;
  justify-content: space-between;
  font-weight: normal;
  font-size: 25px;
`;


const Duo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-top: 3%;
`;

const Duo2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 5%;
  font-size: 16px;
`;

const Duo3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 5%;
  font-size: 16px;
`;

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  console.log(data);
  const cart = location.state.products;
   console.log(data);
   

  const currentUser = useSelector((state) => state.user.currentUser);
  
  const [orderId, setOrderId] = useState(null);
  const [orderTime, setOrderTime] = useState(null);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userReq.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quant,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        setOrderTime(res.data.createdAt)
        setProducts(res.data.products)
        setAddress(res.data.address)
        setTotal(res.data.amount)
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div>
    <Navbar/>
    <Annonce/>
    <Container>
      <Container2>
      
      <span>Payement Receipt</span>
      </Container2>
      <Container3>
        <Duo>
        <Duo3>
          <RoomIcon style={{marginRight:"10px"}}/>
          <span> Boumerdès , Algeria</span>
        </Duo3>
       
        </Duo>
        <Duo>
          <Duo2>
          <span> +213 558909329</span>
          <LocalPhoneIcon style={{marginLeft:"10px"}}/>
          </Duo2>
          <Duo2>
          <span>malrik12@gmail.com</span>
          <EmailIcon style={{marginLeft:"10px"}}/>
          </Duo2>
        </Duo>
      </Container3>
      <div style={{fontSize:"30px", marginLeft:"3.5%", color:"#C58940"}}>Order Details :</div>
      <div style={{fontSize:"25px", marginLeft:"4%", marginTop:"3%"}}>Products :</div>
      <div style={{fontSize:"18px", marginLeft:"4%", marginTop:"3%"}}>{products.map((product)=> <div>{product.quantity} x {product.productId} </div>)}</div>
      <div style={{fontSize:"25px", marginLeft:"4%", marginTop:"3%"}}>Address :</div>
      <div style={{fontSize:"18px", marginLeft:"4%", marginTop:"3%"}}> {address.city}, {address.line1}, {address.postal_code}</div>
      <div style={{display:"flex", alignItems:"center", marginTop:"3%"}}>
      <div style={{fontSize:"25px", marginLeft:"4%"}}>Buyer :</div>
      <div style={{fontSize:"20px", marginLeft:"2%"}}>{currentUser.username}</div>
      </div>
      <div style={{display:"flex", alignItems:"center", marginTop:"3%"}}>
      <div style={{fontSize:"25px", marginLeft:"4%"}}>Total :</div>
      <div style={{fontSize:"20px", marginLeft:"2%"}}>{total}DA</div>
      </div>
      <div style={{fontSize:"20px",color:"#C58940", marginLeft:"4%", marginTop:"3%", textAlign:"right", marginRight:"3%"}}>Order Id : <span style={{fontSize:"16px"}}>{orderId}</span></div>
    </Container>
    </div>
  );
};

export default Success;


// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { userReq } from "../reqMethod";

// const Success = () => {
//   const location = useLocation();
//   const data = location.state.stripeData;
//   const cart = location.state.cart;
//   const currentUser = useSelector((state) => state.user.currentUser);
//   const [orderId, setOrderId] = useState(null);

//   useEffect(() => {
//     const createOrder = async () => {
//       try {
//         const response = await userReq.post("/orders", {
//           userId: currentUser._id,
//           products: cart.products.map((item) => ({
//             productId: item._id,
//             quantity: item.quant,
//           })),
//           amount: cart.total,
//           address: data.billing_details.address,
//         });
//         setOrderId(response.data._id);
//       } catch (error) {
//         console.log(error); // Handle the error appropriately, e.g., show an error message
//       }
//     };

//     if (data && currentUser && cart) {
//       createOrder();
//     }
//   }, [data, currentUser, cart]);

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {orderId ? (
//         <div>
//           <p>
//             Order has been created successfully. Your order number is {orderId}
//           </p>
//           <Link to="/">Go to Homepage</Link>
//         </div>
//       ) : (
//         <p>Successfull. Your order is being prepared...</p>
//       )}
//     </div>
//   );
// };

// export default Success;
