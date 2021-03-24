const mongoose = require('mongoose')

const messageCountSchema = mongoose.Schema({
  // The user ID
  _id: {
    type: String,
    required: true,
  },

  // How many messages they have sent
  messageCount: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('message-counts', messageCountSchema)

//--bot.js--

 
const messagecount = require('./mongo/message-counter') //用戶數據

messagecount(client) //用戶數據