//* This fil is where all our logic lives for modesOfTransport.
//* All  the endpoints/routes lives here

// TODO use a router to refactor our routes here.
import express from 'express'
import ModeOfTransport from '../models/modeOfTransport.js'
const router = express.Router()  




router.route('/').get(async function(req, res, next){
    try{
        res.render('home.ejs')
    }catch(e) {
        next(e)
    }
})


router.route('/transport').post(async function (req, res, next) {
    try {
      console.log(req.body)
   if(!req.session.user){
    return res.status(402).send({message: "you must be logged in to save a mode of transport"})
   }

req.body.user = req.session.user

      // Create the document in the database
      const newModeOfTransport = await ModeOfTransport.create(req.body)
      // Send back our destination with appropriate status code.
      res.redirect('/transport')
    } catch (e) {
      next(e)
    }
  })
  

  router.route('/transport/new').get(async function(req, res, next) {
    try {
      res.render('transport/new.ejs')
    } catch (e) {
      next(e)
    }
  })


// router.route('/modesOfTransport').post(async function (req,res){
  
// // create the document in the database
// const newModeOfTransport = await ModeOfTransport.create(req.body)
// //send back our destination with appropriate status code
// res.status(201).send(newModeOfTransport)
// })

router.route('/transport').get(async function (req, res, next) {
    try{
        const allModesOfTransport = await ModeOfTransport.find()

        // populate the user field
        const allTransports = await ModeOfTransport.find().populate('user')
console.log(allTransports)

        res.render('transport/index.ejs', {
            allModesOfTransport: allModesOfTransport
        })
    }catch(e) {
        next(e)
    }   })




router.route('/transport/:id').get(async function (req, res, next) {
    try {
        const modeOfTransportId = req.params.id;
        const modeOfTransport = await ModeOfTransport.findById(modeOfTransportId);
        res.render('transport/show.ejs', {
            transport: modeOfTransport // Assuming you meant modeOfTransport here
        });
    } catch (e) {
        next(e);
    }
});

// router.route('/modesOfTransport').get(async function(req, res) { // call this function
//     const allModesOfTransport = await ModeOfTransport.find()
//     res.send(allModesOfTransport)
// })

router.route('/modesOfTransport/:name').get(async function(req, res) {
      const modeOfTransport = await ModeOfTransport.findOne({ name: { $regex: new RegExp(`^${req.params.name}$`, 'i')}})
      const modeOfTransportName = req.params.name
      res.send(modeOfTransport)
    }
    
)



router.route('/transport/:id').delete(async function (req, res) {
  if(!req.session.user){
    return res.status(402).send({message: "you must be logged in to delete a mode of transport"})
   }
    const modeOfTransportId = req.params.id
  
   // const transport = await ModeOfTransport.findById(modeOfTransportId)
    const transport = await ModeOfTransport.findById(modeOfTransportId).populate('user')

    // compare the user who is currently logged in (req.session.user)
    // with the user ON the transport (transport.user)
// console.log(req.session.user._id)
// console.log(transport.user._id)

if (!transport.user._id.equals(req.session.user._id)) {
  return res.status(402).send({ message: "this is not your destination to delete!"})
}
    if (!transport) {
      return res.send({ message: "Transport doesn't exist." })
    }
    await ModeOfTransport.findByIdAndDelete(modeOfTransportId)
    res.redirect('/transport')
  })




  router.route('/transport/update/:id').get(async function(req, res, next) {
    try {
      const transport = await ModeOfTransport.findById(req.params.id).exec()
      res.render('transport/update.ejs', {
        transport: transport
      })
    } catch(e) {
      next(e)
    }
  })


router.route('/transport/:id').put(async function (req, res) {
  if(!req.session.user){
    return res.status(402).send({message: "you must be logged in to update a mode of transport"})
   }
      const modeOfTransportId = req.params.id

      const transport = await ModeOfTransport.findById(modeOfTransportId).populate('user')

      if (!transport.user._id.equals(req.session.user._id)) {
        return res.status(402).send({ message: "this is not your destination to update!"})
      }
      const updateModesOfTransport = await ModeOfTransport.findByIdAndUpdate(modeOfTransportId, req.body, {new:true})
    
      res.redirect('/transport')
      })
      

// router.route('/transport/:id').delete(async function(req, res){
//     const transportId = req.params.id
//         const transport = await ModeOfTransport.findById(transportId)
//         //const updateDestination = req.body
//         if(!transport) {
//           return res.send({message: "Transport doesn't exist."})
//         }
        
//         await ModeOfTransport.findByIdAndDelete(transportId)
    
//       res.redirect('/transport')
// })





export default router