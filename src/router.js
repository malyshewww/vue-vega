import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
import RoomScheme from "./components/RoomScheme.vue";
import RoomList from "./components/RoomList.vue";

const routes = [
    {
        path: "/scheme",
        alias: "/",
        component: RoomScheme,
    },
    {
        path: "/list",
        alias: "/",
        component: RoomList,
    },
];
const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPostition) {
        return { top: 0 };
    },
});
export default router;
