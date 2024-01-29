<script>
export default {
    methods: {
        // checkRoutePath() {
        //     if (this.$route.path == "/list")
        // }
    },
};
</script>
<template>
    <div class="main-sale__btns">
        <router-link
            v-slot="{ isActive, href, navigate }"
            class="main-sale__btn-scheme btn"
            :class="isActive"
            :active-class="'router-link-active'"
            to="/scheme">
            <span>на схеме</span>
        </router-link>
        <router-link
            v-slot="{ isActive, href, navigate }"
            class="main-sale__btn-list btn"
            :active-class="'router-link-active'"
            to="/list">
            <span>списком</span>
        </router-link>
    </div>
</template>
