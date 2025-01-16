//* this program is responsible for adding (seeding) data to our database
//*for development purposes
import mongoose from "mongoose"
import ModeOfTransport from '../models/modeOfTransport.js'
import User from '../models/user.js'
import transport from '../data.js'


//? we definitely need a mongoose model (transport) to create our data in the db
//? we also need to use mongoose to connect to mongoDB
//? we need a data.js fiel to use to see our data

async function seed(){
    console.log('connecting to database🌱')

 await mongoose.connect('mongodb://127.0.0.1:27017/modesOfTransport-db')

//! this code wieipes the database clean:
console.log('clearing the database')
await mongoose.connection.db.dropDatabase()



//we now need to make sure all transport have a user field set.
//? let's seed a user first , and then use that user for our transport

const user = await User.create({
    username: "Claire Elizabeth Tosse",
    email: "clb5791@gmail.com",
    password: "NewPassword1"
})
//add the user to our transport
transport.forEach((transport) => {
    // add the user to this destination
    transport.user = user
})

 console.log('seed new destinations🌱')
const newModeOfTransport = await ModeOfTransport.create(transport)

console.log(newModeOfTransport)

//add a comment to my first transport
const comment = {
    content: "It's not great",
    user:user
}

newModeOfTransport[0].comments.push(comment)

await newModeOfTransport[0].save()

console.log('bye!🌱')
await mongoose.disconnect()
}

seed()