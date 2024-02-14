<script>
import noUiSlider from "nouislider";
import axios from "axios";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import json from "../data.json";
import FlatSchemeItem from "./FlatSchemeItem.vue";
import NavigationBtn from "./NavigationBtn.vue";
import FieldRooms from "./FieldRooms.vue";
import { useFetch } from "../fetch.js";
import {
    initRange,
    checkboxObj,
    updateSliderRoom,
    updateSliderArea,
    updateSquareRange,
    updateMinSliderValue,
    updateMaxSliderValue,
    setNewValue,
} from "../helpers/utils.js";
// Подключение компонента с чекбоксами
export default {
    components: {
        noUiSlider,
        FlatSchemeItem,
        NavigationBtn,
        FieldRooms,
        // Fancybox,
    },
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
            filtered_rooms: [],
            testObj: {},
            activeWindow: false,
            tooltip: {
                isActive: false,
                img: "",
                title: "",
                price: "",
                status: "",
                href: "",
            },
            hiddenInputs: {
                price: "",
                area: "",
            },
            refsCheckboxes: [],
            refsSchemeItems: [],
        };
    },
    methods: {
        openTooltip(event, flat) {
            let target = event.target;
            this.tooltip.img = flat.field_plan_image;
            this.tooltip.title = `${flat.field_rooms_count}-комнатная, ${flat.field_square} м²`;
            this.tooltip.price = `${Number(flat.field_price).toLocaleString(
                "ru-RU"
            )} руб.`;
            // this.tooltip.status =
            //     flat.status === "on-sale" ? "в продаже" : "забронирована";
            let left = target.getBoundingClientRect().left;
            let top = target.getBoundingClientRect().top;
            this.$refs.tooltip.style.left = `${left}px`;
            this.$refs.tooltip.style.top = `${top}px`;
            this.$refs.tooltip.style.transform = `translate(-43%, -110%)`;
            this.tooltip.isActive = !this.isActive;
        },
        closeTooltip() {
            this.tooltip.isActive = false;
        },
        openTooltipMobile(event, flat) {
            event.preventDefault();
            this.tooltip.img = flat.field_plan_image;
            this.tooltip.title = `${flat.field_rooms_count}-комнатная, ${flat.field_square} м²`;
            this.tooltip.price = `${Number(flat.field_price).toLocaleString(
                "ru-RU"
            )} руб.`;
            this.tooltip.img = flat.field_plan_image;
            this.tooltip.href = event.target.href;
            this.tooltip.isActive = !this.isActive;
        },
        closeTooltipMobile(event) {
            let target = event.target;
            if (document.body.clientWidth < 1100) {
                if (
                    target.classList.contains("flat-list__window") ||
                    target.classList.contains("mob-close") ||
                    target.classList.contains("mob-close2")
                ) {
                    this.tooltip.isActive = false;
                }
            }
        },
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
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.slider.newMinValue = min;
                this.slider.newMaxValue = max;
                console.log(this.slider.newMinValue);
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
                // console.log(this.filtered_rooms);
                this.checkFilteredData();
                console.log(this.filtered_rooms);
            });
            this.$refs.slider_area.noUiSlider.on("change", (e) => {
                this.filtered_rooms = [];
                let min = Math.round(e[0]);
                let max = Math.round(e[1]);
                this.area.newMinValue = min;
                this.area.newMaxValue = max;
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
                this.checkFilteredData();
            });
        },
        checkFilteredData() {
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
                                f.newStatus = true;
                            } else {
                                f.newStatus = false;
                            }
                        }
                    });
                });
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
        // Обновление минимальной цены
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
            this.$refs.slider_room.noUiSlider.set([minValueRoom, maxValueRoom]);
            this.$refs.slider_area.noUiSlider.set([minValueArea, maxValueArea]);
        },
        // Обновление схемы при клике на чекбоксы
        updateCheckboxes(target) {
            target.checked
                ? this.selectedRooms.push(target.value)
                : this.selectedRooms.splice(
                      this.selectedRooms.indexOf(target.value),
                      1
                  );
            this.updateScheme(target);
            this.getArrCheckboxes(this.refsCheckboxes);
        },
        getArrCheckboxes(arr) {
            this.refsCheckboxes = arr;
        },
        // Обновление слайдеров при клике на чекбоксы
        updateScheme(target) {
            this.newListRoom.map((item) => {
                item.filter((f, i) => {
                    if (
                        target.value == f.newRoom &&
                        f.field_status == "В продаже"
                    ) {
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
                this.updateMinPrice(this.arrPrices);
                // Использование функций из helpers/utils
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

                this.setNewSliderValues();
            });
            // console.log(this.updateListRoom);
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
        },
        // Разбиваем массивы на подмассивы для более корректного вывода шахватки квартир
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
        },
    },
    computed: {},
    watch: {},
    mounted() {
        // Инициализация слайдеров
        initRange(this.$refs.slider_room, this.slider);
        initRange(this.$refs.slider_area, this.area);
        this.updateSlider();
        this.getPartArray();
        this.updateInputsHidden();
        document.body.classList.add("not-front", "v2");
        // console.log(this.newListRoom);
        // const { data, error } = useFetch(() => console.log("fetch"));
        // console.log(data, error);
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
        // Fancybox.bind("[data-fancybox^='gallery']", {});
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
                                    <FlatSchemeItem
                                        v-for="(item, index) in el"
                                        :item="item"
                                        :key="item.field_number"
                                        :selectedRooms="selectedRooms"
                                        @openTooltip="openTooltip"
                                        @closeTooltip="closeTooltip"
                                        @openTooltipMobile="openTooltipMobile"
                                        :sliderMinValue="slider.newMinValue"
                                        :sliderMaxValue="slider.newMaxValue"
                                        :areaMinValue="area.newMinValue"
                                        :areaMaxValue="area.newMaxValue"
                                        v-bind="item.newStatus" />
                                </div>
                                <div class="flat-list__plan">
                                    <a
                                        class="flat-list__link"
                                        :href="el[0].floor_image"
                                        :data-fancybox="`gallery-${idx}`">
                                        план этажа
                                        <img
                                            style="display: none"
                                            :src="el[0].floor_image"
                                            alt="" />
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
                                    <form data-once="form-updated">
                                        <div class="main-sale__filter-top">
                                            <FieldRooms
                                                @updateCheckboxes="
                                                    updateCheckboxes
                                                "
                                                @getArrCheckboxes="
                                                    getArrCheckboxes
                                                "></FieldRooms>
                                            <fieldset
                                                class="main-sale__filter-price">
                                                <legend>
                                                    Количество комнат
                                                </legend>
                                                <div class="filter-slider">
                                                    <input
                                                        type="hidden"
                                                        name="field_price"
                                                        :value="
                                                            hiddenInputs.price
                                                        " />
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
                                                    <input
                                                        type="hidden"
                                                        name="field_square"
                                                        :value="
                                                            hiddenInputs.area
                                                        " />
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
                                    <div class="btn" @click="closeFilter()">
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
        <div
            class="flat-list__window"
            ref="tooltip"
            :class="{ active: tooltip.isActive }"
            @click="closeTooltipMobile($event)">
            <div class="wrap">
                <div class="flat-list__minImg">
                    <picture>
                        <source :srcset="`${tooltip.img}`" />
                        <img :src="`${tooltip.img}`" alt="" />
                    </picture>
                </div>
                <div class="flat-list__info">
                    <span class="inf">{{ tooltip.title }} </span>
                    <span class="price">{{ tooltip.price }} </span>
                </div>
                <a class="mob-btn btn" :href="tooltip.href">подробнее</a
                ><svg
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="triangle">
                    <path d="M8 0L4 5L0 0H8Z" fill="white" />
                </svg>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mob-close">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 6.45468L10.5317
          11.9789L5 17.5119L6.28942 19L11.9259 13.371L17.5624 19L19
          17.6599L13.32 11.9789L19 6.30663L17.4827 5.02675L11.926
          10.5845L6.34248 5L5 6.45468Z"
                        fill="#E1DCDE"
                        class="mob-close2" />
                </svg>
            </div>
        </div>
    </div>
</template>
