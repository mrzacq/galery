<template>
  <div class="container all" style="display: flex;">
    <div class="container" style="margin-top: 80px">
      <img
        width="400"
        height="400"
        src="https://image.freepik.com/free-vector/login-concept-illustration_114360-757.jpg"
        alt="register first"
      />
    </div>
    <div class="container" style="margin: auto;">
      <h1
        style="text-align: center; margin-bottom: 20px; text-shadow: 2px 2px darkblue;"
      >
        Register First
      </h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Role</label>
          <select class="form-control" v-model="role">
            <option disabled selected value="">---Select role---</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>
        <div class="form-group">
          <p role="button" @click="toLogin()" style="color: blue">
            Already have an account?
          </p>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    return {
      email: '', password: '', role: ''
    }
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    register(){
      this.$store.dispatch('register', {email: this.email, password: this.password, role: this.role})
    }
  },
};
</script>

<style></style>
