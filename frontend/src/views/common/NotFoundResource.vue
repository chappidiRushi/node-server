<template>
  <h1>The {{resource}} you are looking for is not found.</h1>
  <router-link :to="{ name: 'home' }">Go Home</router-link>
</template>

<script>
export default {
  name: 'NotFoundResource',
  props: {
    resource: {
      type: String,
      required: true,
      default: 'Resource'
    }
  }
}
</script>

<style>
</style>