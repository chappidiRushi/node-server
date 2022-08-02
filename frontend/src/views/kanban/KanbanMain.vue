<template>
  <div class=" h-screen w-screen bg-slate-300">
    <div class=" text-3xl py-2 text-left shadow-md">Kanban Board</div>

    <div>
      <form action="javascript:void(0)" class="flex justify-evenly py-4 shadow-md mb-3">
        <input v-model="taskName" type="text" class=" w-2/6 p-1 rounded-sm pl-3" name="taskname" placeholder="Task Name"
          id="taskName">
        <input v-model="taskDescription" type="text" class=" w-2/6 p-1 rounded-sm pl-3 " name="TaskDescription"
          placeholder="Task Description" id="taskDescription">
        <button @click="SaveTask(userId)" type="submit" class="text-white  bg-slate-600 px-3">Create</button>
      </form>
    </div>

    <div class="flex justify-evenly">
      <div class="w-[22%] bg-white border-solid border-2 rounded-md">
        <div class=" text-2xl py-2 shadow-md h-10">Backlog</div>
        <div class="h-96 overflow-y-scroll">
          <div class="" v-for="task of taskList" v-bind:key="task._id">
            <div class="w-full pt-4 flex px-3 text-xl" v-if="task.state === 0">
              <div class="flex-grow">{{ task.title }}</div>
              <i class="fa fa-trash text-red-600 pr-2 cursor-pointer" @click="deleteTask(task._id, userId)"></i>
              <i @click="updateTask(task._id, userId, task.state)" class="fa fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="w-[22%] bg-white border-solid border-2 rounded-md">
        <div class=" text-2xl py-2 shadow-md h-10">ToDo</div>
        <div class="h-96 overflow-y-scroll">
          <div class="" v-for="task of taskList" v-bind:key="task._id">
            <div class="w-full pt-4 flex px-3 text-xl" v-if="task.state === 1">
              <i @click="downgradeTask(task._id, userId, task.state)" class="fa fa-arrow-left cursor-pointer"></i>
              <div class="flex-grow">{{ task.title }}</div>
              <i class="fa fa-trash text-red-600 pr-2 cursor-pointer" @click="deleteTask(task._id, userId)"></i>
              <i @click="updateTask(task._id, userId, task.state)" class="fa fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="w-[22%] bg-white border-solid border-2 rounded-md">
        <div class=" text-2xl py-2 shadow-md h-10">On Going</div>
        <div class="h-96 overflow-y-scroll">
          <div class="" v-for="task of taskList" v-bind:key="task._id">
            <div class="w-full pt-4 flex px-3 text-xl" v-if="task.state === 2">
              <i @click="downgradeTask(task._id, userId, task.state)" class="fa fa-arrow-left cursor-pointer"></i>
              <div class="flex-grow">{{ task.title }}</div>
              <i class="fa fa-trash text-red-600 pr-2 cursor-pointer" @click="deleteTask(task._id, userId)"></i>
              <i @click="updateTask(task._id, userId, task.state)" class="fa fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="w-[22%] bg-white border-solid border-2 rounded-md">
        <div class=" text-2xl py-2 shadow-md h-10">Done</div>
        <div class="h-96 overflow-y-scroll">
          <div class="" v-for="task of taskList" v-bind:key="task._id">
            <div class="w-full pt-4 flex px-3 text-xl" v-if="task.state === 3">
              <i @click="downgradeTask(task._id, userId, task.state)" class="fa fa-arrow-left cursor-pointer"></i>
              <div class="flex-grow">{{ task.title }}</div>
              <i class="fa fa-trash text-red-600 pr-2 cursor-pointer" @click="deleteTask(task._id, userId)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import requestService from '../../services/requestService.js'
import { watchEffect } from "vue";

export default {
  name: 'KanbanMain',
  taskList: [],
  taskName: "",
  taskDescription: "",
  userId: 1,
  props: ['id', 'age', 'pageNo'],
  data() {
    return {
      taskList: [],
      taskName: "",
      userId: this.$props.id,
      pageno: this.$props.pageNo
    }
  },
  created() {
    watchEffect(() => {
      console.log(this.pageno);
    })
    requestService.getKanbanList(this.userId).then(res => {
      this.taskList = res.data?.taskList;
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
    sendAlert() {
      // this.pageno += 1
    },
    async SaveTask(userId) {
      var flags = []
      if (!this.taskName) flags.push("Please Enter Task Name")
      if (!this.taskDescription) flags.push("Please Enter Task Description");
      if (flags.length) {
        alert(flags.join("\n"));
        return;
      }
      var newTask = {
        title: this.taskName,
        description: this.taskDescription,
        state: 0,
        userId: userId
      }
      requestService.saveNewTask(newTask).then(res => {
        this.taskList = res.data.taskList;
        this.taskName = "";
        this.taskDescription = "";
      })
    },
    updateTask(taskId, userId, state) {
      let patchData = {
        taskId: taskId,
        userId: userId,
        state: state
      }
      requestService.updateKanbanTask(patchData).then(res => {
        this.taskList = res.data?.taskList;
      }).catch(error => {
        console.log(error);
      })
    },

    downgradeTask(taskId, userId, state) {
      let deleteData = {
        taskId: taskId,
        userId: userId,
        state: state
      }
      requestService.downgradeKanbanTask(deleteData).then(res => {
        this.taskList = res.data?.taskList;
      }).catch(error => {
        console.log(error);
      })
    },

    deleteTask(taskId, userId) {

      let deleteData = {
        taskId: taskId,
        userId: userId
      }
      requestService.deleteKanbanTask(deleteData).then(res => {
        this.taskList = res.data?.taskList;
      }).catch(error => {
        console.log(error);
      })
    }
  },
}
</script>

<style>
</style>