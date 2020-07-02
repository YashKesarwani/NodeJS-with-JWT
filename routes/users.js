const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const router=express.Router();

const User=require('../models/UserModel');
const {registerValid,loginValid}=require('./validation');

router.get("/Login",async (req,res)=>{
    res.render("Login");
});

router.get("/Register",async (req,res)=>{
    res.render("Register");
});

router.post('/Register',async (req,res)=>{
    const {name,email,password,password2}=req.body;
    
    const {error} =registerValid(req.body);
    if (error){
        res.render('Register',{
            msg:error.details[0].message,
            name,   //ES6 style of sending data
            email,
            password,
            password2
        });  
    } 
    else{
        const emailExist=await User.findOne({email:email});
        if(emailExist)
            return res.render('Register',{
                msg:"Email already exists",
                name,
                email,
                password,
                password2
            });
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);

        const user=new User({
            name:name,
            email:email,
            password:hashPassword
        });
        try{
            const savedUser= await user.save();
            res.render('Login',{
                msg:"Successfully registered"
            });
        }catch(err){
            res.status(400).render('Register');
        }
    }
    

});


router.post('/Login',async (req,res)=>{
    const {email,password}=req.body;
    
    const {error} =loginValid(req.body);
    if (error){
        res.render('Login',{
            msg:error.details[0].message,
            email
        });  
    } 
    else{
        const exUser=await User.findOne({email:email});
        if(!exUser){
            return res.render('Login',{
                msg:"Email not registered",
                email
            });
        }
        const validPass=await bcrypt.compare(password,exUser.password);
        if(!validPass)  
            return res.render('Login',{
                msg:"Invalid Password",
                email
            }); 
        const token=jwt.sign({_id:exUser._id},process.env.TOKEN_SECRET,{expiresIn: '1800s'});
        userID=exUser._id;
        // console.log(token);
        // res.send(token);
        // res.header('Authorization',token);
        res.cookie('Authentication',token,{maxAge:240000,signed:true});
        res.redirect('../Dashboard');

    }
});

router.get('/Logout',async (req,res)=>{
    userID='undefined';
    res.clearCookie('Authentication');
    console.log('Cookie Cleared');
    res.redirect('Login');    
});


module.exports=router;
