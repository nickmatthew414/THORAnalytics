

export function torToRune(tor) {
    return tor / 100000000;
}

export function toPercent(value) {
    return value * 100;
}

export function roundToHundreths(value) {
    return value.toFixed(2);
}

export function toMillions(value) {
    return value / 1000000
}