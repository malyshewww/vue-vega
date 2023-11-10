<script>
export default {};
</script>
<template>
    <div ref="flat_window" class="flat-list__window">
        <div class="wrap">
            <slot></slot>
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
</template>
<style></style>
