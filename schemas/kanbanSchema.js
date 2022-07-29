const mongoose = require('mongoose');

const kanbanSchema = new mongoose.Schema({
   userId: Number,
   taskList: { type: [mongoose.Schema.Types.ObjectId], ref: 'kanbanTaskSchema' }
})

module.exports = mongoose.model("kanban", kanbanSchema);