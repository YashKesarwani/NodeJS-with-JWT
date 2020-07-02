const express=require('express');
const router=express.Router();
const verify=require('../config/auth');


// router.get('/',(req,res)=>{
//     res.render('welcome');
// });

router.get('/Dashboard',verify,(req,res)=>{
    res.render('dashboard',{
        name:"yash"
    });
});

module.exports=router;