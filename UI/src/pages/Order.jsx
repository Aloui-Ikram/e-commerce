import { useDispatch, useSelector } from "react-redux";
import Annonce from "../components/Annonce";
import Navbar from "../components/Navbar";
import { useEffect,useState } from "react";

import { getUserOrders } from "../redux/apiCalls";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: 1% 1%;
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  color: teal;
  padding: 1% 0%;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Source Sans Pro', sans-serif;
  align-items: center;
  text-align: center;
`;

const Bar2 = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin: 2% 0%;
`;

const Orders = () => {
  const orders = useSelector((state) => state.user.orders);
  console.log(orders)
  const [PrintOrder,setPrinitOrder]=useState([])
  const userId = useSelector((state) => state.user.currentUser?._id);
  const dispatch = useDispatch();
  useEffect(() => { 
     
    fetch('http://localhost:3000/api/orders/GETPRODUCTS',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orders)
    
    
  }).then(response=>response.json())
  .then((response)=>{console.log(response);
    setPrinitOrder(response);console.log(PrintOrder)});


    if (userId) {
      dispatch(getUserOrders(userId));
      console.log()
    }
  }, [dispatch, userId]);
  return (
    <div>
      <Navbar />
      <Annonce />
      <h1 style={{color:"#C58940",margin:"30px"}}><b>my Order tracking</b></h1>
      <Container>
        <Bar>
          
        <span style={{ flex: 1 , color:"#C58940"}}>Products &amp; Quantities</span>
        <span style={{ flex: 1, color:"#C58940" }}>Id Order</span>
        <span style={{ flex: 1  ,color:"#C58940"}}>Total</span>
          <span style={{ flex: 1, color:"#C58940" }}>Address</span>
          <span style={{ flex: 1, color:"#C58940" }}>Status</span>
        </Bar>
        <div>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id}>
                <hr />
                <Bar2>
                  <span style={{ flex: 1 }}>
                  {order.products.map((pr) => {
  const product = PrintOrder.find((item) => item._id === pr.productId);
  return (
    <span  key={pr.productId}>
    <b style={{margin:"10px"}}> ***Product name :</b> {product && product.title}<br/><br/> <b>category:</b> {product && product.categories} <br/><br/> <b>quantity:</b> {pr.quantity} <br/>  <br/>
    </span>
  );
})}

          
                  </span>
                  <span  style={{ flex: 1 }}> { order._id}</span>
                  <span style={{ flex: 1 }}>{order.amount} DA</span>
                  <span style={{ flex: 1 }}>
                    {order.address.country}, {order.address.city},{" "}
                    {order.address.line1}, {order.address.postal_code}
                  </span>
                  <span style={{ flex: 1 }}>{order.status}</span>
                </Bar2>
              </div>
            ))
          ) : (
            <div>No orders found.</div>
          )}
        </div>
      </Container>

    </div>
  )};


  export default Orders;