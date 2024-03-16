const express = require('express');
const mongoose = require('mongoose');
const {userModel} = require('../models/user.model')
const bcrypt = require('bcrypt');
const {auth} = require('../middlewares/auth.middleware')
const {access} = require('../middlewares/access.middleware')
const jwt = require('jsonwebtoken');
const userRoute = express.Router();

userRoute.post('/register',async(req,res)=>{
    const {name,email,password,role} = req.body;

    try{
        const user = await userModel.findOne({email});
        if(!user){
            bcrypt.hash(password, 5, async function(err, hash) {
                if(err){
                    res.status(500).json({error : err});
                }
                else{
                    const newUser = new userModel({name,email,password:hash,role})
                    await newUser.save();
                    res.status(200).json({msg : "new user registered"});
                }
            });
        }
        else{
            res.status(200).json({msg : "you are already registered please login"});
        }
    }catch(err){
        res.status(500).json({error : err});
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    
    try {
        const user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                   const token = jwt.sign({userID : user.id},"validation");
                    res.status(200).json({msg : "you are logged in",token});
                }
                else{
                    res.status(500).json({error : err});
                }
            });
        }
    } catch (error) {
        
    }


})

userRoute.get('/dashboard',auth,(req,res)=>{
    try {
        res.status(200).json({msg : "all users data"});
    } catch (error) {
        res.status(500).json({msg : "something went wrong"});
    }
})


userRoute.put('/replaceUser/:userId', auth, access(["admin"]), async (req, res) => {
    try {
        const userId = req.params.userId;
        const payload = req.body;
        const user = await userModel.findByIdAndUpdate(userId, payload, { new: true }); // Add { new: true } to return the updated document
        if (user) {
            res.status(200).json({ msg: "User replaced successfully", user });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



module.exports = {
    userRoute
}