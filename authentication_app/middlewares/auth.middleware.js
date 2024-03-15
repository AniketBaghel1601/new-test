const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');

const auth = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try{
        const decoded = jwt.verify(token,"validation");
        if(decoded){
            const {userID} = decoded;
            const user = await userModel.findOne({_id : userID})
            if(user){
                const required_role = user.role;
                req.role = required_role; 
            next();
            }
            else{
                res.status(200).json({msg : "user not found"});
            }
        }
        else{
            res.status(200).json({msg : "you are not authorized"});
        }

    }catch(err){
        res.status(500).json({error : err});
    }
}

module.exports = {
    auth
}