<script>
import FlatWindow from "./FlatWindow.vue";
export default {
    components: {
        FlatWindow,
    },
    props: ["item", "selectedRooms", "filteredRooms"],
    data() {
        return {
            roomsWindow: document.querySelector(".flat-list__window"),
            isInfoWindowVisible: false,
            stylesWindow: {
                xPos: 0,
                yPos: 0,
                transform: null,
            },
        };
    },
    methods: {
        showWindow(e) {
            let target = e.target;
            let left = target.getBoundingClientRect().left;
            let top = target.getBoundingClientRect().top;
            this.stylesWindow.xPos = `${left}px`;
            this.stylesWindow.yPos = `${top}px`;
            this.stylesWindow.transform = `translate(-43%, -110%)`;
            this.isInfoWindowVisible = !this.isInfoWindowVisible;
            // console.log("show window");
        },
        hideWindow() {
            this.isInfoWindowVisible = !this.isInfoWindowVisible;
            // console.log("hide window");
        },
    },
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
        blockedRooms() {
            let roomsCountStr = this.item.field_euro;
            return roomsCountStr;
        },
        setBlockedClass() {
            if (this.selectedRooms.length) {
                if (this.selectedRooms.includes(this.blockedRooms)) return;
                return "filter-blocked";
            }
            if (
                this.selectedRooms.length &&
                this.item.newStatus == "no-active"
            ) {
                return "filter-blocked";
            }
        },
        replaceExpansionImage() {
            let newImagePath = this.item.field_plan_image.replace(".png", "");
            return newImagePath;
        },
        setStyleObject() {
            let styleObject = {
                left: this.stylesWindow.xPos,
                top: this.stylesWindow.yPos,
                transform: this.stylesWindow.transform,
            };
            return styleObject;
        },
    },
    mounted() {
        // this.setStyleObject();
    },
};
</script>
<template>
    <FlatWindow
        :class="{ active: isInfoWindowVisible }"
        v-if="isInfoWindowVisible"
        :style="setStyleObject">
        <div class="flat-list__minImg">
            <!-- <picture>
                <source
                    :srcset="`${replaceExpansionImage}.webp`"
                    type="image/webp" />
                <img :src="`${replaceExpansionImage}.png`" alt="" />
            </picture> -->
        </div>
        <div class="flat-list__info">
            <span class="inf"
                >{{ item.field_rooms_count }}-комнатная
                {{ item.field_square }} м²</span
            ><span class="price">{{ item.field_price }} руб.</span>
        </div>
    </FlatWindow>
    <a
        class="flat-list__room"
        :class="[
            addClass ? addClass : '',
            setBlockedClass ? setBlockedClass : '',
        ]"
        :data-id="item.field_number"
        :href="`./flats/${item.field_number}`"
        :data-price="item.field_price"
        :data-area="item.field_square"
        :data-img="item.field_plan_image"
        :rooms="item.field_rooms_count"
        @mouseenter="showWindow"
        @mouseleave="hideWindow">
        {{ item.field_euro }}
    </a>
</template>
<style></style>
