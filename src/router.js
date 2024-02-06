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
        // name: "scheme",
        component: RoomScheme,
    },
    {
        path: "/list",
        alias: "/",
        // name: "list",
        component: RoomList,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
    // scrollBehavior(to, from, savedPostition) {
    //     return { top: 0 };
    // },
});
export default router;
