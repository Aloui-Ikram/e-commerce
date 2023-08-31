const jwt = require("jsonwebtoken");
const verfierToken =(req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SEC_JWT, (err,user)=>{
            if (err) {
                res.status(403).json("Token is not valid!");
                   }
            req.user=user;
            next(); 
        });
    }else{
        return res.status(401).json("you are not authenticated!");
    }
};
//authoruzation determining what the user is allowed to do or access

const verfierTokenAuthoriz = (req, res, next) => {
    verfierToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

//for product and order only admin can add any product

const verfierTokenAdmin=(req,res,next)=>{
    verfierToken(req,res,()=>{
        if (req.user.isAdmin){
        //continue your route function 
        next();
        }else{
            res.status(403).json("you are not alowed to continue in this route!");
        }
    });
};
module.exports={verfierToken, verfierTokenAuthoriz,verfierTokenAdmin};