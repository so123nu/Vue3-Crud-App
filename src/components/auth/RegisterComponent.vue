<template>
  <div class="wrapper">
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">Please Register</h2>
      <input
        type="text"
        class="form-control"
        placeholder="First Name"
        required=""
        autofocus=""
        v-model="formData.first_name"
      />
      <input
        type="text"
        class="form-control"
        placeholder="Last Name"
        required=""
        autofocus=""
        v-model="formData.last_name"
      />
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

      <div class="register_btn">
        <button
          class="btn btn-lg btn-primary btn-block register_btn"
          :class="{ hide: this.isLoading }"
          :disabled="this.isLoading"
        >
          Register
        </button>
        <img
          v-if="isLoading"
          alt="Vue logo"
          src="../../assets/spinner.jpg"
          class="loader"
        />
      </div>

      <div class="mt-3 text-center">
        <a href="/login">Login</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, ref, inject, onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import router from "../../../routes/route";

export default {
  components: {},
  setup() {
    const url = `${inject("baseUrl")}/user/register`;
    const token = inject("token");
    let isLoading = ref(false);

    let initialState = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
    const formData = reactive({ ...initialState });

    onMounted(() => {
      if (token) {
        router.push("/profile");
      }
    });

    function resetForm() {
      Object.assign(formData, initialState);
    }

    async function register() {
      this.isLoading = true;

      const headers = {
        "Content-Type": "application/json",
        cors: true,
      };

      await axios
        .post(url, formData, {
          headers: headers,
        })
        .then(function (response) {
          if (response.data.statuscode == 200) {
            resetForm();
            createToast("Registration Successful", { type: "success" });
          }

          if (response.data.statuscode == 400) {
            createToast(`${response.data.msg}`, { type: "error" });
          }
        });

      this.isLoading = false;
    }

    return {
      formData,
      register,
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
.register_btn {
  position: relative;
}
.hide {
  opacity: 0.2;
}
.loader {
  height: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
}
</style>