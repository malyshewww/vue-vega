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
export function initSwiper(elements) {
    let flatSwiper;
    elements.forEach((el) => {
        flatSwiper = new Swiper(el, {});
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
export function updateFloorRange(arr, objSlider) {
    let accFloor = [];
    if (arr.length) {
        arr.map((item) => {
            accFloor.push(item.field_floor_1);
        });
        objSlider.minRange = accFloor.length
            ? Math.min(...accFloor)
            : objSlider.startMin;
        objSlider.maxRange = accFloor.length
            ? Math.max(...accFloor)
            : objSlider.startMax;
    }
}
export function updateRoomRange(arr, objSlider) {
    let accPrices = [];
    if (arr.length) {
        arr.forEach((item) => {
            accPrices.push(item.field_price);
        });
        objSlider.minRange = accPrices.length
            ? Math.min(...accPrices)
            : objSlider.startMin;
        objSlider.maxRange = accPrices.length
            ? Math.max(...accPrices)
            : objSlider.startMax;
    }
}
export function setNewValue(target, objSlider) {
    target.noUiSlider.set([objSlider.minRange, objSlider.maxRange]);
}
// Обновление минимальных значений в range slider
export function updateMinSliderValue(arr, type, objSlider, selected) {
    let arrMinValue = arr.flatMap((item) => isIncludes(item, type, selected));
    objSlider.minRange = arrMinValue.length
        ? Math.min(...arrMinValue)
        : objSlider.startMin;
}
// Обновление максимальных значений в range slider
export function updateMaxSliderValue(arr, type, objSlider, selected) {
    let arrMaxValue = arr.flatMap((item) => isIncludes(item, type, selected));
    objSlider.maxRange = arrMaxValue.length
        ? Math.max(...arrMaxValue)
        : objSlider.startMax;
}
// Проверка типа слайдера и подстановка необходимых данных
function isIncludes(item, type, selected) {
    let checkType;
    switch (type) {
        case "room":
            checkType = selected.includes(item.room) ? [item.price] : [];
            break;
        case "area":
            checkType = selected.includes(item.room) ? [item.square] : [];
            break;
        case "floor":
            checkType = selected.includes(item.room) ? [item.floor] : [];
            break;
        default:
            break;
    }
    return checkType;
}
