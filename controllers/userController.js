//* This fil is where all our logic lives for modesOfTransport.
//* All  the endpoints/routes lives here

// TODO use a router to refactor our routes here.
import express from 'express'
import User from '../models/user.js'
const router = express.Router()  

//this is to sign up a new user:
router.route('/auth/signup').post(async function (req, res, next) {
    try {
      console.log(req.body)
   
      // Create the document in the database
      const newUser = await User.create(req.body)
      // Send back our destination with appropriate status code.
      res.redirect('/login')
    } catch (e) {
      next(e)
    }
  })


  //this is also to sign up a new user
  router.route('/user/new').get(async function(req, res, next) {
    try {
      res.render('user/newuser.ejs')
    } catch (e) {
      next(e)
    }
  })




  //todo login
//login page
//GET login controller to return ejs page
//POST /login controller to handle posting the login 
//when you sign up redirect to login 

router.get('/auth/login', (req,res,next) => {
  try {
      res.render("user/login.ejs");
  } catch(e){
      next(e)
  }
  
})

router.post('/auth/login', async (req,res,next) => {

try{

const user = await User.findOne({email: req.body.email})
console.log(user)
if(!user.isPasswordValid(req.body.password)){
  return res.status(401).send({message:"Unauthorised"})
}

req.session.user = user // adds the user to the current session
res.send({message: "Login succesful"})
}
catch(e){
  next(e)
}
})



export default router