import express from 'express'
import ModeOfTransport from '../models/modeOfTransport.js'
import Comment from '../models/modeOfTransport.js';
const router = express.Router()




router.route('/transport/:id/comments').post(async function (req, res, next) {

    try {
        if (!req.session.user) {
            return res.status(402).send({ message: "you must be logged in to comment" })
        }
        req.body.user = req.session.user
        const modeOfTransportId = req.params.id
        const modeOfTransport = await ModeOfTransport.findById(modeOfTransportId)
        modeOfTransport.comments.push(req.body)
        await modeOfTransport.save()

        res.redirect('/transport')

    } catch (e) {
        next(e)
    }
})


router.route('/transport/:id').put(async function (req, res) {
    if (!req.session.user) {
        return res.status(402).send({ message: "you must be logged in to update a mode of transport" })
    }
    const modeOfTransportId = req.params.id

    const transport = await ModeOfTransport.findById(modeOfTransportId).populate('user')

    if (!transport.user._id.equals(req.session.user._id)) {
        return res.status(402).send({ message: "this is not your destination to update!" })
    }
    const updateModesOfTransport = await ModeOfTransport.findByIdAndUpdate(modeOfTransportId, req.body, { new: true })

    res.redirect('/transport')
})




router.route('/transport/:id/comments/:commentId').delete(async function (req, res) {
    if (!req.session.user) {
        return res.status(402).send({ message: "you must be logged in to delete a comment" })
    }
    const modeOfTransportId = req.params.id
    const transport = await ModeOfTransport.findById(modeOfTransportId)
  
    const commentId = req.params.commentId
    const commentToDelete = transport.comments.id(commentId)
    console.log(commentToDelete)


    const comment = await Comment.findById(commentId)
    // c
    //const transport = await ModeOfTransport.findById(modeOfTransportId).populate('user')

    // compare the user who is currently logged in (req.session.user)
    // with the user ON the transport (transport.user)
    // console.log(req.session.user._id)
    // console.log(transport.user._id)

    // if (!comment.user._id.equals(req.session.user._id)) {
    //   return res.status(402).send({ message: "this is not your comment to delete!"})
    // }
    if (!commentToDelete) {
        return res.send({ message: "comment doesn't exist." })
    }

    commentToDelete.deleteOne()
    await transport.save()
    // await Comment.findByIdAndDelete(commentId)
    res.redirect('/transport')
})





  router.route('/transport/:id/comments/:commentId/updateComment').get(async function(req, res, next) {
    try {
      const transport = await ModeOfTransport.findById(req.params.id).exec()
      res.render('transport/updateComment.ejs', {
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

      const transport = await ModeOfTransport.findById(modeOfTransportId)

      const commentId = req.params.commentId
    const commentToEdit = transport.comments.id(commentId)

      if (!transport.user._id.equals(req.session.user._id)) {
        return res.status(402).send({ message: "this is not your destination to update!"})
      }
      const updateComment = await commentToEdit.findByIdAndUpdate(modeOfTransportId, req.body, {new:true})
    
      res.redirect('/transport')
      })
      



export default router




