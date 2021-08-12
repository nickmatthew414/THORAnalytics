

export function torToRune(tor) {
    return tor / 100000000;
}

export function toPercent(value) {
    return value * 100;
}

export function toPercentString(value) {
    return toPercent(value).toFixed(2) + "%";
}

export function toPriceString(value) {
    return "$" + Number(value).toFixed(2);
}

export function roundToHundreths(value) {
    return value.toFixed(2);
}

export function toMillions(value) {
    return value / 1000000
}

export function toMillionsString(value) {
    return toMillions(value).toFixed(2) + "M";
}

export function shortenedAddress(address) {
    return address.slice(0, 9) + "..." + address.slice(-5, -1); // first and last 4 characters of address
}

// solution modified from: https://stackoverflow.com/questions/36098913/convert-seconds-to-days-hours-minutes-and-seconds
export function blocksToTime(blockCount) {
    let seconds = blockCount * 6;
    let d = Math.floor(seconds / (3600*24));
    let h = Math.floor(seconds % (3600*24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);

    let dDisplay = d + "D "
    let hDisplay = h + "H "
    let mDisplay = m + "M "
    
    return dDisplay + hDisplay + mDisplay;
}