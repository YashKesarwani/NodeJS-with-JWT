const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const Movie=mongoose.model('Movie');

router.get("/Movies",(req,res)=>{
   
    //Retrieving data from database
    Movie.find({},(err,data)=>{
        if(err)
            console.log("Error"+err);
        else
        {
            res.render("Movies",{
                movies:data
            });        
        }        
    });    
});


router.get("/Details/:id",(req,res)=>{
    var id=req.params.id;

    Movie.findById(id,(err,data)=>{
        if(err) console.log("Error occurred"+err);
        else{
            res.render("Details",{
                title:data.title,
                LeadRole: data.LeadRole,
                Description: data.Description
            });
        }
    });

});




router.get("/Details/Edit/:id",(req,res)=>{
    var id=req.params.id;
    Movie.findById(id,(err,data)=>{
        if(err) console.log("Error occurred"+err);
        else{
            res.render("Edit",{
                id: data.id,
                title:data.title,
                LeadRole: data.LeadRole,
                Appearance: data.Appearance
            });
        }
    });
});


router.get("/Details/Delete/:id",(req,res)=>{
    var id=req.params.id;

    Movie.findByIdAndDelete(id,(err)=>{
        if(err) console.log("Deletion Failed"+err);
        else{
            console.log("Deletion Successful");
            res.redirect("/Movies");
        }
    });
});


router.get("/AddMovie",(req,res)=>{
    res.render("AddMovie");
});

router.post("/AddMovie",(req,res)=>{
    var data=req.body;

    /** Uploading image file and moving it to the desired location
     * req.files is similar to the req.body, once we have required the express-fileuploads
     * and set the fileupload() to be used, we can get all the details of file using req.files
    */
    var imgFile=req.files.imgFile;
    imgFile.mv("public/images/"+imgFile.name,(err)=>{
        if(err) console.log("Couldn't upload file"+err);
        else    console.log("File Uploaded successfully");
    });

    //Creating a document in the collection.
    Movie.create({
            "title":data.name,
            "LeadRole":data.role,
            "Appearance":data.appear,
            "Image":imgFile.name,
            "Description":data.desc},(err,data)=>{
            if(err)
                console.log("Error found"+err);
            else
                console.log("Data added"+data);        
    });
    res.redirect("/Movies");    
});


router.post("/Update/:id",(req,res)=>{
    var id=req.params.id;
    var data=req.body;
    Movie.findByIdAndUpdate(id,{
        "title":data.name,
        "LeadRole":data.role,
        "Appearance":data.appear,
    },(err,updData)=>{
        if(err) console.log("Couldn't upadate movie"+err);
        else{
            console.log("Updated Movie"+updData);
            res.redirect("/Movies");
        }    
    });
    
});


module.exports=router;