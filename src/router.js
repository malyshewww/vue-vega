import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
import RoomScheme from "./components/RoomScheme.vue";
import RoomList from "./components/RoomList.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/scheme",
            component: RoomScheme,
            alias: "/",
        },
        {
            path: "/list",
            component: RoomList,
            alias: "/",
        },
    ],
});
