import axios from "axios";
const baseUrl = (process.env.VUE_APP_IS_DEVELOPMENT === "true") ? process.env.VUE_APP_API_BASE_URL : process.env.BASE_URL;
console.log('baseUrl',baseUrl,process.env);
console.log('rocess.env.VUE_APP_API_BASE_URL',process.env.VUE_APP_API_BASE_URL);
// const baseUrl = 'http://petserver-env.eba-9ynsuw6v.ap-south-1.elasticbeanstalk.com/'
const api = axios.create({
   baseURL: baseUrl,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   }
})

export default {
   getKanbanList(userID) {
      return api.get(`kanban/userlist?id=${userID}`);
   },
   saveNewTask(task) {
      return api.post("kanban/create", task);
   },
   downgradeKanbanTask(downgradeData) {
      return api.patch('/kanban/downgrade/task', JSON.stringify(downgradeData))
   },

   updateKanbanTask(patchData) {
      return api.patch(`kanban/update/task`, JSON.stringify(patchData));
   },

   deleteKanbanTask(deleteData) {
      console.log(deleteData);
      return api.delete(`kanban/delete/task`, {
         data: JSON.stringify(deleteData)
      })
   },
}