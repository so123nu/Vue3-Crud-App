<template>
  <div class="wrapper">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Please login</h2>
      <input
        type="text"
        class="form-control"
        placeholder="Email Address"
        required=""
        autofocus=""
        v-model="formData.email"
      />
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        required=""
        v-model="formData.password"
      />

      <button class="btn btn-lg btn-primary btn-block">Login</button>
      <div class="mt-3 text-center">
        <a href="">Forgot Password</a>
      </div>
      <div class="mt-2 text-center">
        <a href="/">Register</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive, inject, onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import router from "../../../routes/route";

export default {
  setup() {
    // inject data from app.vue
    const url = `${inject("baseUrl")}/user/login`;
    const token = inject("token");

    //initiate form Data using reactive
    let isLoading = ref(false);
    let initialState = {
      email: "",
      password: "",
    };

    //create form Data using reactive and spread operator to reset form on submit
    let formData = reactive({ ...initialState });

    onMounted(() => {
      if (token) {
        //redirect to profile if token found
        router.push("/profile");
      }
    });

    function resetForm() {
      Object.assign(formData, initialState);
    }

    const headers = {
      "Content-Type": "application/json",
      cors: true,
    };

    async function login() {
      this.isLoading = true;
      await axios
        .post(url, formData, {
          headers: headers,
        })
        .then(function (response) {
          if (response.data.statuscode == 200) {
            createToast("Login Successful", { type: "success" });
            localStorage.setItem("token", response.data.data.token);
            router.push("/profile");
          }

          if (response.data.statuscode == 400) {
            createToast(`${response.data.msg}`, { type: "danger" });
          }
        });

      this.isLoading = false;
      resetForm();
    }

    return {
      formData,
      login,
      isLoading,
    };
  },
};
</script>


<style scoped>
body {
  background: #eee !important;
}

.wrapper {
  margin-top: 80px;
  margin-bottom: 80px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 30px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>