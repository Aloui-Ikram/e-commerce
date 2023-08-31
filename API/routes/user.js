const router =require("express").Router();
const CryptoJS =require("crypto-js");
const {verfierToken ,verfierTokenAuthoriz ,verfierTokenAdmin }=require("./verifierToken")
const User = require("../models/User");


//update 
router.put("/:id", async(req,res)=>{

    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.SEC_PASS
            ).toString();
    }
    try {
        //alert(req.params.id);
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    });
    
//get user
//in this case i m not the admin its dosnt allow to me to continue in the route 
//apres when i update the doc and edit isAdmin from flse to true its give me the user
//actullay i copied the access yoken from admin and put it in token when i try to get
//one user
router.get("/find/:id",verfierTokenAdmin, async(req,res)=>{
  
    try {
       const user= await User.findById(req.params.id)
      console
       const{password , ...other}=user._doc;
       res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
    });
//get all user

router.get("/",verfierTokenAdmin, async(req,res)=>{
   const query=req.query.new //q=query

    try {
        //if there is a query new=true alors yaffichi the latest 5 user
        const users =query ? await User.find().sort({_id:-1}).limit(5) :await User.find();
       res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    });
//delete
router.delete("/:id",verfierTokenAuthoriz, async(req,res)=>{
  
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted successfuly");
      } catch (err) {
        res.status(500).json(err);
      }
    });
//========================its  work===========================
    //get user stat 
    router.post("/stat", verfierTokenAdmin, async (req,res)=>{
      //number of the user like in augost 3 user , in september 10 user
      const date = new Date();
      // its gonna return last year
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); 
      try{
           //mongodb aggregate```group my items
           
        const data = await User.aggregate([
          //cond grater than last year
          { $match: { createdAt: { $gte: lastYear } } },
          {
            //Win ykon l mois f creat at ndih wn7to f $month
            $project:{
               month:{$month:"$createdAt"},
            
            },
          },
          //hna l month & chhal mn user
          { $group: {
              _id:"$month",
              total:{ $sum :1},
           },
          }
        ]);
        // send our data
        res.status(200).json(data)
      }catch(err){
        res.status(400).json(err);
      }


    });


module.exports = router