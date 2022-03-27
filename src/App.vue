<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <img class="navbar-brand" src="./assets/logo.png" id="navbar_brand" />
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!token">
            <router-link class="nav-link" to="/">Register</router-link>
          </li>
          <li class="nav-item" v-if="!token">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item active" v-if="token">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
          <li class="nav-item" v-if="token">
            <router-link class="nav-link" to="" @click="logout"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view> </router-view>
</template>

<script>
import { provide } from "vue";
export default {
  name: "App",
  components: {},
  setup() {
    provide("baseUrl", "http://localhost:8000/api");
    const token = localStorage.getItem("token");
    provide("token", token);
    // console.log(token);

    function logout() {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return {
      token,
      logout,
    };
  },
};
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

#navbar_brand {
  height: 50px;
}
</style>
