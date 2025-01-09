//* This fil is where all our logic lives for modesOfTransport.
//* All  the endpoints/routes lives here

// TODO use a router to refactor our routes here.
import express from 'express'
import ModeOfTransport from '../models/modeOfTransport.js'
const router = express.Router()



router.route('/modesOfTransport').post(async function (req,res){
// create the document in the database
const newModeOfTransport = await ModeOfTransport.create(req.body)
//send back our destination with appropriate status code
res.status(201).send(newModeOfTransport)
})




router.route('/modesOfTransport').get(async function(req, res) { // call this function
    const allModesOfTransport = await ModeOfTransport.find()
    res.send(allModesOfTransport)
})

router.route('/modesOfTransport/:name').get(async function(req, res) {
      const modeOfTransport = await ModeOfTransport.findOne({ name: { $regex: new RegExp(`^${req.params.name}$`, 'i')}})
      const modeOfTransportName = req.params.name
      res.send(modeOfTransport)
    }
    
)


router.route('/modesOfTransport/:id').put(async function (req, res) {
      const modeOfTransportId = req.params.id
      const updateModesOfTransport = await ModeOfTransport.findByIdAndUpdate(modeOfTransportId, req.body, {new:true})
    
      res.send(updateModesOfTransport)
      })
      

router.route('/modesofTransport/:id').delete(async function(req, res){
    const modeOfTransportId = req.params.id
        const modeOfTransport = await ModeOfTransport.findById(modeOfTransportId)
        //const updateDestination = req.body
        if(!modeOfTransport) {
          return res.send({message: "Destination doesn't exist."})
        }
        
        await ModeOfTransport.findByIdAndDelete(modeOfTransportId)
    
      res.sendStatus(204)
})

export default router