const express = require("express");
const cors = require("cors");

//to put the screts things like password of the users
const dotenv = require("dotenv");
dotenv.config();
const corsOptions = {
  origin: "*",
  credentials: true, 
  optionSuccessStatus: 200,
};
const app =express();
app.use(cors(corsOptions));
const mongoose = require("mongoose");

const userRoute =require("./routes/user")
const authRoute =require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const stripeRoute = require("./routes/stripe")

//connect our databases
mongoose.connect('mongodb://127.0.0.1:27017/ShopDB')
.then(()=>console.log("DB conection successfull"))

.catch((err)=> console.log(err))
;
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/carts",cartRoute);
app.use("/api/checkout",stripeRoute);
//it's mean we're gonna go to lh:3000 api/users/find/id -->le cas de users


app.listen(  3000,function(){
    console.log("backend server is running on port 3000");
 });
