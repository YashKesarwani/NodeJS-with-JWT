const mongoose=require("mongoose");
var movieSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    LeadRole: {
        type:String,
        required: true
    },
    Appearance: String,
    Image: String,
    Description: String
});

var Movie=mongoose.model("Movie",movieSchema);

