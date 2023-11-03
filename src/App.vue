<script>
import noUiSlider from "nouislider";
import axios from "axios";
import json from "./data.json";
import FlatItem from "./components/Rooms/FlatItem.vue";
// import FlatWindow from "./components/Rooms/FlatWindow.vue";
// import VueNouislider from "vue3-nouislider";
import { ref, onMounted, onUnmounted } from "vue";
export default {
    components: {
        // Flat,
        // VueNouislider,
        noUiSlider,
        FlatItem,
        // FlatWindow,
    },
    data() {
        return {
            allDone: false,
            xPos: "",
            yPos: "",
            info: json,
            newListRoom: [],
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
                step: 10000,
                min: 5000000,
                max: 13500000,
            },
            area: {
                minRange: null,
                maxRange: null,
                startMin: 34.5,
                startMax: 68,
                step: 0.1,
                min: 34.5,
                max: 68,
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
        };
    },
    methods: {
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
        },
        updateScheme(e) {
            // console.log(e.target.value);
            console.log("change");
            this.$refs.slider_room.noUiSlider.on("change", (e) => {
                console.log("change");
            });
        },
        getPartArray() {
            let size = 9; // размер подмассива
            for (let i = 0; i < Math.ceil(this.info.length / size); i++) {
                this.newListRoom[i] = this.info.slice(
                    i * size,
                    i * size + size
                );
            }
            console.log(this.newListRoom);
        },
        setRefs() {
            return this.$refs;
        },
        openWindow(event) {
            let left = event.target.getBoundingClientRect().left,
                top = event.target.getBoundingClientRect().top;
            this.xPos = left;
            this.yPos = top;
            this.allDone = true;
            if (this.$refs.room_window) {
                this.$refs.room_window.style.left = `${this.xPos}px`;
                this.$refs.room_window.style.top = `${this.yPos}px`;
                // this.$refs.room_window.classList.add("active");
            }
        },
        removeWindow() {
            if (this.$refs.room_window?.classList.contains("active")) {
                this.$refs.room_window?.classList.remove("active");
            }
            this.allDone = false;
        },
    },
    computed: {
        notAvailable() {
            return "filter-blocked notAvailable";
        },
        soldOut() {
            return "filter-blocked soldOut";
        },
    },
    watch: {
        addBodyClass: {
            immediate: true,
            handler(val) {
                document.body.classList.toggle("not-front", val);
            },
        },
        // price(newPrice) {
        //     if (newPrice < this.slider.minRange) {
        //         this.slider.min = this.slider.minRange;
        //     } else if (newPrice > this.slider.maxRange) {
        //         this.slider.max = this.slider.maxRange;
        //     }
        // },
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
        this.updateScheme();
        this.setRefs();
        // this.getPartArray();
        // axios
        //   .get("https://xn--80addhdy.xn--p1ai/rest")
        //   .then((response) => (this.res = response))
        //   .catch((error) => console.log(error));
        // [...noUiSliderParams].forEach((noUiSliderObj) => {
        //   noUiSlider.create(noUiSliderObj.ref, {
        //     start: [noUiSliderObj.startMin, noUiSliderObj.startMax],
        //     step: noUiSliderObj.step,
        //     connect: true,
        //     range: {
        //       min: noUiSliderObj.startMin,
        //       max: noUiSliderObj.startMax,
        //     },
        //   });
        // noUiSliderObj.ref.noUiSlider.on("update", function (e, values, handle) {
        //   if (noUiSliderObj.step >= 1) {
        //     let min = Math.round(e[0]);
        //     let max = Math.round(e[1]);
        //     if (!isNaN(min) && !isNaN(max)) {
        //       noUiSliderObj.minRange = new Intl.NumberFormat("ru-RU").format(min);
        //       noUiSliderObj.maxRange = new Intl.NumberFormat("ru-RU").format(max);
        //     }
        //   } else {
        //     let min = e[0];
        //     let max = e[1];
        //     if (!isNaN(min) && !isNaN(max)) {
        //       noUiSliderObj.minRange = min;
        //       noUiSliderObj.maxRange = max;
        //     }
        //   }
        // });
        // });
    },
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
                                        :notAvailable="notAvailable"
                                        :soldOut="soldOut"
                                        :selectedRooms="selectedRooms"
                                        :slider="this.slider"
                                        :mainRef="setRefs"
                                        :openWindow="openWindow"
                                        :removeWindow="removeWindow" />
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
                            <div class="main-sale__btns">
                                <a
                                    class="main-sale__btn-scheme btn"
                                    href="flat-list-v2.html">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.6558 0.333328H0.332031V3.59093H13.6558V0.333328ZM12.4297 2.3788H1.55806V1.54545H12.4297V2.3788Z"
                                            fill="white" />
                                        <path
                                            d="M13.6558 5.33333H0.332031V8.59093H13.6558V5.33333ZM12.4297 7.3788H1.55806V6.54545H12.4297V7.3788Z"
                                            fill="white" />
                                        <path
                                            d="M13.6558 10.3333H0.332031V13.5909H13.6558V10.3333ZM12.4297 12.3788H1.55806V11.5455H12.4297V12.3788Z"
                                            fill="white" /></svg
                                    ><span>на схеме</span></a
                                ><a
                                    class="main-sale__btn-list btn-border"
                                    href="flat-list.html"
                                    ><svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.15579 0.333328H0.332031V6.09093H6.15579V0.333328ZM4.9297 4.8788H1.55806V1.54545H4.9297V4.8788Z"
                                            fill="#505F7D" />
                                        <path
                                            d="M0.332031 13.6667H6.15579V7.90907H0.332031V13.6667ZM1.55811 9.1212H4.92976V12.4545H1.55811V9.1212Z"
                                            fill="#505F7D" />
                                        <path
                                            d="M7.83984 13.6667H13.6636V7.90907H7.83984V13.6667ZM9.06593 9.1212H12.4376V12.4545H9.06593V9.1212Z"
                                            fill="#505F7D" />
                                        <path
                                            d="M13.6636 0.333328H7.83984V6.09093H13.6636V0.333328ZM12.4375 4.8788H9.06587V1.54545H12.4375V4.8788Z"
                                            fill="#505F7D" /></svg
                                    ><span>списком</span></a
                                >
                            </div>
                            <button class="main-sale__filter-btn btn">
                                фильтр
                            </button>
                            <div class="main-sale__filter-wrap">
                                <div class="wrapper-top">
                                    <div
                                        class="wrapper-close main-sale__filter-close"></div>
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
        <div
            ref="room-window"
            id="room_window"
            :class="`flat-list__window ${allDone ? 'active' : ''}`"
            :style="openWindow"
            v-if="allDone">
            <div class="wrap">
                <div class="flat-list__minImg">
                    <picture
                        ><source
                            srcset="img/index/1-k.webp"
                            type="image/webp" />
                        <img src="img/index/1-k.png" alt=""
                    /></picture>
                </div>
                <div class="flat-list__info">
                    <span class="inf">2-комнатная 61,75 м²</span
                    ><span class="price"> 7 080 000 руб.</span>
                </div>
                <a class="mob-btn btn" href="#">подробнее</a
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
<!-- 
<style scoped>
.flat-item {
    margin-top: 48px;
}
.flat-item__back {
    position: relative;
    padding-left: 28px;
}
.flat-item__back svg {
    position: absolute;
    left: 0;
    top: 4px;
    -webkit-transition: left 0.3s;
    transition: left 0.3s;
}
.flat-item__back span {
    font-size: 16px;
    font-weight: 500;
    line-height: 125%;
    letter-spacing: 0.16px;
    color: #505f7d;
}
.flat-item__body {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 40px;
    margin-top: 29px;
    margin-bottom: 100px;
}
.flat-item__static-wrap {
    width: 100%;
    max-width: 947px;
}
.flat-item__sticky-wrap {
    width: 453px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    position: relative;
}
.flat-item__plan {
    width: 100%;
    background-color: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    border-radius: 8px;
}
.flat-item__plan .flat-wrapper-top {
    position: relative;
    padding: 72px 24px 0 72px;
    width: 100%;
    height: 582px;
}
.flat-item__plan .flat-wrapper-top ul {
    width: 100%;
    height: 100%;
}
.flat-item__plan .flat-wrapper-top ul li {
    width: 100%;
    height: 100%;
    display: none;
}
.flat-item__plan .flat-wrapper-top ul li a {
    display: block;
    width: calc(100% - 100px);
    height: 100%;
}
.flat-item__plan .flat-wrapper-top ul li picture {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
}
.flat-item__plan .flat-wrapper-top ul li img {
    -o-object-fit: contain;
    object-fit: contain;
    -o-object-position: center;
    object-position: center;
    width: 100%;
    height: 100%;
}
.flat-item__plan .flat-wrapper-top ul li.active {
    display: block;
}
.flat-item__plan .flat-wrapper-bottom {
    height: 88px;
    width: 100%;
}
.flat-item__plan .flat-wrapper-bottom ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    gap: 28px;
    margin-top: 25px;
}
.flat-item__plan .flat-wrapper-bottom ul li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    gap: 4px;
    cursor: pointer;
}
.flat-item__plan .flat-wrapper-bottom ul li span {
    font-weight: 500;
    letter-spacing: 0.14px;
    color: #505f7d;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
    font-size: 14px;
}
.flat-item__plan .flat-wrapper-bottom ul li svg path {
    -webkit-transition: fill 0.3s;
    transition: fill 0.3s;
}
.flat-item__plan .flat-wrapper-bottom ul li.active span {
    color: #7eb1e3;
}
.flat-item__plan .flat-wrapper-bottom ul li.active svg path {
    fill: #7eb1e3;
}
.flat-item__first-street {
    position: absolute;
    top: 32px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    font-size: 14px;
    font-weight: 400;
    color: #5b585a;
}
.flat-item__second-street {
    position: absolute;
    top: 56%;
    left: 0;
    -webkit-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
    font-size: 14px;
    font-weight: 400;
    color: #5b585a;
}
.flat-item__north {
    position: absolute;
    top: 32px;
    right: 32px;
}
.flat-item__min-plan {
    position: absolute;
    bottom: 0;
    right: 32px;
}
.flat-item__info {
    width: 100%;
    padding: 32px 40px 36px 40px;
    border-radius: 8px;
    background-color: #ffffff;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 32px 40px 36px 40px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    position: sticky;
    top: 138px;
    right: 0;
}
.flat-item__info h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 9px;
    font-family: "Geometria", sans-serif;
}
.flat-item__info h1 sup {
    font-size: 14px;
}
.flat-item__info > span {
    font-size: 20px;
    font-weight: 500;
    color: #5b585a;
}
.flat-item__info > button {
    margin-top: 28px;
    width: 100%;
    background-color: #505f7d;
}
.flat-item__info > button:hover {
    background-color: #6a83b5;
}
.flat-item__floor-num {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid #ece9ea;
}
.flat-item__floor-num > span {
    font-size: 16px;
    font-weight: 400;
    color: #5b585a;
}
.flat-item__floor-num > span:last-child {
    font-weight: 500;
}
.flat-item__params {
    margin-top: 16px;
}
.flat-item__params > span {
    font-size: 16px;
    font-weight: 400;
    color: #5b585a;
}
.flat-item__params ul {
    margin-top: 12px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    gap: 8px;
}
.flat-item__params ul li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 5px 12px;
    gap: 5px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    border-radius: 4px;
}
.flat-item__params ul li.log {
    background-color: #aeb6e1;
}
.flat-item__params ul li.bal {
    background-color: #f6a68d;
}
.flat-item__text {
    margin-top: 100px;
}
.flat-item__text h2 {
    font-size: 28px;
    font-weight: 700;
}
.flat-item__text p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.37em;
    color: #5b585a;
    margin-bottom: 8px;
}
.flat-item__slider {
    margin-top: 48px;
    width: 100%;
    height: 600px;
}
.flat-item__slider .swiper-slide {
    width: 100%;
    height: 100%;
}
.flat-item__slider .swiper-slide picture {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
}
.flat-item__slider .swiper-slide img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
}
.flat-item__slider .swiper__control {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    position: absolute;
    bottom: 24px;
    right: 24px;
    gap: 8px;
    z-index: 2;
}
.flat-item__prev,
.flat-item__next {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
}
.flat-item__prev svg,
.flat-item__next svg {
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
    opacity: 0.6;
}
.flat-item__prev.swiper-button-disabled,
.flat-item__next.swiper-button-disabled {
    opacity: 0.6;
}
.flat-item__prev.swiper-button-disabled svg,
.flat-item__next.swiper-button-disabled svg {
    opacity: 0.6;
}
@media (min-width: 1000px) {
    .flat-item__prev:not(.swiper-button-disabled):hover svg,
    .flat-item__next:not(.swiper-button-disabled):hover svg {
        opacity: 1;
    }
}
.flat-item__prev {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
}

