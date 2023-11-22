<script>
import noUiSlider from "nouislider";
import axios from "axios";
import json from "../data.json";
import FlatItem from "./Rooms/FlatItem.vue";
// import FlatWindow from "./Rooms/FlatWindow.vue";
// import { ref, onMounted, onUnmounted } from "vue";
import NavigationBtn from "./NavigationBtn.vue";
import {
    initRange,
    checkboxObj,
    updateSliderRoom,
    updateSliderArea,
    updateSquareRange,
    setNewValue,
} from "../helpers/utils.js";
// Подключение компонента с чекбоксами
import FieldRooms from "./FieldRooms.vue";
export default {
    components: {
        noUiSlider,
        FlatItem,
        NavigationBtn,
        FieldRooms,
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
            listCheckboxes: checkboxObj,
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
        // События для nouislider (update, change) для обновления данных
        updateSlider() {
            updateSliderRoom(this.$refs.slider_room, this.slider);
            updateSliderArea(this.$refs.slider_area, this.area);
            this.$refs.slider_room.noUiSlider.on("change", (e) => {
                this.filtered_rooms = [];
                let arrTest = [];
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.newListRoom.map((item) => {
                    item.map((f, i) => {
                        if (f.field_status == "В продаже") {
                            if (
                                +f.field_price >= min &&
                                +f.field_price <= max
                            ) {
                                this.filtered_rooms.push(f);
                                f.newStatus = true;
                            } else {
                                f.newStatus = false;
                            }
                        }
                    });
                });
                // console.log(this.newListRoom);
                // console.log(this.filtered_rooms);
                updateSquareRange(this.filtered_rooms, this.area);
                setNewValue(this.$refs.slider_area, this.area);
                this.watchRange(this.newListRoom, min, max);
            });
            this.$refs.slider_area.noUiSlider.on("change", (e) => {
                this.filtered_rooms = [];
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.newListRoom.filter((item) => {
                    item.map((f, i) => {
                        if (f.field_status == "В продаже") {
                            if (
                                +f.field_square >= min &&
                                +f.field_square <= max
                            ) {
                                f.newStatus = true;
                                this.filtered_rooms.push(f);
                            } else {
                                f.newStatus = false;
                            }
                        }
                    });
                });
                this.updateRoomRange(this.filtered_rooms);
                setNewValue(this.$refs.slider_room, this.slider);
                console.log(this.newListRoom);
            });
        },
        watchRange(arr, min, max) {
            if (arr.length && this.selectedRooms.length > 0) {
                arr.map((item) => {
                    item.map((f, i) => {
                        if (f.field_status == "В продаже") {
                            if (
                                +f.field_price >= min &&
                                +f.field_price <= max
                            ) {
                                console.log(f);
                                f.newStatus = true;
                                // this.filtered_rooms.push(f);
                            } else {
                                f.newStatus = false;
                            }
                        }
                    });
                });
            } else {
            }
        },
        // Обновление range количества комнат при change slider_area
        updateRoomRange(arr) {
            let accPrices = [];
            if (arr.length) {
                arr.forEach((item) => {
                    accPrices.push(item.field_price);
                });
                this.slider.minRange = accPrices.length
                    ? Math.min(...accPrices)
                    : this.slider.startMin;
                this.slider.maxRange = accPrices.length
                    ? Math.max(...accPrices)
                    : this.slider.startMax;
            } else {
                this.selectedRooms = [];
            }
        },
        updateMinPrice(arr) {
            let arrMinPrices = arr.flatMap((item, i) =>
                this.selectedRooms.includes(item.room) ? [item.price] : []
            );
            this.slider.minRange = arrMinPrices.length
                ? Math.min(...arrMinPrices)
                : this.slider.startMin;
            this.newListRoom.filter((item) => {
                item.map((f, i) => {
                    if (f.field_status == "В продаже") {
                        if (+f.field_price >= this.slider.minRange) {
                            f.newStatus = true;
                        } else {
                            f.newStatus = false;
                        }
                    }
                });
            });
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
            let minValueRoom = this.selectedRooms.length
                ? this.slider.minRange
                : this.slider.startMin;
            let maxValueRoom = this.selectedRooms.length
                ? this.slider.maxRange
                : this.slider.startMax;
            let minValueArea = this.selectedRooms.length
                ? this.area.minRange
                : this.area.startMin;
            let maxValueArea = this.selectedRooms.length
                ? this.area.maxRange
                : this.area.startMax;
            this.$refs.slider_room.noUiSlider.set([minValueRoom, maxValueRoom]);
            this.$refs.slider_area.noUiSlider.set([minValueArea, maxValueArea]);
        },
        // Обновление слайдеров при клике на чекбоксы
        updateScheme(target) {
            console.log(target.value);
            this.newListRoom.map((item) => {
                item.filter((f, i) => {
                    if (
                        target.value == f.newRoom &&
                        f.field_status == "В продаже"
                    ) {
                        this.updateMinPrice(this.arrPrices);
                        this.updateMaxPrice(this.arrPrices);
                        this.updateMinSquare(this.arrSquare);
                        this.updateMaxSquare(this.arrSquare);

                        this.setNewSliderValues();
                        if (target.checked) {
                            this.updateListRoom.push(f);
                            this.arrPrices.push({
                                id: f.field_number,
                                price: f.field_price,
                                room: f.newRoom,
                            });
                            this.arrSquare.push({
                                id: f.field_number,
                                square: f.field_square,
                                room: f.newRoom,
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
        },
        getPartArray() {
            let size = 9; // размер подмассива
            for (let i = 0; i < Math.ceil(this.info.length / size); i++) {
                this.newListRoom[i] = this.info.slice(
                    i * size,
                    i * size + size
                );
            }
            this.newListRoom.map((item, i) => {
                item.map((elem) => {
                    elem.field_price = elem.field_price
                        .replace("руб.", "")
                        .trim();
                    if (
                        elem.field_rooms_count == "1" &&
                        elem.field_euro == "Да"
                    ) {
                        elem.newRoom = "1+";
                    } else if (
                        elem.field_rooms_count == "2" &&
                        elem.field_euro == "Да"
                    ) {
                        elem.newRoom = "2+";
                    } else if (
                        elem.field_rooms_count == "3" &&
                        elem.field_euro == "Да"
                    ) {
                        elem.newRoom = "3+";
                    } else if (elem.field_euro == "Нет") {
                        elem.newRoom = elem.field_rooms_count;
                    }
                });
            });
            console.log(this.newListRoom);
        },
        updateCheckboxes(target) {
            target.checked
                ? this.selectedRooms.push(target.value)
                : this.selectedRooms.splice(
                      this.selectedRooms.indexOf(target.value),
                      1
                  );
            this.updateScheme(target);
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
        setNewRange() {
            this.$refs?.slider_room.noUiSlider.on(
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
        },
    },
    mounted() {
        // Инициализация слайдеров
        initRange(this.$refs.slider_room, this.slider);
        initRange(this.$refs.slider_area, this.area);
        this.updateSlider();
        this.getPartArray();
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
    beforeMount() {},
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
                                        :selectedRooms="selectedRooms"
                                        v-bind="item.newStatus" />
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
                                            <FieldRooms
                                                @updateCheckboxes="
                                                    updateCheckboxes
                                                "></FieldRooms>
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
                                                            <span
                                                                class="filter-slider-from-value">
                                                                {{
                                                                    slider.minRange
                                                                }}
                                                            </span>
                                                        </span>
                                                        <span
                                                            class="filter-slider-to"
                                                            >до
                                                            <span
                                                                class="filter-slider-to-value"
                                                                >{{
                                                                    slider.maxRange
                                                                }}</span
                                                            >
                                                        </span>
                                                    </div>
                                                    <div
                                                        class="filter-slider-line"
                                                        ref="slider_room"
                                                        id="slider_room"></div>
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
                                                            <span
                                                                class="filter-slider-from-value"
                                                                >{{
                                                                    area.minRange
                                                                }}</span
                                                            >
                                                        </span>
                                                        <span
                                                            class="filter-slider-to"
                                                            >до
                                                            <span
                                                                class="filter-slider-to-value"
                                                                >{{
                                                                    area.maxRange
                                                                }}</span
                                                            >
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
