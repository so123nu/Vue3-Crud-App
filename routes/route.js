import { createWebHistory, createRouter } from "vue-router";
import LoginComponent from '../src/components/auth/LoginComponent';
import RegisterComponent from '../src/components/auth/RegisterComponent';
import ProfileComponent from '../src/components/views/ProfileComponent';

const routes = [
    {
        name: "Register",
        path: "/",
        component: RegisterComponent
    },
    {
        name: "Login",
        path: "/login",
        component: LoginComponent
    },
    {
        name: "Profile",
        path: "/profile",
        component: ProfileComponent
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;