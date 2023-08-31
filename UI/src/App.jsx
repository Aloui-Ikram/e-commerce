//eslint
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Productpage from "./pages/Productpage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Account from "./pages/Account";
import Order from "./pages/Order";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";


function App() {
  
  const user = useSelector((state) => state.user.currentUser);
  // Example user variable for testing purposes
  //Now, when you click on the "Shop now" button,
  // it should take you to the ProductList page, 
  //and when you try to access the Cart page, it will only
  // be rendered if the user variable is true. 
  //If not, it will redirect you to the Login page.
  // const func = (Component) => (props) =>
  // user ? <Component {...props} /> : <Login />;

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:category?" element={<ProductList />} />
      <Route path="/cart" element= {<Cart/>}  />
       
      <Route path="/product/:id?" element={<Productpage />} />
      <Route path="/success"  element={<Success/>}  />
      <Route path="/register" element={user?<Navigate replace  to="/" />:<Register />}/>
      <Route path="/login" element={user?<Navigate replace  to="/" />:<Login />} />
      <Route path="/account" element={<Account/>}/>
      <Route path="/Order" element= {user? <Order /> : <Navigate replace  to="/login" />}/>
  
    </Routes>
  );
}

export default App;
