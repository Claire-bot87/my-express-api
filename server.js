// * ✨ Today's Goal -> Get familiar with CRUD in express 
// TODO update imports to modern ES6 ✅
// TODO moved data into its own file ✅
// TODO Add CRUD endpoints (get, post, put, delete), responding with JSON. ✅

import express from 'express'
// You can import your own files into each other.
import modesOfTransport from './data.js'
//* import mongoose
import mongoose from 'mongoose'
//* importing my modesOfTransport model
 import ModeOfTransport from './models/modeOfTransport.js'

 import User from './models/user.js'

 import modeOfTransportController from './controllers/modeOfTransportController.js'

 import userController from './controllers/userController.js'

import methodOverride from 'method-override'
//const methodOverride = require('method-override')

import session from 'express-session'

import mongoSanitize from 'express-mongo-sanitize'

// import dotenv to extract environment variables from the .env file
import dotenv from 'dotenv'
dotenv.config() // initalises .env

const app = express()

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized:true,
  cookie:{
    secure:false, //i sthis using https?
    httoOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  }
}))

// ! 🚨 We need this line of code for posting JSON to express
app.use(express.json())

app.use(mongoSanitize())

app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

//app.use(logger)

app.use('/', modeOfTransportController)

app.use('/', userController)




// app.get('/modesOfTransport', async function(req, res) { // call this function
//   const allModesOfTransport = await ModeOfTransport.find()
//   res.send(allModesOfTransport)
// })





// // When the client makes a request to /
// app.get('/modesOfTransport', function(req, res) { // call this function
//   res.send(modesOfTransport)
// })







// app.get('/modesOfTransport/:name', async function(req, res) {
//   console.log(req.params.name) // this gets the VALUE of that variable for this request.
  
//   const modeOfTransport = await ModeOfTransport.findOne({ name: { $regex: new RegExp(`^${req.params.name}$`, 'i')}})
//   const modeOfTransportName = req.params.name
//   res.send(modeOfTransport)
// })













// // :name -> parameter/variable in the path, called name
// app.get('/modesOfTransport/:name', function(req, res) {
//   console.log(req.params.name) // this gets the VALUE of that variable for this request.
  
//   const modeOfTransportName = req.params.name

//   const modeOfTransport = modesOfTransport.find((currentModeOfTransport) => {
//     return currentModeOfTransport.name.toLowerCase() === modeOfTransportName.toLowerCase()
//   })

//   res.send(modeOfTransport)
// })



// app.post('/modeOfTransport', async function(req, res) {
//   // Get the new destination from the body of request
//   const newModeOfTransport = await ModeOfTransport.create(req.body)
//   // Send back our destination with appropriate status code.
//   res.status(201).send(newModeOfTransport)
// })



// app.put('/modesOfTransport/:id', async function(req,res) {
//   const modeOfTransportId = req.params.id
//   const updateModesOfTransport = await ModeOfTransport.findByIdAndUpdate(modeOfTransportId, req.body, {new:true})

//   res.send(updateModesOfTransport)
//   })
  


// app.put('/modesOfTransport/:id', async function(req, res) {
//   const modeOfTransportId = req.params.id;

//   // Check if the provided ID is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(modeOfTransportId)) {
//     return res.status(400).send({ error: 'Invalid ObjectId' });
//   }

//   try {
//     const updateModesOfTransport = await ModeOfTransport.findByIdAndUpdate(modeOfTransportId, req.body, { new: true });

//     if (!updateModesOfTransport) {
//       return res.status(404).send({ error: 'Mode of transport not found' });
//     }

//     res.send(updateModesOfTransport);
//   } catch (error) {
//     res.status(500).send({ error: 'Something went wrong' });
//   }
// });





// app.put('/modesOfTransport/:id', function(req,res) {
// const modeOfTransportId = Number(req.params.id)
// const updateModesOfTransport = req.body
// //replaceing the whole object in your put

// //1)get the destination index to replace


// const modeOfTransportIndex = modesOfTransport.findIndex((currentModeOfTransport) => {

//     return currentModeOfTransport.id === modeOfTransportId
// })
// //2)override that object in the array
// modesOfTransport[modeOfTransportIndex] = updateModesOfTransport
// //res.status(200).send(updateModeOfTransport)
// //3)send it back to the user
// res.send(updateModesOfTransport)
// })








// app.delete('/modesofTransport/:id', async function(req,res) {
//     const modeOfTransportId = req.params.id
//     const modeOfTransport = await ModeOfTransport.findById(modeOfTransportId)
//     //const updateDestination = req.body
//     if(!modeOfTransport) {
//       return res.send({message: "Destination doesn't exist."})
//     }
    
//     await ModeOfTransport.findByIdAndDelete(modeOfTransportId)

//   res.sendStatus(204)
//     })











// app.delete('/modesofTransport/:id', function(req,res) {
//     const modeOfTransportId = Number(req.params.id)
//     //const updateDestination = req.body
    
//     const modeOfTransportIndex = modesOfTransport.findIndex((modeOfTransport) => {
    
//         return modeOfTransport.id === modeOfTransportId
//     }
//     )
// console.log(modesOfTransport)
//     modesOfTransport.splice(modeOfTransportIndex,1)
//   res.sendStatus(204)
//     })





// This makes it run on port 3000.
app.listen(3000, () => {
  console.log('Server is running on port 3000!')
})


//this will connect to our database usingmongoose
const url = 'mongodb://127.0.0.1:27017/'
//mongoose.connect('mongodb://127.0.0.1:27017/destinations-db')
const dbname = 'modesOfTransport-db'
mongoose.connect(`${url}${dbname}`)