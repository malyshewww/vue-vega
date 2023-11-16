import noUiSlider from "nouislider";
export function initRange(element, { ...obj }) {
    noUiSlider.create(element, {
        start: [obj.startMin, obj.startMax],
        step: obj.step,
        connect: true,
        // tooltips: true,
        range: {
            min: obj.min,
            max: obj.max,
        },
    });
}
export const checkboxObj = [
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
];

export function updateSliderRoom(element, obj) {
    element.noUiSlider.on("update", (e, values, handle) => {
        let min = Math.round(e[0]);
        let max = Math.round(e[1]);
        if (!isNaN(min) && !isNaN(max)) {
            // this[handle ? "maxRange" : "minRange"] = parseInt(values[handle]);
            obj.minRange = new Intl.NumberFormat("ru-RU").format(min);
            obj.maxRange = new Intl.NumberFormat("ru-RU").format(max);
        }
    });
}
export function updateSliderArea(element, obj) {
    element.noUiSlider.on("update", (e, values, handle) => {
        let min = e[0];
        let max = e[1];
        if (!isNaN(min) && !isNaN(max)) {
            // this[handle ? "maxRange" : "minRange"] = parseInt(values[handle]);
            obj.minRange = min;
            obj.maxRange = max;
        }
    });
}

export function updateSliderFloor(element, obj) {
    element.noUiSlider.on("update", (e, values, handle) => {
        let min = Math.round(e[0]);
        let max = Math.round(e[1]);
        if (!isNaN(min) && !isNaN(max)) {
            // this[handle ? "maxRange" : "minRange"] = parseInt(values[handle]);
            obj.minRange = new Intl.NumberFormat("ru-RU").format(min);
            obj.maxRange = new Intl.NumberFormat("ru-RU").format(max);
        }
    });
}

export function updateSquareRange(arr, objSlider) {
    let accSquare = [];
    if (arr.length) {
        arr.forEach((item) => {
            accSquare.push(item.field_square);
        });
        objSlider.minRange = accSquare.length
            ? Math.min(...accSquare)
            : objSlider.startMin;
        objSlider.maxRange = accSquare.length
            ? Math.max(...accSquare)
            : objSlider.startMax;
    }
}
export function setNewValue(target, objSlider) {
    target.noUiSlider.set([objSlider.minRange, objSlider.maxRange]);
}
