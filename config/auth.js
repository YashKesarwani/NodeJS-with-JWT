const jwt=require('jsonwebtoken');
module.exports=function(req,res,next) {
    // const token=req.header('auth-token');
    // const token=req.headers.Authorization;
    var token=req.signedCookies;
    token=token['Authentication'];
    console.log(token);
    if(!token){
        console.log('No token');
        return res.redirect('../users/Login');
    }
    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        // console.log('Verified');
        req.userData=verified;      
        return next(); 
    }catch(err){
         console.log('Not verified');
        return res.redirect('../users/Login');
    }
};