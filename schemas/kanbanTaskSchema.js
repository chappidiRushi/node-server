const mongoose = require('mongoose');
const kanbanTaskSchema = mongoose.Schema({
   title: String,
   description: String,
   state: Number,
   userId: Number
});
module.exports = mongoose.model("kanbanTaskSchema", kanbanTaskSchema)