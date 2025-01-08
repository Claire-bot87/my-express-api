// * ✨ Today's Goal -> Get familiar with CRUD in express 
// TODO update imports to modern ES6 ✅
// TODO moved data into its own file ✅
// TODO Add CRUD endpoints (get, post, put, delete), responding with JSON. ✅

import express from 'express'
// You can import your own files into each other.
import modesOfTransport from './data.js'

const app = express()

// ! 🚨 We need this line of code for posting JSON to express
app.use(express.json())

// When the client makes a request to /
app.get('/modesOfTransport', function(req, res) { // call this function
  res.send(modesOfTransport)
})

// :name -> parameter/variable in the path, called name
app.get('/modesOfTransport/:name', function(req, res) {
  console.log(req.params.name) // this gets the VALUE of that variable for this request.
  
  const modeOfTransportName = req.params.name

  const modeOfTransport = modesOfTransport.find((currentModeOfTransport) => {
    return currentModeOfTransport.name.toLowerCase() === modeOfTransportName.toLowerCase()
  })

  res.send(modeOfTransport)
})



app.post('/modeOfTransport', function(req, res) {
  // Get the new destination from the body of request
  const newModeOfTransport = req.body
  // Add destination to existing destinations
  modesOfTransport.push(newModeOfTransport)
  // Send back our destination with appropriate status code.
  res.status(201).send(newModeOfTransport)
})


app.put('/modesOfTransport/:id', function(req,res) {
const modeOfTransportId = Number(req.params.id)
const updateModesOfTransport = req.body
//replaceing the whole object in your put

//1)get the destination index to replace


const modeOfTransportIndex = modesOfTransport.findIndex((currentModeOfTransport) => {

    return currentModeOfTransport.id === modeOfTransportId
}
)

//2)override that object in the array
modesOfTransport[modeOfTransportIndex] = updateModesOfTransport

//res.status(200).send(updateModeOfTransport)

//3)send it back to the user
res.send(updateModesOfTransport)
})


app.delete('/modesofTransport/:id', function(req,res) {
    const modeOfTransportId = Number(req.params.id)
    //const updateDestination = req.body
    
    const modeOfTransportIndex = modesOfTransport.findIndex((modeOfTransport) => {
    
        return modeOfTransport.id === modeOfTransportId
    }
    )
console.log(modesOfTransport)
    modesOfTransport.splice(modeOfTransportIndex,1)
  res.sendStatus(204)
    })





// This makes it run on port 3000.
app.listen(3000, () => {
  console.log('Server is running on port 3000!')
})