<script>
export default {
    props: ["listCheckboxes", "checkbox"],
    components: {},
    data() {
        return {
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
        selectedRooms() {
            this.$emit("countSelectedRooms", this.value);
        },
    },
};
</script>
<template>
    <li>
        <input
            :id="`rooms-${idx}`"
            type="checkbox"
            :value="checkbox.value"
            @change="updateSelectedRooms"
            name="field_rooms_count[]" />
        <label :for="`rooms-${idx}`">{{ checkbox.value }}</label>
    </li>
</template>
