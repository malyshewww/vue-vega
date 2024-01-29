<script>
import NavigationBtn from "./NavigationBtn.vue";
import FieldRooms from "./FieldRooms.vue";
import json from "../data.json";
import FlatListItem from "./FlatListItem.vue";
import {
    checkboxObj,
    initRange,
    updateSliderRoom,
    updateSliderArea,
    updateSliderFloor,
    updateSquareRange,
    updateFloorRange,
    updateRoomRange,
    updateMinSliderValue,
    updateMaxSliderValue,
    setNewValue,
} from "../helpers/utils.js";
export default {
    components: {
        NavigationBtn,
        FieldRooms,
        FlatListItem,
    },
    data() {
        return {
            isActive: false,
            dataList: json,
            selectedRooms: [],
            listCheckboxes: checkboxObj,
            newListRoom: [],
            arrPrices: [],
            arrSquare: [],
            arrFloor: [],
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
            filtered_rooms: [],
        };
    },
    methods: {
        updateCheckboxes(target) {
            target.checked
                ? this.selectedRooms.push(target.value)
                : this.selectedRooms.splice(
                      this.selectedRooms.indexOf(target.value),
                      1
                  );
            this.updateFlatList(target);
        },
        // Формирование нового массива с добавленим новых свойств
        setNewArray() {
            for (let i = 0; i < Math.ceil(this.dataList.length); i++) {
                this.newListRoom = this.dataList;
            }
            this.newListRoom.map((elem, i) => {
                elem.field_price = elem.field_price.replace("руб.", "").trim();
                elem.field_floor_1 = elem.field_floor_1
                    .split(" ")
                    .find((x) => x == +x);
                if (elem.field_rooms_count == "1" && elem.field_euro == "Да") {
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
            // console.log(this.newListRoom);
        },
        updateSlider() {
            updateSliderRoom(this.$refs.slider_room, this.slider);
            updateSliderArea(this.$refs.slider_area, this.area);
            updateSliderFloor(this.$refs.slider_floor, this.floor);
            this.$refs.slider_room.noUiSlider.on("change", (e) => {
                this.filtered_rooms = [];
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.dataList.map((item, i) => {
                    item.field_price = item.field_price
                        .replace("руб.", "")
                        .trim();
                    if (item.field_status == "В продаже") {
                        if (
                            +item.field_price >= min &&
                            +item.field_price <= max
                        ) {
                            this.filtered_rooms.push(item);
                        }
                    }
                });
                updateSquareRange(this.filtered_rooms, this.area);
                setNewValue(this.$refs.slider_area, this.area);
                updateFloorRange(this.filtered_rooms, this.floor);
                setNewValue(this.$refs.slider_floor, this.floor);
            });
            this.$refs.slider_area.noUiSlider.on("change", (e) => {
                this.filtered_rooms = [];
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.dataList.map((item, i) => {
                    if (item.field_status == "В продаже") {
                        if (
                            +item.field_square >= min &&
                            +item.field_square <= max
                        ) {
                            this.filtered_rooms.push(item);
                        }
                    }
                });
                updateRoomRange(this.filtered_rooms, this.slider);
                setNewValue(this.$refs.slider_room, this.slider);
                updateFloorRange(this.filtered_rooms, this.floor);
                setNewValue(this.$refs.slider_floor, this.floor);
            });
            this.$refs.slider_floor.noUiSlider.on("change", (e) => {
                this.filtered_rooms = [];
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.dataList.map((item, i) => {
                    if (item.field_status == "В продаже") {
                        if (
                            +item.field_floor_1 >= min &&
                            +item.field_floor_1 <= max
                        ) {
                            this.filtered_rooms.push(item);
                        }
                    }
                });
                updateRoomRange(this.filtered_rooms, this.slider);
                setNewValue(this.$refs.slider_room, this.slider);
                updateSquareRange(this.filtered_rooms, this.area);
                setNewValue(this.$refs.slider_area, this.area);
            });
        },
        updateFlatList(target) {
            this.newListRoom.filter((f) => {
                if (
                    target.value == f.newRoom &&
                    f.field_status == "В продаже"
                ) {
                    if (target.checked) {
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
                        this.arrFloor.push({
                            id: f.field_number,
                            floor: f.field_floor_1,
                            room: f.newRoom,
                        });
                    }
                }
            });
            updateMinSliderValue(
                this.arrPrices,
                "room",
                this.slider,
                this.selectedRooms
            );
            updateMaxSliderValue(
                this.arrPrices,
                "room",
                this.slider,
                this.selectedRooms
            );
            updateMinSliderValue(
                this.arrSquare,
                "area",
                this.area,
                this.selectedRooms
            );
            updateMaxSliderValue(
                this.arrSquare,
                "area",
                this.area,
                this.selectedRooms
            );
            updateMinSliderValue(
                this.arrFloor,
                "floor",
                this.floor,
                this.selectedRooms
            );
            updateMaxSliderValue(
                this.arrFloor,
                "floor",
                this.floor,
                this.selectedRooms
            );
            this.setNewSliderValues();
        },
        // Проставление значений в слайдеры после того, как их обновили
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
            let minValueFloor = this.selectedRooms.length
                ? this.floor.minRange
                : this.floor.startMin;
            let maxValueFloor = this.selectedRooms.length
                ? this.floor.maxRange
                : this.floor.startMax;
            this.$refs.slider_room.noUiSlider.set([minValueRoom, maxValueRoom]);
            this.$refs.slider_area.noUiSlider.set([minValueArea, maxValueArea]);
            this.$refs.slider_floor.noUiSlider.set([
                minValueFloor,
                maxValueFloor,
            ]);
        },
        openFilter() {
            this.isActive = true;
        },
        closeFilter() {
            this.isActive = false;
        },
        resetFilter() {
            window.location.reload();
        },
    },
    mounted() {
        // Инициализация слайдеров
        initRange(this.$refs.slider_room, this.slider);
        initRange(this.$refs.slider_area, this.area);
        initRange(this.$refs.slider_floor, this.floor);
        this.updateSlider();
        this.setNewArray();
        document.body.classList.add("not-front");
    },
};
</script>
<template>
    <div>
        <div class="main-sale">
            <div class="main-sale__filter">
                <div class="container">
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
                                    <fieldset class="main-sale__filter-price">
                                        <legend>Количество комнат</legend>
                                        <div class="filter-slider">
                                            <div class="filter-slider-top">
                                                <span class="filter-slider-from"
                                                    >от
                                                    <span
                                                        class="filter-slider-from-value">
                                                        {{ slider.minRange }}
                                                    </span>
                                                </span>
                                                <span class="filter-slider-to"
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
                                    <fieldset class="main-sale__filter-floor">
                                        <legend>Этаж</legend>
                                        <div class="filter-slider">
                                            <div class="filter-slider-top">
                                                <span class="filter-slider-from"
                                                    >от<span
                                                        class="filter-slider-from-value"
                                                        >{{
                                                            floor.minRange
                                                        }}</span
                                                    ></span
                                                ><span class="filter-slider-to"
                                                    >до<span
                                                        class="filter-slider-to-value"
                                                        >{{
                                                            floor.maxRange
                                                        }}</span
                                                    ></span
                                                >
                                            </div>
                                            <div
                                                class="filter-slider-line"
                                                ref="slider_floor"
                                                id="slider_floor"></div>
                                        </div>
                                    </fieldset>
                                    <fieldset class="main-sale__filter-area">
                                        <legend>Площадь квартиры (м²)</legend>
                                        <div class="filter-slider">
                                            <div class="filter-slider-top">
                                                <span class="filter-slider-from"
                                                    >от
                                                    <span
                                                        class="filter-slider-from-value"
                                                        >{{
                                                            area.minRange
                                                        }}</span
                                                    >
                                                </span>
                                                <span class="filter-slider-to"
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
                                <div class="main-sale__filter-bottom">
                                    <!-- <fieldset class="main-sale__filter-params">
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
                                                <label for="params-loggia"
                                                    >лоджия</label
                                                >
                                            </li>
                                            <li>
                                                <input
                                                    id="params-balcony"
                                                    type="radio"
                                                    name="params"
                                                    value="balcony" />
                                                <label for="params-balcony"
                                                    >французский балкон</label
                                                >
                                            </li>
                                        </ul>
                                    </fieldset> -->
                                    <div
                                        class="main-sale__filter-reset btn-border"
                                        @click="resetFilter()">
                                        сбросить фильтр
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="main-sale__filter-submit">
                            <div class="btn">посмотреть предложения</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <FlatListItem :list="dataList"></FlatListItem>
                <button class="main-sale__show-more">показать ещё</button>
            </div>
        </div>
    </div>
</template>
