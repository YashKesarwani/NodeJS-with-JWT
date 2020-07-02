const express=require('express');
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const cookieParser=require('cookie-parser');
const app=express();

//app.use('/public',express.static(path.join(__dirname,'static')));

const conn=require('./routes/connection');
var Movie=require('./models/MovieModel');
//var User=require('./models/UserModel');



// var movieSchema=mongoose.Schema({
//     title: String,
//     LeadRole: String,
//     Appearance: String,
//     Image: String
// });

// var Movie=mongoose.model("Movie",movieSchema);


//Global variable
global.userID=undefined;

//Setting default folder
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({extended:true}));

//Cookie Parser
app.use(cookieParser('Secret'));

app.use(fileUpload());

app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render('index');
});

app.get("/About",(req,res)=>{
    res.render("About");
});

app.use('/',require('./routes'));
app.use('/users',require('./routes/users'));

var Movie=require('./routes/MovieDetails');
app.use(Movie);


/**The below route is used at last and it says that if there is no such route then it will run */
app.get("*",(req,res)=>{
    res.status(404).send("This route doesn't exist");
});

const PORT=process.env.PORT||3000;
app.listen(PORT,console.log(`Server online on ${PORT}`));


/**cat-me */