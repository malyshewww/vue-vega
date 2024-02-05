<script>
import { checkboxObj } from "../helpers/utils";

export default {
    props: ["updateScheme"],
    components: {},
    data() {
        return {
            listCheckboxes: checkboxObj,
        };
    },
    methods: {
        updateCheckboxes(e) {
            this.$emit("updateCheckboxes", e.target);
            this.$emit("getArrCheckboxes", this.$refs.inputCheck);
        },
    },
    mounted() {
        this.$emit("getArrCheckboxes", this.$refs.inputCheck);
    },
};
</script>
<template>
    <fieldset class="main-sale__filter-rooms">
        <legend>Количество комнат</legend>
        <ul>
            <li v-for="(checkbox, index) in listCheckboxes">
                <input
                    ref="inputCheck"
                    :id="`rooms-${index}`"
                    type="checkbox"
                    :value="checkbox.value"
                    @change="updateCheckboxes"
                    name="field_rooms_count[]" />
                <label :for="`rooms-${index}`">{{ checkbox.value }}</label>
            </li>
        </ul>
    </fieldset>
</template>
