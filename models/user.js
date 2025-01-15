//* this file allows me to create a model for a particular collection
//* this is so all destinations(for example)are always consistent(have the same fields)

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator';


//* create a schema for my collection

const userSchema = new mongoose.Schema({
  
    username: {type: String, required: true, unique: true},
    // name:{type: String, required: true},
    email:
    {
        type: String ,
        required: true, 
        unique: true,
        validate:{
        validator: validator.isEmail,
        message:"please enter a valid email"
        }
    },
    password: {type: String, required:true}

})//export the schema as a model
//! the first arguemnt to the model MUST be a string pascalcase(uppercase words), singular





//*before teh user doc is created, we want to replace the passwor dwith a hashed version
//* mongoose has a lifecyc;e for each doc, this one runs before saving the doc to the database




userSchema.pre('save', function(next){
//"this" refers to the doc you're about to save
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next() //this tells mongoose we're done
})


userSchema.methods.isPasswordValid = function(plaintextPassword){

    return bcrypt.compareSync(plaintextPassword, this.password)
}





export default mongoose.model('User', userSchema)