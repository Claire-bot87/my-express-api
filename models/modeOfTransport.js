//* this file allows me to create a model for a particular collection
//* this is so all destinations(for example)are always consistent(have the same fields)

import mongoose from "mongoose";


// ? Creating an embedded schema
const commentSchema = new mongoose.Schema({
    content: {type: String},
    //content: {type: String, required: [true, "you can't post an empty Comment."]},
    //this is the user who posted the comment
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})


//* create a schema for my collection

const modeOfTransportSchema = new mongoose.Schema({
  
    type: {type: String, required:false},
    // name:{type: String, required: true},
    model:{type: String , required: false},
    name: {type: String, required:false},
    // adding arelationship between transport and user
    //? This is called a reference relationship
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    comments: [commentSchema]

})//export the schema as a model
//! the first arguemnt to the model MUST be a string pascalcase(uppercase words), singular



// Export both ModeOfTransport and Comment
export default mongoose.model('ModeOfTransport', modeOfTransportSchema)

const Comment = mongoose.model('Comment', commentSchema); // Defining the model
export { Comment }; 
// const ModeOfTransport = mongoose.model('ModeOfTransport', modeOfTransportSchema);

// export { ModeOfTransport, commentSchema as Comment };