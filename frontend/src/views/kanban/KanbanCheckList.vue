<template>
   <h1>task list check list {{id}} </h1>
</template>

<script>

export default {
   name:'KanbanCheckList',
   pageName: 'taskList',
   props: {
      taskId: String,
      id:String
   },
   data() {
      return {
         
      }
   },
   created() {

   },
   methods() {
      
   },
}

</script>
<style scoped>
</style>