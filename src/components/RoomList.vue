<script>
import NavigationBtn from "./NavigationBtn.vue";
import FieldRooms from "./FieldRooms.vue";
export default {
    components: {
        NavigationBtn,
        FieldRooms,
    },
    data() {
        return {
            selectedRooms: [],
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
        };
    },
    methods: {
        updateSelectedRooms() {
            console.log(this.selectedRooms);
        },
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
                                    <fieldset class="main-sale__filter-rooms">
                                        <legend>Количество комнат</legend>
                                        <ul>
                                            <li
                                                v-for="(
                                                    checkbox, idx
                                                ) in listCheckboxes">
                                                <input
                                                    :id="`rooms-${idx}`"
                                                    type="checkbox"
                                                    :value="checkbox.value"
                                                    @change="
                                                        updateSelectedRooms
                                                    "
                                                    v-model="selectedRooms"
                                                    name="field_rooms_count[]" />
                                                <label :for="`rooms-${idx}`">{{
                                                    checkbox.value
                                                }}</label>
                                            </li>
                                        </ul>
                                    </fieldset>
                                    <fieldset class="main-sale__filter-price">
                                        <legend>Количество комнат</legend>
                                        <div class="filter-slider">
                                            <div class="filter-slider-top">
                                                <span class="filter-slider-from"
                                                    >от<span
                                                        class="filter-slider-from-value"
                                                        data-min="5000000"
                                                        >5000000</span
                                                    ></span
                                                ><span class="filter-slider-to"
                                                    >до<span
                                                        class="filter-slider-to-value"
                                                        data-max="13500000"
                                                        >13500000</span
                                                    ></span
                                                >
                                            </div>
                                            <div
                                                class="filter-slider-line"></div>
                                        </div>
                                    </fieldset>
                                    <fieldset class="main-sale__filter-floor">
                                        <legend>Этаж</legend>
                                        <div class="filter-slider">
                                            <div class="filter-slider-top">
                                                <span class="filter-slider-from"
                                                    >от<span
                                                        class="filter-slider-from-value"
                                                        data-min="2"
                                                        >2</span
                                                    ></span
                                                ><span class="filter-slider-to"
                                                    >до<span
                                                        class="filter-slider-to-value"
                                                        data-max="15"
                                                        >15</span
                                                    ></span
                                                >
                                            </div>
                                            <div
                                                class="filter-slider-line"></div>
                                        </div>
                                    </fieldset>
                                    <fieldset class="main-sale__filter-area">
                                        <legend>Площадь квартиры (м²)</legend>
                                        <div class="filter-slider">
                                            <div class="filter-slider-top">
                                                <span class="filter-slider-from"
                                                    >от<span
                                                        class="filter-slider-from-value"
                                                        data-min="34.5"
                                                        >34.5</span
                                                    ></span
                                                ><span class="filter-slider-to"
                                                    >до<span
                                                        class="filter-slider-to-value"
                                                        data-max="68"
                                                        >68</span
                                                    ></span
                                                >
                                            </div>
                                            <div
                                                class="filter-slider-line"></div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="main-sale__filter-bottom">
                                    <fieldset class="main-sale__filter-params">
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
                                    </fieldset>
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
