<script>
import FlatWindow from "./FlatWindow.vue";

export default {
    components: {
        FlatWindow,
    },
    props: [
        "item",
        "selectedRooms",
        "filteredRooms",
        "sliderMinValue",
        "sliderMaxValue",
        "areaMinValue",
        "areaMaxValue",
    ],
    data() {
        return {};
    },
    mounted() {
        Fancybox.bind(`[data-fancybox=""]`, {});
    },
    methods: {
        mouseEnterFlat(event, flatItem, floorItem) {
            if (document.body.clientWidth > 1100) {
                this.$emit("openTooltip", event, flatItem);
            }
        },
        mouseLeaveFlat() {
            if (document.body.clientWidth > 1100) {
                this.$emit("closeTooltip");
            }
        },
        clickFlat(event, flatItem) {
            if (document.body.clientWidth < 1100) {
                this.$emit("openTooltipMobile", event, flatItem);
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
            } else if (
                (this.selectedRooms.length == 0 &&
                    this.sliderMinValue != null &&
                    this.item.newStatus == false) ||
                (this.sliderMaxValue != null && this.item.newStatus == false) ||
                (this.areaMinValue != null && this.item.newStatus == false) ||
                (this.areaMaxValue != null && this.item.newStatus == false)
            ) {
                // if (this.item.newStatus == false) {
                return "filter-blocked";
                // }
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
        :data-area="item.field_square"
        :data-price="item.field_price"
        :data-img="item.field_plan_image"
        ref="schemeItem"
        class="flat-list__room"
        :class="[
            addClass ? addClass : '',
            setBlockedClass ? setBlockedClass : '',
        ]"
        :href="`/flats/${item.field_number}`"
        @mouseenter="mouseEnterFlat($event, item)"
        @mouseleave="mouseLeaveFlat()"
        @click="clickFlat($event, item)">
        {{ item.newRoom }}
    </a>
    <!-- <a
        :data-area="item.field_square"
        :data-price="item.field_price"
        :data-img="item.field_plan_image"
        ref="schemeItem"
        class="flat-list__room"
        :class="[
            addClass ? addClass : '',
            setBlockedClass ? setBlockedClass : '',
        ]"
        :href="`./flats/${item.field_number}`">
        {{ item.newRoom }}
    </a> -->
</template>
<style></style>
