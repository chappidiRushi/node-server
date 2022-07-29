
// const devices = require('../schemas/devices');
const { parse } = require('dotenv');
const kanbanSchema = require('../schemas/kanbanSchema');
const kanbanTaskSchema = require('../schemas/kanbanTaskSchema');

class kanbanModal {

   constructor() {
   }


   async findByUserId(id) {
      return await kanbanSchema.findOne({ userId: parseInt(id) }).populate('taskList')
   }



   async updateTaskStatus(req) {
      console.log("updateing is in progrss");
      const updateData = req.body;
      var userId = updateData.userId;
      var taskId = updateData.taskId;
      await kanbanTaskSchema.findOneAndUpdate({ userId: userId, '_id': taskId }, {
         $set: {
            state: req.body.state + 1
         }
      });
      return await this.findByUserId(userId);;
   }

   async downgrageTaskStatus(req) {
      const updateData = req.body;
      var userId = updateData.userId;
      var taskId = updateData.taskId;
      await kanbanTaskSchema.findOneAndUpdate({ userId: userId, '_id': taskId }, {
         $set: {
            state: req.body.state - 1
         }
      });
      return await this.findByUserId(userId);;
   }
   async deleteKanbanTask(req) {
      const updateData = req.body;
      var userId = parseInt(updateData.userId);
      var taskId = updateData.taskId;

      await kanbanTaskSchema.findOneAndDelete({
         'userId': userId,
         '_id': taskId
      })
      return await this.findByUserId(userId);
   }

   async isUserExist(userId) {
      const users = await this.findByUserId(userId);
      console.log('users', users);

      if (users) return true;
      return false
   }


   async addKanban(req) {
      const task = req.body;
      const isUserExist = await this.isUserExist(task.userId);
      const newTask = new kanbanTaskSchema({
         title: task.title,
         description: task.description,
         state: task.state,
         userId: parseInt(task.userId)
      })
      await newTask.save();
      if (isUserExist) {
         await kanbanSchema.findOneAndUpdate(
            { userId: parseInt(task.userId) },
            { $push: { taskList: newTask } }
         )
         return await this.findByUserId(task.userId);
      }

      var kanban = new kanbanSchema({
         userId: task.userId,
         taskList: newTask
      });
      await kanban.save();
      return await this.findByUserId(task.userId);
   }
}
module.exports = kanbanModal;