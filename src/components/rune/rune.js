import React from 'react';
import axios from 'axios';
import Header from '../header';
import ChartCard from '../chartCard';
import { Grid } from '@material-ui/core';
import { torToRune } from '../../library/library';


export default class LiquidityPools extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            switchedRune: 0,
            runePrice: 0,
        }
        this.fetchData();
        // https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest
        console.log(process.env.REACT_APP_COIN_MARKET_CAP);
    }

    componentDidMount() { 
        this.mounted = true; 
    }


    fetchData = () => {
        const globalStatsAPI = 'https://midgard.thorchain.info/v2/stats';
        const networkDataAPI = 'https://midgard.thorchain.info/v2/network';
        const poolsDataAPI = 'https://midgard.thorchain.info/v2/pools';
        // const config = {'Authorization': `Basic ${process.env.REACT_APP_COIN_MARKET_CAP}`};
        // const thorchainSupplyAPI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=bitcoin';

        const getGlobalStats = axios.get(globalStatsAPI);
        const getNetworkData = axios.get(networkDataAPI);
        const getPoolsData = axios.get(poolsDataAPI);
        // const getThorchainSupplyData = axios.get(thorchainSupplyAPI, {headers: config});
        axios.all([getGlobalStats, getNetworkData, getPoolsData]).then(
            axios.spread((...allData) => {
                const globalStatsData = allData[0].data;
                const networkData = allData[1].data;
                const poolsData = allData[2].data;

                let totalNoneRuneTVL = 0;
                for (let i=0; i<poolsData.length; i++) {
                    totalNoneRuneTVL += poolsData[i].assetPriceUSD * torToRune(poolsData[i].assetDepth);
                }

                const switchedRune = torToRune(globalStatsData.switchedRune);
                const runePrice = globalStatsData.runePriceUSD;
                const runeTotalSupply = 226839202.82; // hard-coded for now
                const runeMaxSupply = 500000000;
                const totalActiveBondedRune = torToRune(networkData.bondMetrics.totalActiveBond);
                const totalStandbyBondedRune = torToRune(networkData.bondMetrics.totalStandbyBond);
                const totalPooledRune = torToRune(networkData.totalPooledRune);
                const unusedNativeRune = switchedRune - totalActiveBondedRune - totalStandbyBondedRune - totalPooledRune;
                const nonUpgradedRune = runeTotalSupply - switchedRune;
                const deterministicRune = 3* totalNoneRuneTVL / runeTotalSupply;
                const noncirculatingSupply = runeMaxSupply - runeTotalSupply;

                if (this.mounted) {
                    this.setState({totalNoneRuneTVL, switchedRune, runePrice, totalActiveBondedRune, totalStandbyBondedRune, totalPooledRune, 
                    runeTotalSupply, runeMaxSupply, unusedNativeRune, nonUpgradedRune, noncirculatingSupply});
                }
            })
        )
    }

    render() {
        return (
            <div>
                <Header page="RUNE" />
                <p>{this.state.switchedRune}</p>
                <p>{this.state.runePrice}</p>

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={5}>
                    {this.state.nonUpgradedRune && <ChartCard chart="runeDistribution" data={[this.state.totalActiveBondedRune,
                        this.state.totalStandbyBondedRune, this.state.totalPooledRune, this.state.unusedNativeRune,
                    this.state.nonUpgradedRune]} max={this.state.runeMaxSupply} total={this.state.runeTotalSupply} /> }                    
                    </Grid>
                    <Grid item xs={5}>

                    <Grid item xs={5} />
                    </Grid>
                </Grid>

            </div>
        )
    }
}