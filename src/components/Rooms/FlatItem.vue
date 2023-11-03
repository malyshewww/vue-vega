<script>
export default {
    props: [
        "item",
        "notAvailable",
        "soldOut",
        "selectedRooms",
        "slider",
        "mainRef",
        "openWindow",
        "removeWindow",
    ],
    data() {
        return {
            filterData: [],
        };
    },
    methods: {},
    computed: {
        normalizedPrice() {
            return this.item.field_price.replace("руб.", "").trim();
        },
        addClass() {
            switch (this.item.field_status) {
                case "Забронировано":
                    return this.notAvailable;
                case "Продано":
                    return this.soldOut;
                default:
                    return "";
            }
        },
        blockedRooms() {
            let separator = this.item.field_euro == "Да" ? "+" : "";
            let roomsCountStr = this.item.field_rooms_count + separator;
            return roomsCountStr;
        },
        setBlockedClass() {
            if (this.selectedRooms.length) {
                if (this.selectedRooms.includes(this.blockedRooms)) return;
                return "filter-blocked";
            }
        },
    },
    mounted() {
        // this.getRefs();
        // return this.refs;
    },
};
</script>
<template>
    <a
        :class="`flat-list__room ${addClass} ${setBlockedClass}`"
        :data-id="item.field_number"
        :href="`./flats/${item.field_number}`"
        :data-price="normalizedPrice"
        :data-area="item.field_square"
        :data-img="item.field_plan_image"
        :rooms="item.field_rooms_count"
        @mouseover="openWindow"
        @mouseout="removeWindow">
        {{ blockedRooms }}
    </a>
</template>
<style></style>