@media (min-width: 1000px) {
    .flat-item__back:hover svg {
        left: -10px;
    }
    .flat-item__plan .flat-wrapper-bottom ul li:hover span {
        color: #7eb1e3;
    }
    .flat-item__plan .flat-wrapper-bottom ul li:hover svg path {
        fill: #7eb1e3;
    }
}
@media (max-width: 1600px) {
    .flat-item__static-wrap {
        max-width: 700px;
    }
    .flat-item__slider {
        height: 449px;
    }
}
@media (max-width: 1365px) {
    .flat-item__body {
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse;
    }
    .flat-item__sticky-wrap {
        width: 100%;
    }
    .flat-item__info {
        position: relative;
        top: 0;
    }
    .flat-item__info > button {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
    }
    .flat-item__static-wrap {
        max-width: 100%;
    }
}
@media (max-width: 700px) {
    .flat-item__plan .flat-wrapper-top {
        padding: 20px;
        height: 350px;
    }
    .flat-item__first-street {
        top: 7px;
    }
    .flat-item__second-street {
        left: -17px;
    }
    .flat-item__min-plan {
        display: none;
    }
    .flat-item__text {
        margin-top: 60px;
    }
    .flat-item__body {
        margin-bottom: 60px;
    }
    .flat-item__slider .swiper__control {
        bottom: 10px;
        right: 10px;
    }
    .flat-item__plan .flat-wrapper-top ul li a {
        width: 100%;
        padding-top: 20px;
    }
}
@media (max-width: 500px) {
    .flat-item__body {
        gap: 20px;
    }
    .flat-item__info {
        padding: 20px;
    }
    .flat-item__info h1 {
        font-size: 26px;
    }
    .flat-item__info > span {
        font-size: 16px;
        font-size: 0;
    }
    .flat-item__info > button {
        width: 100%;
        margin-top: 15px;
    }
    .flat-item__text h2 {
        font-size: 26px;
    }
    .flat-item__text p {
        font-size: 15px;
    }
    .flat-item__slider {
        height: 300px;
        margin-top: 30px;
    }
    .flat-item__back svg {
        top: 0px;
    }
    .flat-item__north {
        right: 5px;
        top: 5px;
        width: 50px;
    }
}
.flat-list {
    margin-bottom: 100px;
}
.flat-list__body {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 40px;
}
.flat-list__wrapper {
    width: 577px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}
