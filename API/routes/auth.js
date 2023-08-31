const router = require("express").Router();
const User = require("../models/User");
const CryptoJS =require("crypto-js");
//this package to make our website more seciure
const jwt =require("jsonwebtoken");


//register -> use post request cuz the user will send info
router.post("/register",async (req,res)=>{
    //how we're gonna use our model:
    const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString(),
    }
    );
    //how we re gonna send this to our db --> by using save method
    //a chaque fois t sayvi if i write only newUser.save()
    //so we must use async abd await func
    try{
        const saveUser = await newUser.save();
        //if there is a new user we send it to the client 
        res.status(201).json(saveUser)
 //sinon catch err
    }catch(err){
        res.status(500).json(err);
    }
   
});


// //LOGIN
// router.post("/login",async(req,res)=>{
// //find user inside our db
// try{
//     const user = await User.findOne({username:req.body.username});
//     !user && res.status(401).json("username not found")
//     //decrypting my password and turn it into string
//     const hashedpassword = CryptoJS.AES.decrypt(user.password, process.env.SEC_PASS);
//     const RealPassword =hashedpassword.toString(CryptoJS.enc.Utf8);
//     RealPassword !== req.body.password &&
//      res.status(401).json("wrong password ");
//      //generat an access token
//        const accessToken=jwt.sign({
//         id:user._id, //pilot
//         isAdmin:user.isAdmin, //pilot 
//        }, process.env.SEC_JWT, //secert key 
//        //after 1 days we"re not gonna able to use this access token in this case we should login again
//         {expiresIn:"24h"}
//        );
//      const{password , ...other}=user._doc;//car users stock in dossier wsmo doc
//     res.status(200).json({...other,accessToken});// hna rah ybe3t accesstoken li mgenere
//     //fih mcrypti fih l pilot lusername & isAdmin & secert key 
// }catch(err){
//     res.status(500).json(err);
// };
// }
// );
// module.exports = router;
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json("Username not found");
      }
  
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SEC_PASS
      );
      const realPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (realPassword !== req.body.password) {
        return res.status(401).json("Wrong password");
      }
  
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.SEC_JWT,
        { expiresIn: "24h" }
      );
  
      const { password, ...other } = user._doc;
      return res.status(200).json({ ...other, accessToken });
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  module.exports = router;
  