//* this program is responsible for adding (seeding) data to our database
//*for development purposes
import mongoose from "mongoose"
import ModeOfTransport from '../models/modeOfTransport.js'
import transport from '../data.js'


//? we definitely need a mongoose model (transport) to create our data in the db
//? we also need to use mongoose to connect to mongoDB
//? we need a data.js fiel to use to see our data

async function seed(){
    console.log('connecting to database🌱')

 await mongoose.connect('mongodb://127.0.0.1:27017/destinations-db')

//! this code wieipes the database clean:
// console.log('clearing the database)
// await mongoose.connection.db.dropDatabase()

 console.log('seed new destinations🌱')
const newModeOfTransport = await ModeOfTransport.create(transport)

console.log(newModeOfTransport)
console.log('bye!🌱')
await mongoose.disconnect()
}

seed()