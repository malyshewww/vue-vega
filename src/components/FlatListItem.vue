<script>
import json from "../data.json";
export default {
    props: ["list", "flatsToShow", "totalFlats", "filtered"],
    components: {},
    data() {
        return {
            data: json,
            filter: this.filtered,
        };
    },
    mounted() {
        console.log(this.filter);
    },
    beforeMount() {
        console.log("mount FlatListItem");
    },
};
</script>
<template>
    <li class="main-sale__item" v-for="(flat, index) in flatsToShow">
        <a :href="`/${flat.field_number}`">
            <div class="main-sale__item-img">
                <div class="swiper-wrapper">
                    <div class="swiper-slide img-flat">
                        <picture
                            ><source
                                :srcset="list[index].field_plan_image"
                                type="image/webp" />
                            <img
                                :src="list[index].field_plan_image"
                                :alt="list[index].title"
                        /></picture>
                    </div>
                    <!-- <div class="swiper-slide img-location">
                        <picture
                            ><source
                                srcset="./img/index/1-k-scheme.png"
                                type="image/webp" />
                            <img src="./img/index/1-k-scheme.png" alt=""
                        /></picture>
                    </div> -->
                </div>
            </div>
            <div class="main-sale__item-content">
                <div class="main-sale__item-title">
                    <!-- {{ flat.title }} -->
                    {{ list[index].field_rooms_count }}-комнатная квартира
                    {{ list[index].field_square }} м²
                </div>
                <div class="main-sale__item-text">
                    <span>
                        {{
                            Number(list[index].field_price).toLocaleString(
                                "ru-RU"
                            )
                        }}
                        руб.</span
                    >
                    <span>{{ list[index].field_floor_1 }} этаж</span>
                </div>
                <div class="main-sale__item-link btn-arrow">подробнее</div>
            </div>
            <!-- <div class="main-sale__item-schild">
                <span>французский балкон</span>
            </div> -->
        </a>
    </li>
</template>
