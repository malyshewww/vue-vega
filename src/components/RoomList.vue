<script>
import NavigationBtn from "./NavigationBtn.vue";
import FieldRooms from "./FieldRooms.vue";
import json from "../data.json";
import FlatListItem from "./FlatListItem.vue";
import Swiper from "swiper";
import { ref, onMounted } from "vue";
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
        Swiper,
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
                newMinValue: null,
                newMaxValue: null,
            },
            area: {
                minRange: null,
                maxRange: null,
                startMin: 35.95,
                startMax: 72.35,
                step: 0.1,
                min: 35.95,
                max: 72.35,
                newMinValue: null,
                newMaxValue: null,
            },
            floor: {
                minRange: null,
                maxRange: null,
                startMin: 2,
                startMax: 15,
                step: 1,
                min: 2,
                max: 15,
                newMinValue: null,
                newMaxValue: null,
            },
            filtered_rooms: [],
            flatsToShow: 12,
            initialFlatsToShow: 12,
            totalFlats: 0,
            pageNumber: 1,
            newShow: 0,
            hiddenInputs: {
                price: "",
                area: "",
                floor: "",
            },
            refsCheckboxes: [],
            result: [],
            resultState: false,
            validStatus: false,
            setFlatSlider: [],
            flatSlider: [],
            itemRefs: [],
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
            this.updateNewValuesSlider();
            // Обходим массива через map для создания нового свойства newStatus у каждого элемента массива
            this.filtered_rooms.map((item, index) => {
                let tempStatus = "";
                if (item.field_status == "В продаже") {
                    if (this.selectedRooms.includes(item.newRoom)) {
                        tempStatus = true;
                    } else {
                        tempStatus = false;
                    }
                }
                item.newStatus = tempStatus;
            });
            // Отбираем из массива только те объекты, у которых newStatus статус равен true
            this.result = this.filtered_rooms.filter((item) => {
                return Boolean(item.newStatus);
            });
            /*
            Доп. проверка для дальнейшего взаимодействия с переменной validStatus
            Проверка, содержит ли свойство элементов массива newStatus значение true
            */
            this.validStatus = this.result.every(function (x) {
                return x.newStatus == true;
            });
            if (this.result.length > 0 && this.validStatus) {
                this.resultState = true;
            } else {
                this.resultState = false;
                this.result = this.filtered_rooms;
            }
            // Количество карточек для показа, если работает с массивом result
            if (this.result.length < 12) {
                this.flatsToShow = this.result.length;
            } else {
                this.flatsToShow = 12;
            }
        },
        getArrCheckboxes(arr) {
            this.refsCheckboxes = arr;
        },
        // Формирование нового массива с добавленим новых свойств
        setNewArray() {
            for (let i = 0; i < Math.ceil(this.dataList.length); i++) {
                this.newListRoom = [...this.dataList];
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
            this.filtered_rooms = this.newListRoom;
        },
        updateSlider() {
            updateSliderRoom(this.$refs.slider_room, this.slider);
            updateSliderArea(this.$refs.slider_area, this.area);
            updateSliderFloor(this.$refs.slider_floor, this.floor);
            this.$refs.slider_room.noUiSlider.on("change", (e) => {
                if (
                    this.result.length == 0 &&
                    !this.resultState &&
                    !this.validStatus
                ) {
                    this.filtered_rooms = [];
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    this.newListRoom.filter((item, i) => {
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
                    this.updateInputsHidden();
                    this.checkFilteredData();
                    this.setValuesForFlatsToShow();
                } else {
                    this.result = [];
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    this.newListRoom.filter((item, i) => {
                        if (item.field_status == "В продаже") {
                            if (
                                +item.field_price >= min &&
                                +item.field_price <= max
                            ) {
                                this.result.push(item);
                            }
                        }
                    });
                    updateSquareRange(this.result, this.area);
                    setNewValue(this.$refs.slider_area, this.area);
                    updateFloorRange(this.result, this.floor);
                    setNewValue(this.$refs.slider_floor, this.floor);
                    this.updateInputsHidden();
                    this.checkFilteredData();
                    this.setValuesForFlatsToShow();
                    console.log(this.result.length);
                }
            });
            this.$refs.slider_area.noUiSlider.on("change", (e) => {
                if (
                    this.result.length == 0 &&
                    !this.resultState &&
                    !this.validStatus
                ) {
                    this.filtered_rooms = [];
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    this.newListRoom.filter((item, i) => {
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
                    this.updateInputsHidden();
                    this.checkFilteredData();
                    this.setValuesForFlatsToShow();
                } else {
                    this.result = [];
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    this.newListRoom.filter((item, i) => {
                        if (item.field_status == "В продаже") {
                            if (
                                +item.field_square >= min &&
                                +item.field_square <= max
                            ) {
                                this.result.push(item);
                            }
                        }
                    });
                    updateRoomRange(this.result, this.slider);
                    setNewValue(this.$refs.slider_room, this.slider);
                    updateFloorRange(this.result, this.floor);
                    setNewValue(this.$refs.slider_floor, this.floor);
                    this.updateInputsHidden();
                    this.checkFilteredData();
                    this.setValuesForFlatsToShow();
                }
            });
            this.$refs.slider_floor.noUiSlider.on("change", (e) => {
                if (
                    this.result.length == 0 &&
                    !this.resultState &&
                    !this.validStatus
                ) {
                    this.filtered_rooms = [];
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    this.newListRoom.filter((item, i) => {
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
                    this.updateInputsHidden();
                    this.checkFilteredData();
                    this.setValuesForFlatsToShow();
                } else {
                    this.result = [];
                    let min = Math.round(e[0]);
                    let max = Math.round(e[1]);
                    this.newListRoom.filter((item, i) => {
                        if (item.field_status == "В продаже") {
                            if (
                                +item.field_floor_1 >= min &&
                                +item.field_floor_1 <= max
                            ) {
                                this.result.push(item);
                            }
                        }
                    });
                    updateRoomRange(this.result, this.slider);
                    setNewValue(this.$refs.slider_room, this.slider);
                    updateSquareRange(this.result, this.area);
                    setNewValue(this.$refs.slider_area, this.area);
                    this.updateInputsHidden();
                    this.checkFilteredData();
                    this.setValuesForFlatsToShow();
                }
            });
        },
        checkFilteredData() {
            if (
                this.result.length == 0 &&
                !this.resultState &&
                !this.validStatus
            ) {
                if (this.filtered_rooms.length > 0) {
                    return true;
                } else {
                    [...this.refsCheckboxes].forEach((checkbox) => {
                        {
                            checkbox.checked = false;
                            this.selectedRooms = [];
                        }
                    });
                }
            } else {
                if (this.result.length > 0) {
                    return true;
                } else {
                    [...this.refsCheckboxes].forEach((checkbox) => {
                        {
                            checkbox.checked = false;
                            this.selectedRooms = [];
                        }
                    });
                }
            }
        },
        updateFlatList(target) {
            this.newListRoom.filter((f) => {
                if (
                    target.value == f.newRoom &&
                    f.field_status == "В продаже"
                ) {
                    if (target.checked) {
                        // this.filtered_rooms.push(f);
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
            this.updateInputsHidden();
        },
        updateNewValuesSlider() {
            this.$refs.slider_room.noUiSlider.on("update", (e) => {
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.slider.newMinValue = min;
                this.slider.newMaxValue = max;
            });
            this.$refs.slider_area.noUiSlider.on("update", (e) => {
                let min = e[0];
                let max = e[1];
                this.area.newMinValue = min;
                this.area.newMaxValue = max;
            });
            this.$refs.slider_floor.noUiSlider.on("update", (e) => {
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.floor.newMinValue = min;
                this.floor.newMaxValue = max;
            });
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
        updateInputsHidden() {
            this.$refs.slider_room.noUiSlider.on("update", (e) => {
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.hiddenInputs.price = `${min}_${max}`;
            });
            this.$refs.slider_area.noUiSlider.on("update", (e) => {
                let min = e[0];
                let max = e[1];
                this.hiddenInputs.area = `${min}_${max}`;
            });
            this.$refs.slider_floor.noUiSlider.on("update", (e) => {
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.hiddenInputs.floor = `${min}_${max}`;
            });
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
        setValuesForFlatsToShow() {
            if (
                this.result.length == 0 &&
                !this.validStatus &&
                !this.resultState
            ) {
                if (this.filtered_rooms.length < 12) {
                    this.flatsToShow = this.filtered_rooms.length;
                } else {
                    this.flatsToShow = 12;
                }
            } else {
                if (this.result.length < 12) {
                    this.flatsToShow = this.result.length;
                } else {
                    this.flatsToShow = 12;
                }
            }
        },
        loadMore() {
            this.pageNumber++;
            // let url = "https://jsonplaceholder.org/users/";
            // try {
            //     fetch(`${url}${this.pageNumber}`)
            //         .then((response) => {
            //             if (!response.ok) {
            //                 throw new Error("Network response was not ok");
            //             }
            //             return response.json();
            //         })
            //         .then((flats) => {
            //             // this.dataList = flats;
            //             console.log(flats);
            //         });
            // } catch (err) {
            //     console.error(
            //         "There was a problem with the fetch operation:",
            //         err
            //     );
            // }
            if (this.result.length == 0) {
                if (this.flatsToShow >= this.filtered_rooms.length) return;
                // Разница
                let diff = this.filtered_rooms.length - this.flatsToShow;
                if (
                    this.filtered_rooms.length > 12 &&
                    this.filtered_rooms.length < 24
                ) {
                    this.newShow = this.filtered_rooms.length - 12;
                    this.flatsToShow += this.newShow;
                } else if (this.filtered_rooms.length > 24 && diff < 12) {
                    this.flatsToShow += diff;
                } else {
                    this.flatsToShow += 12;
                }
            }
            if (this.result.length > 0) {
                console.log(this.result.length);
                if (this.flatsToShow >= this.result.length) return;
                // Разница
                let diff = this.result.length - this.flatsToShow;
                if (this.result.length > 12 && this.result.length < 24) {
                    this.newShow = this.result.length - 12;
                    this.flatsToShow += this.newShow;
                } else if (this.result.length > 24 && diff < 12) {
                    this.flatsToShow += diff;
                } else {
                    this.flatsToShow += 12;
                }
            }
        },
        setItemRef(el) {
            if (el) {
                this.itemRefs.push(el);
            }
        },
    },
    mounted() {
        // Инициализация слайдеров
        initRange(this.$refs.slider_room, this.slider);
        initRange(this.$refs.slider_area, this.area);
        initRange(this.$refs.slider_floor, this.floor);
        this.updateSlider();
        this.setNewArray();
        this.updateInputsHidden();
        document.body.classList.add("not-front");
        document.body.classList.remove("v2");
        this.totalFlats = this.filtered_rooms.length;
        this.selectedRooms = [];
        // console.log(this.flatsToShow);
    },
    beforeUpdate() {
        this.itemRefs = [];
    },
    updated() {
        if (this.itemRefs.length > 0 && window.screen.width < 1000) {
            this.itemRefs.forEach((item) => {
                const slider = item.querySelector(".swiper");
                new Swiper(slider, {});
            });
        }
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
                                        @updateCheckboxes="updateCheckboxes"
                                        @getArrCheckboxes="
                                            getArrCheckboxes
                                        "></FieldRooms>
                                    <fieldset class="main-sale__filter-price">
                                        <legend>Количество комнат</legend>
                                        <div class="filter-slider">
                                            <input
                                                type="hidden"
                                                name="field_price"
                                                :value="hiddenInputs.price" />
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
                                            <input
                                                type="hidden"
                                                name="field_floor__field_number"
                                                :value="hiddenInputs.floor" />
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
                                            <input
                                                type="hidden"
                                                name="field_square"
                                                :value="hiddenInputs.area" />
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
                            <div class="btn" @click="closeFilter()">
                                посмотреть предложения
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div v-if="resultState && validStatus">
                    <ul
                        class="main-sale__list"
                        :data-page="pageNumber"
                        v-if="result.length > 0">
                        <li
                            class="main-sale__item"
                            v-for="(flat, index) in flatsToShow"
                            :key="index"
                            :ref="setItemRef">
                            <a
                                :href="`/flats/${result[index]?.field_number}`"
                                :data-id="result[index]?.field_number">
                                <div class="main-sale__item-img swiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide img-flat">
                                            <picture
                                                ><source
                                                    :srcset="
                                                        result[index]
                                                            ?.field_plan_image
                                                    "
                                                    type="image/webp" />
                                                <img
                                                    :src="
                                                        result[index]
                                                            ?.field_plan_image
                                                    "
                                                    :alt="result[index]?.title"
                                            /></picture>
                                        </div>
                                        <div class="swiper-slide img-location">
                                            <picture
                                                ><source
                                                    :srcset="
                                                        result[index]
                                                            ?.location_on_floor
                                                    "
                                                    type="image/webp" />
                                                <img
                                                    :src="
                                                        result[index]
                                                            ?.location_on_floor
                                                    "
                                                    alt=""
                                            /></picture>
                                        </div>
                                    </div>
                                </div>
                                <div class="main-sale__item-content">
                                    <div class="main-sale__item-title">
                                        <!-- {{ dataList[index].title }} -->
                                        {{
                                            result[index]?.field_rooms_count
                                        }}-комнатная квартира
                                        {{ result[index]?.field_square }}
                                        м²
                                    </div>
                                    <div class="main-sale__item-text">
                                        <span>
                                            {{
                                                Number(
                                                    result[index]?.field_price
                                                ).toLocaleString("ru-RU")
                                            }}
                                            руб.</span
                                        >
                                        <span
                                            >{{
                                                result[index]?.field_floor_1
                                            }}
                                            этаж</span
                                        >
                                    </div>
                                    <div class="main-sale__item-link btn-arrow">
                                        подробнее
                                    </div>
                                </div>
                                <!-- <div class="main-sale__item-schild">
                                    <span>французский балкон</span>
                                </div> -->
                            </a>
                        </li>
                    </ul>
                    <div v-else>По вашему запросу ничего не найдено</div>
                    <button
                        v-if="
                            flatsToShow < result.length ||
                            result.length > flatsToShow
                        "
                        @click="loadMore()"
                        class="main-sale__show-more">
                        показать ещё
                    </button>
                </div>
                <div v-else>
                    <ul
                        class="main-sale__list"
                        :data-page="pageNumber"
                        v-if="filtered_rooms.length > 0">
                        <li
                            class="main-sale__item"
                            v-for="(flat, index) in flatsToShow"
                            :key="index"
                            :ref="setItemRef">
                            <a
                                :href="`/flats/${filtered_rooms[index]?.field_number}`"
                                :data-id="filtered_rooms[index]?.field_number">
                                <div class="main-sale__item-img swiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide img-flat">
                                            <picture
                                                ><source
                                                    :srcset="
                                                        filtered_rooms[index]
                                                            ?.field_plan_image
                                                    "
                                                    type="image/webp" />
                                                <img
                                                    :src="
                                                        filtered_rooms[index]
                                                            ?.field_plan_image
                                                    "
                                                    :alt="
                                                        filtered_rooms[index]
                                                            ?.title
                                                    "
                                            /></picture>
                                        </div>
                                        <div class="swiper-slide img-location">
                                            <picture
                                                ><source
                                                    :srcset="
                                                        filtered_rooms[index]
                                                            ?.location_on_floor
                                                    "
                                                    type="image/webp" />
                                                <img
                                                    :src="
                                                        filtered_rooms[index]
                                                            ?.location_on_floor
                                                    "
                                                    alt=""
                                            /></picture>
                                        </div>
                                    </div>
                                </div>
                                <div class="main-sale__item-content">
                                    <div class="main-sale__item-title">
                                        <!-- {{ dataList[index].title }} -->
                                        {{
                                            filtered_rooms[index]
                                                ?.field_rooms_count
                                        }}-комнатная квартира
                                        {{
                                            filtered_rooms[index]?.field_square
                                        }}
                                        м²
                                    </div>
                                    <div class="main-sale__item-text">
                                        <span>
                                            {{
                                                Number(
                                                    filtered_rooms[index]
                                                        ?.field_price
                                                ).toLocaleString("ru-RU")
                                            }}
                                            руб.</span
                                        >
                                        <span
                                            >{{
                                                filtered_rooms[index]
                                                    ?.field_floor_1
                                            }}
                                            этаж</span
                                        >
                                    </div>
                                    <div class="main-sale__item-link btn-arrow">
                                        подробнее
                                    </div>
                                </div>
                                <!-- <div class="main-sale__item-schild">
                                    <span>французский балкон</span>
                                </div> -->
                            </a>
                        </li>
                    </ul>
                    <div v-else>По вашему запросу ничего не найдено</div>
                    <button
                        v-if="
                            flatsToShow < filtered_rooms.length ||
                            filtered_rooms.length > flatsToShow
                        "
                        @click="loadMore()"
                        class="main-sale__show-more">
                        показать ещё
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
