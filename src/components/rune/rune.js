import React from 'react';
import axios from 'axios';
import Header from '../header';
import RuneDistribution from './runeDistribution';
import ChartCard from '../chartCard';
import { Grid } from '@material-ui/core';
import { torToRune, toMillionsString } from '../../library/library';


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
        // const config = {'Authorization': `Basic ${process.env.REACT_APP_COIN_MARKET_CAP}`};
        // const thorchainSupplyAPI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=bitcoin';

        const getGlobalStats = axios.get(globalStatsAPI);
        const getNetworkData = axios.get(networkDataAPI);
        // const getThorchainSupplyData = axios.get(thorchainSupplyAPI, {headers: config});
        axios.all([getGlobalStats, getNetworkData]).then(
            axios.spread((...allData) => {
                const globalStatsData = allData[0].data;
                const networkData = allData[1].data;

                const switchedRune = toMillionsString(torToRune(globalStatsData.switchedRune));
                const runePrice = globalStatsData.runePriceUSD;
                const totalActiveBondedRune = torToRune(networkData.bondMetrics.totalActiveBond);
                const totalStandbyBondedRune = torToRune(networkData.bondMetrics.totalStandbyBond);
                const totalPooledRune = torToRune(networkData.totalPooledRune);

                if (this.mounted) {
                    this.setState({switchedRune, runePrice, totalActiveBondedRune, totalStandbyBondedRune, totalPooledRune});
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
                    <ChartCard chart="runeDistribution" />
                    </Grid>
                    <Grid item xs={5}>
                    </Grid>
                </Grid>

            </div>
        )
    }
}