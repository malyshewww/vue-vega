<script>
import { Fancybox } from "@fancyapps/ui";
import FlatWindow from "./FlatWindow.vue";

export default {
    components: {
        FlatWindow,
    },
    props: ["item", "selectedRooms", "filteredRooms"],
    data() {
        return {};
    },
    mounted() {
        Fancybox.bind(`[data-fancybox=""]`, {});
    },
    methods: {
        mouseEnterFlat(event, flatItem, floorItem) {
            if (document.body.clientWidth > 1199) {
                this.$emit("openTooltip", event, flatItem);
            }
        },
        mouseLeaveFlat() {
            if (document.body.clientWidth > 1199) {
                this.$emit("closeTooltip");
            }
        },
    },
    watch: {},
    computed: {
        addClass() {
            switch (this.item.field_status) {
                case "Забронировано":
                    return "filter-blocked notAvailable";
                case "Продано":
                    return "filter-blocked soldOut";
                default:
                    return "";
            }
        },
        replaceExpansionImage() {
            let newImagePath = this.item.field_plan_image.replace(".png", "");
            return newImagePath;
        },
        blockedRooms() {
            let roomsCountStr = this.item.newRoom;
            return roomsCountStr;
        },
        setBlockedClass() {
            if (this.selectedRooms.length > 0) {
                if (
                    !this.selectedRooms.includes(this.blockedRooms) ||
                    this.item.newStatus == false
                ) {
                    return "filter-blocked";
                }
            } else if (this.selectedRooms.length == 0) {
                if (this.item.newStatus == false) {
                    return "filter-blocked";
                }
            } else {
                return "";
            }
            // if (this.selectedRooms.length && this.item.newStatus == false) {
            //     return "filter-blocked";
            // } else if (
            //     this.selectedRooms.length == 0 &&
            //     this.item.newStatus == false
            // ) {
            //     return "filter-blocked";
            // }
        },
    },
    mounted() {},
};
</script>
<template>
    <a
        class="flat-list__room"
        :class="[
            addClass ? addClass : '',
            setBlockedClass ? setBlockedClass : '',
        ]"
        :href="`./flats/${item.field_number}`"
        @mouseenter="mouseEnterFlat($event, item)"
        @mouseleave="mouseLeaveFlat()">
        {{ item.newRoom }}
    </a>
</template>
<style></style>
