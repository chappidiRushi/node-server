<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  googleLink: "https://google.com",
  props: {
    msg: String,
    description: String,

  },
  data() {
    return {
      googleLink: "https://www.google.com",
      clickCount: 0,
      isTrue: true,
      loopme: [
        {
          name: "name1",
          id: 1,
          age: "23",
          description: "just some description"
        },
        {
          name: "name2",
          id: 2,
          age: "24",
          description: "just some description"
        },
        {
          name: "name3",
          id: 3,
          age: "43",
          description: "just some description"
        }
      ],
      count: 0
    }
  },
  methods: {
    logEvent(event) {
      console.log(event);
      this.clickCount += 1;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.bold {
  font-weight: bold;
}
</style>
