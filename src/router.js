import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
import RoomScheme from "./components/RoomScheme.vue";
import RoomList from "./components/RoomList.vue";

const routes = [
    {
        path: "/",
        name: "scheme",
        component: RoomScheme,
    },
    {
        path: "/list",
        name: "list",
        component: RoomList,
    },
];
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    // scrollBehavior(to, from, savedPostition) {
    //     return { top: 0 };
    // },
});
export default router;
