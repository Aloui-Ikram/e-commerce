const router =require("express").Router();
const {verfierToken ,verfierTokenAuthoriz ,verfierTokenAdmin }=require("./verifierToken")
const Cart = require("../models/Cart");

// //CREAT A Cart enyuser can creat acart 
// router.post('/',verfierToken , async(req,res)=>{
//     //lproduct li yhto ladmin nhto fla base de donnee
//     const newCart = new Cart(req.body);
//     try{
//       const saveCart = await newCart.save();
//       res.status(200).json(saveCart)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

// //update 
// //user can change his own cart --> verfierTokenAuthoriz 
//  router.put("/:id",verfierTokenAuthoriz , async(req,res)=>{
//    try {
//         const updatedCart = await User.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(200).json(updatedCart);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     });

// //get user cart
// //FIND USERID

// router.get("/find/:userId",verfierTokenAuthoriz, async(req,res)=>{
  
//     try {
//        const cart = await Cart.find({userId : req.params.userId})
//        res.status(200).json(cart);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     });

//  //get all
//  //only admin can reach this data
//  router.get("/",verfierTokenAdmin,async(req,res)=>{
//     try{
//        const carts = await Cart.find();
//         res.status(200).json(carts)
//     }catch(err){
//         res.status(500).json(err);
//     }
//  }
  
//  );
// //delete
// router.delete("/:id",verfierTokenAuthoriz, async(req,res)=>{
  
//     try {
//         await Cart.findByIdAndDelete(req.params.id)
//         res.status(200).json("Cart deleted successfuly");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     });


// module.exports = router

//CREATE

router.post("/", verfierToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verfierTokenAuthoriz, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verfierTokenAuthoriz, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verfierTokenAuthoriz, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verfierTokenAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;