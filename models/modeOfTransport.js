//* this file allows me to create a model for a particular collection
//* this is so all destinations(for example)are always consistent(have the same fields)

import mongoose from "mongoose";

//* create a schema for my collection

const modeOfTransportSchema = new mongoose.Schema({
    id:{type: Number, required:true},
    type: {type: String, required:true},
    name:{type: String, required: true},
    model:{type: String , required: true}

})//export the schema as a model
//! the first arguemnt to the model MUST be a string pascalcase(uppercase words), singular
export default mongoose.Model('ModeOfTransport', modeOfTransportSchema)
