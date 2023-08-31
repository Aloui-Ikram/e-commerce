const router =require("express").Router();
const {verfierToken ,verfierTokenAuthoriz ,verfierTokenAdmin }=require("./verifierToken")
const Product = require("../models/Product");

//CREAT A NEW PRODUCT ONLY ADMIN CAN DO THIS
router.post('/',verfierTokenAdmin , async(req,res)=>{
    //lproduct li yhto ladmin nhto fla base de donnee
    const newProduct = new Product(req.body);
    try{
      const saveProduct = await newProduct.save();
      res.status(200).json(saveProduct)
    }catch(err){
        res.status(500).json(err)
    }
})

//update 
router.put("/:id", verfierTokenAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get Product
//everybody can see product
router.get("/find/:id", async(req,res)=>{
  
    try {
       const product = await Product.findById(req.params.id)
       res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
    });
    

//get all products
//everybody can see all product no need to verfiy token 
router.get("/", async(req,res)=>{
   const qnew =req.query.new ;
   const qCateg =req.query.category ;

    try {

      
        let products;

        if(qnew){
            products =await Product.find().sort({createdAt : -1}).limit(1);
        }else if(qCateg){
            products = await Product.find({
                //find l categories li dakhel l arry
                categories:{
                    $in :[qCateg],
                },
            });
        }else {
            //sinon affichier all product
            products = await Product.find();
        }
        res.status(200).json(products)
      }
      
      
      catch (err) {
        res.status(500).json(err);
      }
    });

//delete
router.delete("/:id",verfierTokenAdmin, async(req,res)=>{
  
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product deleted successfuly");
      } catch (err) {
        res.status(500).json(err);
      }
    });


module.exports = router