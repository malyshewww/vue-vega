<script>
export default {
    props: ["list"],
    mounted() {},
};
</script>
<template>
    <ul class="main-sale__list">
        <li class="main-sale__item" v-for="flat in list">
            <a href="flat-item.html">
                <div class="main-sale__item-img">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide img-flat">
                            <picture
                                ><source
                                    :srcset="flat.field_plan_image"
                                    type="image/webp" />
                                <img
                                    :src="flat.field_plan_image"
                                    :alt="flat.title"
                            /></picture>
                        </div>
                        <div class="swiper-slide img-location">
                            <picture
                                ><source
                                    srcset="img/index/1-k-scheme.webp"
                                    type="image/webp" />
                                <img src="./img/index/1-k-scheme.png" alt=""
                            /></picture>
                        </div>
                    </div>
                </div>
                <div class="main-sale__item-content">
                    <div class="main-sale__item-title">
                        <!-- {{ flat.title }} -->
                        {{ flat.field_rooms_count }}-комнатная квартира
                        {{ flat.field_square }} м²
                    </div>
                    <div class="main-sale__item-text">
                        <span
                            >{{
                                Number(flat.field_price).toLocaleString("ru-RU")
                            }}
                            руб.</span
                        >
                        <span>{{ flat.field_floor_1 }} этаж</span>
                    </div>
                    <div class="main-sale__item-link btn-arrow">подробнее</div>
                </div>
                <!-- <div class="main-sale__item-schild">
                    <span>французский балкон</span>
                </div> -->
            </a>
        </li>
    </ul>
</template>
