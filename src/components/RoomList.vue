<script>
import NavigationBtn from "./NavigationBtn.vue";
import FieldRooms from "./FieldRooms.vue";
import json from "../data.json";
import {
    checkboxObj,
    initRange,
    updateSliderRoom,
    updateSliderArea,
    updateSliderFloor,
    updateSquareRange,
    setNewValue,
} from "../helpers/utils.js";
export default {
    components: {
        NavigationBtn,
        FieldRooms,
    },
    data() {
        return {
            dataList: json,
            selectedRooms: [],
            listCheckboxes: checkboxObj,
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
            console.log(this.selectedRooms);
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
                        } else {
                        }
                    }
                });
                console.log(this.filtered_rooms);
                updateSquareRange(this.filtered_rooms, this.area);
                setNewValue(this.$refs.slider_area, this.area);
            });
        },
    },
    mounted() {
        // Инициализация слайдеров
        initRange(this.$refs.slider_room, this.slider);
        initRange(this.$refs.slider_area, this.area);
        initRange(this.$refs.slider_floor, this.floor);
        this.updateSlider();
        console.log(this.dataList);
    },
};
</script>
<template>
    <div>
        <div class="main-sale">
            <div class="main-sale__filter">
                <div class="container">
                    <NavigationBtn></NavigationBtn>
                    <button class="main-sale__filter-btn btn">фильтр</button>
                    <div class="main-sale__filter-wrap">
                        <div class="wrapper-top">
                            <div
                                class="wrapper-close main-sale__filter-close"></div>
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
                                        class="main-sale__filter-reset btn-border">
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
                <ul class="main-sale__list">
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/1-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/1-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/1-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/1-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    1-комнатная 45,20 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>4 400 350 руб.</span
                                    ><span>2 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild">
                                <span>французский балкон</span>
                            </div></a
                        >
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/2-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/2-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/2-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/2-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    2-комнатная 61,75 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>7 080 000 руб.</span
                                    ><span>4 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild">
                                <span>лоджия</span>
                            </div></a
                        >
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/3-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/3-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/3-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/3-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    3-комнатная 83,10 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>13 580 600 руб.</span
                                    ><span>12 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild"></div
                        ></a>
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/1-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/1-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/1-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/1-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    1-комнатная 45,20 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>4 400 350 руб.</span
                                    ><span>2 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild">
                                <span>французский балкон</span>
                            </div></a
                        >
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/2-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/2-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/2-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/2-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    2-комнатная 61,75 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>7 080 000 руб.</span
                                    ><span>4 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild">
                                <span>лоджия</span>
                            </div></a
                        >
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/3-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/3-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/3-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/3-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    3-комнатная 83,10 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>13 580 600 руб.</span
                                    ><span>12 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild"></div
                        ></a>
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/1-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/1-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/1-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/1-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    1-комнатная 45,20 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>4 400 350 руб.</span
                                    ><span>2 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild">
                                <span>французский балкон</span>
                            </div></a
                        >
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/2-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/2-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/2-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/2-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    2-комнатная 61,75 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>7 080 000 руб.</span
                                    ><span>4 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild">
                                <span>лоджия</span>
                            </div></a
                        >
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/3-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/3-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/3-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/3-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    3-комнатная 83,10 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>13 580 600 руб.</span
                                    ><span>12 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild"></div
                        ></a>
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/1-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/1-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/1-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/1-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    1-комнатная 45,20 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>4 400 350 руб.</span
                                    ><span>2 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild">
                                <span>французский балкон</span>
                            </div></a
                        >
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/2-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/2-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/2-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/2-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    2-комнатная 61,75 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>7 080 000 руб.</span
                                    ><span>4 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild">
                                <span>лоджия</span>
                            </div></a
                        >
                    </li>
                    <li class="main-sale__item">
                        <a href="flat-item.html">
                            <div class="main-sale__item-img swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide img-flat">
                                        <picture
                                            ><source
                                                srcset="img/index/3-k.webp"
                                                type="image/webp" />
                                            <img src="img/index/3-k.png" alt=""
                                        /></picture>
                                    </div>
                                    <div class="swiper-slide img-location">
                                        <picture
                                            ><source
                                                srcset="
                                                    img/index/3-k-scheme.webp
                                                "
                                                type="image/webp" />
                                            <img
                                                src="img/index/3-k-scheme.png"
                                                alt=""
                                        /></picture>
                                    </div>
                                </div>
                            </div>
                            <div class="main-sale__item-content">
                                <div class="main-sale__item-title">
                                    3-комнатная 83,10 м²
                                </div>
                                <div class="main-sale__item-text">
                                    <span>13 580 600 руб.</span
                                    ><span>12 этаж</span>
                                </div>
                                <div class="main-sale__item-link btn-arrow">
                                    подробнее
                                </div>
                            </div>
                            <div class="main-sale__item-schild"></div
                        ></a>
                    </li>
                </ul>
                <button class="main-sale__show-more">показать ещё</button>
            </div>
        </div>
    </div>
</template>
