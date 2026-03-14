const mongoose = require('mongoose')

const connectToDb = async () => {
  // Encapsulated in a try catch error to capture any error during connection
  try {
    console.log('Relax, let us connect you to the DB.')
    console.log('Preparing connection to MongoDB. verifying credentials....')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDb Connected!! 😍😍')
 
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectToDb
