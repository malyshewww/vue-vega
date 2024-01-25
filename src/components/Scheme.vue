<script>
export default {
    data: function () {
        return {
            tooltip: {
                isActive: false,
                img: "",
                title: "",
                price: "",
                status: "",
            },
        };
    },
    methods: {
        openTooltip(event, flat) {
            console.log(flat);
            // this.tooltip.img = flat.plan;
            // this.tooltip.title = `${flat.rooms}-комнатная, ${flat.area} м²`;
            // this.tooltip.price = `${Number(flat.price).toLocaleString(
            //     "ru-RU"
            // )} руб.`;
            // this.tooltip.status =
            //     flat.status === "on-sale" ? "в продаже" : "забронирована";
            // // третий статус не нужен, т.к. тултипы не выходят для проданных квартир
            // if (document.body.clientWidth > 1199) {
            //     this.$refs.tooltip.style.left =
            //         event.target.getBoundingClientRect().left -
            //         this.$refs.scheme.getBoundingClientRect().left +
            //         20 +
            //         "px";
            //     this.$refs.tooltip.style.top =
            //         event.target.getBoundingClientRect().top -
            //         this.$refs.scheme.getBoundingClientRect().top +
            //         "px";
            // }
            // this.$refs.tooltip.classList.add("active");
            // this.$refs.tooltipbtn.addEventListener("click", (e) => {
            //     this.$refs.tooltip.classList.remove("active");
            //     this.openPopup(flat, floor);
            // });
        },
        closeTooltip() {
            this.$refs.tooltip.classList.remove("active");
        },
    },
};
</script>
