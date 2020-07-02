const Joi=require('@hapi/joi');

//Register 
const registerValid=(data)=>{
    const schema=Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).required(),
        password2: Joi.string().min(5).required().valid(Joi.ref('password')).error(errors=>{
            errors.forEach(err=>{
                switch(err.type){
                    case "any.empty": err.message="It is a required field";
                    break;
                    case "string.min": err.message="Minimumn 5 characters are required";
                    break;
                    default: err.message="Both passwords must match";
                    break;
                }
            });
            return errors;
        })
    });
    return schema.validate(data);
};


//Login
const loginValid=(data)=>{
    const logSchema=Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(5).required(),
        
    });
    return logSchema.validate(data);
};

module.exports.registerValid=registerValid;
module.exports.loginValid=loginValid;
