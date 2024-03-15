const access = (requiredRole)=>{
    return (req,res,next)=>{
         if(requiredRole.includes(req.role)){
             next();
         }
         else{
             res.status(200).json({msg : "you are not authorized"});
         }
     }
 }
 
 module.exports = {
     access
 }