.flat-list__wrapper-second > ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-column-gap: 52px;
    -moz-column-gap: 52px;
    column-gap: 52px;
    row-gap: 20px;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.flat-list__wrapper-second > ul li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    gap: 28px;
}
.flat-list__wrapper-second
    > ul
    li
    .flat-list__room:not(.notAvailable, .soldOut):hover {
    background-color: #7eb1e3;
}
.flat-list__wrapper-second > ul li span {
    position: relative;
    font-size: 14px;
    font-weight: 400;
    color: #0d0d0d;
}
.flat-list__wrapper-second > ul li span::before {
    content: "";
    width: 12px;
    height: 1px;
    background-color: #a4a0a2;
    position: absolute;
    top: 9px;
    left: -19px;
}
.flat-list__scheme {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
    gap: 12px;
}
.flat-list__floor {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    padding-left: 30px;
}
.flat-list__floor.first {
    pointer-events: none;
}
.flat-list__floor.first .flat-list__rooms a {
    pointer-events: none;
    background-color: transparent;
    color: transparent;
    border: 1px solid #e1dcde;
}
.flat-list__floor.first .flat-list__rooms a::before {
    content: none;
}
.flat-list__number {
    font-size: 14px;
    font-weight: 400;
    color: #5b585a;
    position: absolute;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
.flat-list__rooms {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 8px;
    position: relative;
    z-index: 2;
}
.flat-list__room {
    width: 40px;
    height: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 4px;
    background-color: #7eb1e3;
    color: #ffffff;
    letter-spacing: 0.14px;
    font-weight: 500;
    font-size: 14px;
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
}
.flat-list__room.soldOut {
    background-color: #ffffff;
}
.flat-list__room.notAvailable {
    background-color: #ffffff;
    position: relative;
}
.flat-list__room.notAvailable::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    content: url("./src/assets/img/icons/lock.svg");
}
.flat-list__room.filter-blocked {
    opacity: 0.5;
    pointer-events: none;
}
.flat-list__plan {
    position: absolute;
    width: 96%;
    height: 138%;
    left: 21px;
    z-index: -1;
    background-color: #ece9ea;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: end;
    border-radius: 8px;
    padding-right: 22px;
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
.flat-list__plan a {
    font-weight: 500;
    font-size: 14px;
    color: #505f7d;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
}
.flat-list .main-sale {
    width: 100%;
}
.flat-list .main-sale__filter {
    padding: 32px 40px 52px 40px;
    border-radius: 8px;
}
.flat-list .main-sale__filter-rooms {
    width: 100%;
    margin-bottom: 10px;
}
.flat-list .main-sale__filter-top {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 32px;
}
.flat-list .main-sale__filter-params-list {
    margin-top: 8px;
}
.flat-list__window {
    opacity: 0;
    visibility: hidden;
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    -webkit-transform: translate(-43%, -110%);
    -ms-transform: translate(-43%, -110%);
    transform: translate(-43%, -110%);
}
.flat-list__window .wrap {
    padding: 12px 20px 12px 8px;
    background-color: #ffffff;
    border-radius: 4px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 8px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.flat-list__window.active {
    opacity: 1;
    visibility: visible;
    z-index: 5;
}
.flat-list__window .triangle {
    position: absolute;
    bottom: -5px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
}
.flat-list__window .mob-close {
    display: none;
}
.flat-list__window .mob-btn {
    display: none;
}
.flat-list__minImg {
    width: 79px;
    height: 60px;
}
.flat-list__minImg img {
    -o-object-fit: contain;
    object-fit: contain;
    -o-object-position: center;
    object-position: center;
    width: 100%;
    height: 100%;
}
.flat-list__info {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    gap: 4px;
}
.flat-list__info span {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.14px;
}
.flat-list__info span.inf {
    color: #0d0d0d;
}
.flat-list__info span.price {
    color: #5b585a;
}

@media (min-width: 1000px) {
    .flat-list__floor:hover .flat-list__plan {
        opacity: 1;
        visibility: visible;
        z-index: 1;
    }
    .flat-list__plan a:hover {
        color: #253750;
    }
    .flat-list__room:not(.soldOut, .notAvailable):hover {
        background-color: #505f7d;
    }
}
@media (max-width: 1130px) {
    .flat-list__body {
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
        -ms-flex-direction: column-reverse;
        flex-direction: column-reverse;
    }
    .flat-list__window {
        opacity: 0;
        visibility: hidden;
        z-index: -1;
        position: fixed;
        bottom: 0;
        top: auto;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        transform: translate(0, 0);
        background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(37, 55, 80, 0.3))
        );
        background: linear-gradient(rgba(37, 55, 80, 0.3));
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: end;
        pointer-events: all;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        overflow: hidden;
    }
    .flat-list__window .wrap {
        width: 100%;
        height: 158px;
        position: relative;
        padding: 16px;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        z-index: 11;
        -webkit-transform: translateY(100%);
        -ms-transform: translateY(100%);
        transform: translateY(100%);
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }
    .flat-list__window .triangle {
        display: none;
    }
    .flat-list__window .mob-close {
        position: absolute;
        right: 16px;
        top: 16px;
        display: block;
    }
    .flat-list__window .mob-btn {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
    }
    .flat-list__window.active {
        opacity: 1;
        visibility: visible;
        z-index: 10;
    }
    .flat-list__window.active .wrap {
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
        -webkit-transition: all 0.6s;
        transition: all 0.6s;
    }
}
@media (max-width: 700px) {
    .flat-list__plan {
        display: none;
    }
    .flat-list__wrapper {
        width: 100%;
        overflow: scroll;
    }
    .flat-list__wrapper-second > ul li span::before {
        top: 7px;
    }
    .flat-list__scheme {
        width: 394px;
        padding-bottom: 20px;
    }
    .flat-list .main-sale__filter {
        padding: 10px;
    }
    .flat-list__room {
        width: 30px;
        height: 30px;
    }
}
</style> -->
