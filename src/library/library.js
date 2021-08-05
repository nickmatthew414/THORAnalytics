

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

export function shortenedAddress(address) {
    return address.slice(0, 9) + "..." + address.slice(-5, -1); // first and last 4 characters of address
}