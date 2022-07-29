const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const kanbanModal = require('../modals/kanban');

var kanban = new kanbanModal();


router.get('/userlist', async (req, res) => {
   try {
      console.log(req.query.id);
      const userTaskList = await kanban.findByUserId(req.query.id);
      res.status(200).send(userTaskList);
   } catch (error) {
      res.status(400).send({ error: `bad request: ${error}` });
   }

})





router.post('/create', async (req, res) => {
   try {
      const newTask = await kanban.addKanban(req);
      res.status(200).send(newTask);
   } catch (error) {
      console.log(error);
      res.status(400).send({error:'Unable to find the resource'})
   }
})
router.delete('/delete/task', async (req, res) => {
   try {
      const newTask = await kanban.deleteKanbanTask(req);
      res.status(200).send(newTask);
   } catch (error) {
      console.log(error);
      res.status(400).send({error:'Unable to find the resource'})
   }
})

router.patch('/update/task', async (req, res) => {
   try {
      console.log('req.body',req.body);
      const response = await kanban.updateTaskStatus(req);
      res.status(200).send(response);
   } catch (error) {
      console.log(error);
      res.status(400).send({error:'Unable to find the resource'})
   }
});
router.patch('/downgrade/task', async (req, res) => {
   try {
      console.log('req.body',req.body);
      const response = await kanban.downgrageTaskStatus(req);
      res.status(200).send(response);
   } catch (error) {
      console.log(error);
      res.status(400).send({error:'Unable to find the resource'})
   }
});

module.exports = router;
