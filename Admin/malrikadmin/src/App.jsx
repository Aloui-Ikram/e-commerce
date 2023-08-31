import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { Link } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";

import "./app.css";
import Homee from "./pages/home/Homee";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";


function App() {
  
  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser.isAdmin;
  console.log(admin);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        {admin ? (
          
          <div>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Homee />
              </Route>
            
              
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/orders">
              <Order />
            </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </div>
          </div>
          
        ) : <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize:"50px",
          color:"#C58940",
        }}
      >
        You must be logged in.
        <Link to="/login">
          <button style={{ cursor:"pointer", padding: 10,borderRadius:35,borderColor:"#C58940", marginTop: 20, backgroundColor:"#FAF8F1", color:"#C58940"}}>Go to login page</button>
        </Link>
      </div>}
      </Switch>
    </Router>
  );
}

export default App;
