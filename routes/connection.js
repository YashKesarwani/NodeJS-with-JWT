const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    if(err)
        console.log(err);
    else    
        console.log("Connected to the database");
});




