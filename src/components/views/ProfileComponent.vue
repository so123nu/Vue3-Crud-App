<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-4 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            class="rounded-circle mt-5"
            width="150px"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          /><span class="font-weight-bold">Edogaru</span
          ><span class="text-black-50">edogaru@mail.com.my</span><span> </span>
        </div>
      </div>
      <div class="col-md-8 border-right">
        <div class="p-3">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Profile Settings</h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label class="labels">First Name</label
              ><input
                type="text"
                class="form-control"
                placeholder="first name"
                :value="profileData.first_name"
              />
            </div>
            <div class="col-md-6">
              <label class="labels">Last Name</label
              ><input
                type="text"
                class="form-control"
                :value="profileData.last_name"
                placeholder="surname"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6">
              <label class="labels">Mobile Number</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter phone number"
                :value="profileData.phone_number"
              />
            </div>
            <div class="col-md-6">
              <label class="labels">Country</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter address line 2"
                :value="profileData.country"
              />
            </div>
            <div class="col-md-6 mt-3">
              <label class="labels">Email ID</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter email id"
                :value="profileData.email"
              />
            </div>
            <div class="col-md-6 mt-3">
              <label class="labels">Gender</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter email id"
                :value="profileData.gender"
              />
            </div>
            <div class="col-md-6 mt-3">
              <label class="labels">Date Of Birth</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter email id"
                :value="profileData.date_of_birth"
              />
            </div>
            <div class="col-md-6 mt-3">
              <label class="labels">Language</label
              ><input
                type="text"
                class="form-control"
                placeholder="enter email id"
                :value="profileData.language"
              />
            </div>
          </div>
        </div>

        <div class="mt-2 text-center">
          <button class="btn btn-primary profile-button" type="button">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, inject, onMounted } from "vue";
// import { createToast } from "mosha-vue-toastify";
// import "mosha-vue-toastify/dist/style.css";
import router from "../../../routes/route";
import axios from "axios";

export default {
  setup() {
    const profileUrl = `${inject("baseUrl")}/user/details`;
    const token = inject("token");

    let initialState = {
      first_name: "",
      last_name: "",
      email: "",
      country: "",
      gender: "",
      language: "",
      date_of_birth: "",
      phone_number: "",
    };

    const profileData = reactive({ ...initialState });

    onMounted(() => {
      if (!token) {
        router.push("/login");
      }

      getProfileData();
    });

    async function getProfileData() {
      const headers = {
        "Content-Type": "application/json",
        cors: true,
        Authorization: `Bearer ${token}`,
      };

      await axios
        .get(profileUrl, {
          headers: headers,
        })
        .then(function (response) {
          if (response.data.statuscode == 200) {
            profileData.first_name = response.data.data.user_details.first_name;
            profileData.last_name = response.data.data.user_details.last_name;
            profileData.gender = response.data.data.user_details.gender;
            profileData.date_of_birth =
              response.data.data.user_details.date_of_birth;
            profileData.phone_number =
              response.data.data.user_details.phone_number;
            profileData.language =
              response.data.data.user_details.preffered_language;
            profileData.email = response.data.data.user_details.email;
            profileData.country = response.data.data.user_details.country;
          }
        });
    }

    return {
      profileData,
    };
  },
};
</script>


<style scoped>
body {
  background: rgb(99, 39, 120);
}

.form-control:focus {
  box-shadow: none;
  border-color: #ba68c8;
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none;
}

.profile-button:hover {
  background: #682773;
}

.profile-button:focus {
  background: #682773;
  box-shadow: none;
}

.profile-button:active {
  background: #682773;
  box-shadow: none;
}

.back:hover {
  color: #682773;
  cursor: pointer;
}

.labels {
  font-size: 11px;
}

.add-experience:hover {
  background: #ba68c8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #ba68c8;
}
</style>