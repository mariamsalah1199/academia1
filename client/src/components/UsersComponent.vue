<template>
  <div class="container">
    <h1>Welcome</h1>
    <div><b>Email</b> <input type="text" v-model="emailreg" /></div>
    <div><b>Password</b><input type="password" v-model="passwordreg" /></div>
    <b> Username </b><input type="text" v-model="usernamereg" />
    <div><button v-on:click="register">Sign up</button></div>
    <div class="login">
      <div><b>Email</b> <input type="text" v-model="email" /></div>
      <div><b>Password</b><input type="password" v-model="password" /></div>
      <div><button v-on:click="login">login</button></div>
    </div>
  </div>
</template>

<script>
import userservice from "../userservice";

export default {
  name: "UsersComponent",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      error: "null",
      emailreg: "",
      passwordreg: "",
      usernamereg: ""
    };
  },

  methods: {
    async register() {
      await userservice.register(
        this.emailreg,
        this.passwordreg,
        this.usernamereg
      );
    },
    async login() {
      await userservice.login(this.email, this.password);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

div.login {
  position: relative;
  /* border: 1px solid #5bd658; */
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
</style>
