const fetch = require("node-fetch");


export async function getNetwork() {
    fetch('https://midgard.thorchain.info/v2/network')
    .then(response => response.json())
    .then(data => {
        return data;
        });
}


export async function getInboundAddresses() {
    fetch("https://midgard.thorchain.info/v2/thorchain/inbound_addresses")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}


export async function getTVLHistory() {
    fetch("https://midgard.thorchain.info/v2/history/tvl")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}


export async function getNodes() {
    fetch("https://midgard.thorchain.info/v2/thorchain/nodes")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}


export async function getLastBlock() {
    fetch("https://midgard.thorchain.info/v2/thorchain/lastblock")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}


