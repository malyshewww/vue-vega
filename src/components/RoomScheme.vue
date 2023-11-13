<script>
import noUiSlider from "nouislider";
import axios from "axios";
import json from "../data.json";
import FlatItem from "./Rooms/FlatItem.vue";
import FlatWindow from "./Rooms/FlatWindow.vue";
import { ref, onMounted, onUnmounted } from "vue";
import NavigationBtn from "./NavigationBtn.vue";
const appData = {};
export default {
    components: {
        noUiSlider,
        FlatItem,
        NavigationBtn,
    },
    // provide() {
    //     return {
    //         todoLength: this.$refs.length,
    //     };
    // },
    data() {
        return {
            errors: [],
            res: [],
            isActive: false,
            allDone: false,
            xPos: "",
            yPos: "",
            info: json,
            arrPrices: [],
            arrSquare: [],
            newListRoom: [],
            updateListRoom: [],
            selectedRooms: [],
            floorNumber: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
            ],
            listRoomFirst: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            listCheckboxes: [
                {
                    value: "1",
                },
                {
                    value: "1+",
                },
                {
                    value: "2",
                },
                {
                    value: "2+",
                },
                {
                    value: "3",
                },
                {
                    value: "3+",
                },
            ],
            res: [],
            slider: {
                minRange: null,
                maxRange: null,
                startMin: 5000000,
                startMax: 13500000,
                step: 10000, // 10000
                min: 5000000,
                max: 13500000,
            },
            area: {
                minRange: null,
                maxRange: null,
                startMin: 35.95,
                startMax: 72.35,
                step: 0.1,
                min: 35.95,
                max: 72.35,
            },
            floor: {
                minRange: null,
                maxRange: null,
                startMin: 2,
                startMax: 15,
                step: 1,
                min: 2,
                max: 15,
            },
            flatWindow: document.querySelector(".flat-list__window"),
            filtered_rooms: [],
        };
    },
    methods: {
        openFilter() {
            this.isActive = true;
        },
        closeFilter() {
            this.isActive = false;
        },
        updateSlider() {
            this.$refs.slider_room.noUiSlider.on(
                "update",
                (e, values, handle) => {
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    if (!isNaN(min) && !isNaN(max)) {
                        // this[handle ? "maxRange" : "minRange"] = parseInt(values[handle]);
                        this.slider.minRange = new Intl.NumberFormat(
                            "ru-RU"
                        ).format(min);
                        this.slider.maxRange = new Intl.NumberFormat(
                            "ru-RU"
                        ).format(max);
                    }
                }
            );
            this.$refs.slider_area.noUiSlider.on(
                "update",
                (e, values, handle) => {
                    let min = e[0];
                    let max = e[1];
                    if (!isNaN(min) && !isNaN(max)) {
                        // this[handle ? "maxRange" : "minRange"] = parseInt(values[handle]);
                        this.area.minRange = min;
                        this.area.maxRange = max;
                    }
                }
            );
            this.$refs.slider_room.noUiSlider.on("change", (e) => {
                // if (this.filtered_rooms.length > 0) {
                //     this.filtered_rooms = [];
                // }
                let min = e[0];
                let max = e[1];
                if (this.selectedRooms.length === 0) {
                    this.newListRoom.map((item) => {
                        item.filter((f, i) => {
                            if (f.field_status == "В продаже") {
                                this.filtered_rooms.push(f);
                            }
                        });
                    });
                    this.filtered_rooms.filter(
                        (item) =>
                            min <= item.field_price && max <= item.field_price
                    );
                    console.log(this.filtered_rooms);
                    console.log(min, max);
                }
            });
        },
        updateMinPrice(arr) {
            let arrMinPrices = arr.flatMap((item, i) =>
                this.selectedRooms.includes(item.room) ? [item.price] : []
            );
            this.slider.minRange = arrMinPrices.length
                ? Math.min(...arrMinPrices)
                : this.slider.startMin;
        },
        updateMaxPrice(arr) {
            let arrMaxPrices = arr.flatMap((item, i) =>
                this.selectedRooms.includes(item.room) ? [item.price] : []
            );
            this.slider.maxRange = arrMaxPrices.length
                ? Math.max(...arrMaxPrices)
                : this.slider.startMax;
        },
        updateMinSquare(arr) {
            let arrMinSquare = arr.flatMap((item) =>
                this.selectedRooms.includes(item.room) ? [item.square] : []
            );
            this.area.minRange = arrMinSquare.length
                ? Math.min(...arrMinSquare)
                : this.area.startMin;
        },
        updateMaxSquare(arr) {
            let arrMaxSquare = arr.flatMap((item) =>
                this.selectedRooms.includes(item.room) ? [item.square] : []
            );
            this.area.maxRange = arrMaxSquare.length
                ? Math.max(...arrMaxSquare)
                : this.area.startMax;
        },
        setNewSliderValues() {
            this.$refs.slider_room.noUiSlider.set([
                this.slider.minRange,
                this.slider.maxRange,
            ]);
            this.$refs.slider_area.noUiSlider.set([
                this.area.minRange,
                this.area.maxRange,
            ]);
        },
        updateScheme(e) {
            console.log(e.target.value);
            this.newListRoom.map((item) => {
                item.filter((f, i) => {
                    if (
                        e.target.value == f.field_euro &&
                        f.field_status == "В продаже"
                    ) {
                        this.updateMinPrice(this.arrPrices, e.target);
                        this.updateMaxPrice(this.arrPrices, e.target);
                        this.updateMinSquare(this.arrSquare);
                        this.updateMaxSquare(this.arrSquare);
                        this.setNewSliderValues();
                        if (e.target.checked) {
                            this.updateListRoom.push(f);
                            this.arrPrices.push({
                                id: f.field_number,
                                price: f.field_price,
                                room: f.field_euro,
                            });
                            this.arrSquare.push({
                                id: f.field_number,
                                square: f.field_square,
                                room: f.field_euro,
                            });
                        } else {
                            this.updateListRoom.splice(
                                this.updateListRoom.indexOf(i),
                                1
                            );
                        }
                    }
                });
            });
            console.log(this.updateListRoom);
            // console.log(this.selectedRooms);
            // console.log(this.arrPrices);
        },
        getPartArray() {
            let size = 9; // размер подмассива
            for (let i = 0; i < Math.ceil(this.info.length / size); i++) {
                this.newListRoom[i] = this.info.slice(
                    i * size,
                    i * size + size
                );
            }
            this.newListRoom.forEach((item, i) => {
                item.map((elem) => {
                    elem.field_price = elem.field_price
                        .replace("руб.", "")
                        .trim();
                    if (
                        elem.field_rooms_count == "1" &&
                        elem.field_euro == "Да"
                    ) {
                        elem.field_euro = "1+";
                    } else if (
                        elem.field_rooms_count == "2" &&
                        elem.field_euro == "Да"
                    ) {
                        elem.field_euro = "2+";
                    } else if (
                        elem.field_rooms_count == "3" &&
                        elem.field_euro == "Да"
                    ) {
                        elem.field_euro = "3+";
                    } else if (elem.field_euro == "Нет") {
                        elem.field_euro = elem.field_rooms_count;
                    }
                });
            });
            console.log(this.newListRoom);
        },
        setRefs() {
            return this.$refs;
        },
        getFilteredPeople() {
            let prices = [];
            // if (this.checked) {
            //     prices = this.peoples.filter((f) => f.age > 20);
            // } else {
            //     peoples = this.peoples;
            // }
            // return peoples.filter((p) =>
            //     p.name.toLowerCase().includes(this.search.toLowerCase())
            // );
        },
    },
    computed: {},
    watch: {
        addBodyClass: {
            immediate: true,
            handler(val) {
                document.body.classList.toggle("not-front", val);
            },
        },
        checked(value) {
            this.filtered_prices = this.getFilteredPrices();
        },
    },
    mounted() {
        noUiSlider.create(this.$refs.slider_room, {
            start: [this.slider.startMin, this.slider.startMax],
            step: this.slider.step,
            connect: true,
            // tooltips: true,
            range: {
                min: this.slider.min,
                max: this.slider.max,
            },
        });
        noUiSlider.create(this.$refs.slider_area, {
            start: [this.area.startMin, this.area.startMax],
            step: this.area.step,
            connect: true,
            // tooltips: true,
            range: {
                min: this.area.min,
                max: this.area.max,
            },
        });
        this.updateSlider();
        // this.updateScheme();
        this.setRefs();
        // this.getPartArray();
    },
    // async created() {
    //     try {
    //         const response = await axios.get(
    //             "https://xn--80addhdy.xn--p1ai/rest"
    //         );
    //         this.res = response.data;
    //     } catch (e) {
    //         this.errors.push(e);
    //     }
    // },
    beforeMount() {
        this.getPartArray();
    },
};
</script>
<template>
    <div class="flat-list">
        <div class="container">
            <div class="flat-list__body">
                <div class="flat-list__wrapper">
                    <div class="flat-list__scheme">
                        <div class="flat-list__floor first">
                            <div class="flat-list__number">1</div>
                            <div class="flat-list__rooms">
                                <div v-for="(room, i) in listRoomFirst">
                                    <a href="#" class="flat-list__room"></a>
                                </div>
                            </div>
                        </div>
                        <div v-for="(el, idx) in newListRoom">
                            <div class="flat-list__floor">
                                <div class="flat-list__number">
                                    {{ idx + 2 }}
                                </div>
                                <div class="flat-list__rooms">
                                    <FlatItem
                                        v-for="(item, index) in el"
                                        :item="item"
                                        :key="item.field_number"
                                        :selectedRooms="selectedRooms" />
                                </div>
                                <div class="flat-list__plan">
                                    <a
                                        class="flat-list__link"
                                        href="img/flat/img2.png"
                                        :data-fancybox="`plan-floor-${
                                            idx + 1
                                        }`">
                                        план этажа
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flat-list__wrapper-second">
                    <div class="main-sale">
                        <div class="main-sale__filter">
                            <NavigationBtn></NavigationBtn>
                            <button
                                class="main-sale__filter-btn btn"
                                @click="openFilter()">
                                фильтр
                            </button>
                            <div
                                class="main-sale__filter-wrap"
                                :class="{ open: isActive }">
                                <div class="wrapper-top">
                                    <div
                                        class="wrapper-close main-sale__filter-close"
                                        @click="closeFilter()"></div>
                                    <h3 class="wrapper-title">Фильтр</h3>
                                </div>
                                <div class="main-sale__filter-form-wrap">
                                    <form action="#">
                                        <div class="main-sale__filter-top">
                                            <fieldset
                                                class="main-sale__filter-rooms">
                                                <legend>
                                                    Количество комнат
                                                </legend>
                                                <ul>
                                                    <li
                                                        v-for="(
                                                            checkbox, idx
                                                        ) in listCheckboxes">
                                                        <input
                                                            :id="`rooms-${idx}`"
                                                            type="checkbox"
                                                            :value="
                                                                checkbox.value
                                                            "
                                                            @change="
                                                                updateScheme
                                                            "
                                                            v-model="
                                                                selectedRooms
                                                            "
                                                            name="field_rooms_count[]" />
                                                        <label
                                                            :for="`rooms-${idx}`"
                                                            >{{
                                                                checkbox.value
                                                            }}</label
                                                        >
                                                    </li>
                                                </ul>
                                            </fieldset>
                                            <fieldset
                                                class="main-sale__filter-price">
                                                <legend>
                                                    Количество комнат
                                                </legend>
                                                <div class="filter-slider">
                                                    <div
                                                        class="filter-slider-top">
                                                        <span
                                                            class="filter-slider-from"
                                                            >от
                                                            <input
                                                                class="filter-slider-from-value"
                                                                v-model="
                                                                    slider.minRange
                                                                "
                                                                :readonly="
                                                                    true
                                                                " />
                                                        </span>
                                                        <span
                                                            class="filter-slider-to"
                                                            >до
                                                            <input
                                                                class="filter-slider-to-value"
                                                                v-model="
                                                                    slider.maxRange
                                                                "
                                                                :readonly="
                                                                    true
                                                                " />
                                                        </span>
                                                    </div>
                                                    <div
                                                        class="filter-slider-line"
                                                        ref="slider_room"
                                                        id="slider_room" />
                                                </div>
                                            </fieldset>
                                            <fieldset
                                                class="main-sale__filter-area">
                                                <legend>
                                                    Площадь квартиры (м²)
                                                </legend>
                                                <div class="filter-slider">
                                                    <div
                                                        class="filter-slider-top">
                                                        <span
                                                            class="filter-slider-from"
                                                            >от
                                                            <input
                                                                class="filter-slider-from-value"
                                                                v-model="
                                                                    area.minRange
                                                                " />
                                                        </span>
                                                        <span
                                                            class="filter-slider-to"
                                                            >до<input
                                                                class="filter-slider-to-value"
                                                                v-model="
                                                                    area.maxRange
                                                                " />
                                                        </span>
                                                    </div>
                                                    <div
                                                        class="filter-slider-line"
                                                        ref="slider_area"
                                                        id="slider_area"></div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <!-- <div class="main-sale__filter-bottom">
                                            <fieldset
                                                class="main-sale__filter-params">
                                                <legend>
                                                    Дополнительные параметры
                                                </legend>
                                                <ul
                                                    class="main-sale__filter-params-list">
                                                    <li>
                                                        <input
                                                            id="params-loggia"
                                                            type="radio"
                                                            name="params"
                                                            value="loggia" />
                                                        <label
                                                            for="params-loggia"
                                                            >лоджия</label
                                                        >
                                                    </li>
                                                    <li>
                                                        <input
                                                            id="params-balcony"
                                                            type="radio"
                                                            name="params"
                                                            value="balcony" />
                                                        <label
                                                            for="params-balcony"
                                                            >французский
                                                            балкон</label
                                                        >
                                                    </li>
                                                </ul>
                                            </fieldset>
                                        </div> -->
                                    </form>
                                </div>
                                <div class="main-sale__filter-submit">
                                    <div class="btn">
                                        посмотреть предложения
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div class="flat-list__room"></div>
                            <span>Квартира в продаже</span>
                        </li>
                        <li>
                            <div class="flat-list__room notAvailable"></div>
                            <span>Забронирована</span>
                        </li>
                        <li>
                            <div class="flat-list__room soldOut"></div>
                            <span>Продана </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
