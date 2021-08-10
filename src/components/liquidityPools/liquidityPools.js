import React from 'react';
import axios from 'axios';
import Header from '../header';
import ChartCard from '../chartCard';
import Overview from '../overview';
import LiquidityMetrics from './liquidityMetrics';
import { torToRune, roundToHundreths, toMillions, toPercent } from '../../library/library';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


export default class LiquidityPools extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: { "Total Pooled Rune": "-", "Liquidity APY": "-", 
               "Total Value Locked": "-", "Daily Volume": "-", "Total Volume": "-"
            },
        }
        this.fetchData();
    }


    componentDidMount() { 
        this.mounted = true; 
    }

    // taken from: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    // for sorting liqudity pools by size
    compare(a, b) {
        if (Number(a.runeDepth) > Number(b.runeDepth)) {
            return -1;;
        }
        if (Number(b.runeDepth) > Number(a.runeDepth)){
            return 1;
        }
        return 0;
      }
      
    fetchData = () => {
        const networkAPI = 'https://midgard.thorchain.info/v2/network';
        const statsAPI = 'https://midgard.thorchain.info/v2/stats';
        const dailyVolumeAPI = 'https://midgard.thorchain.info/v2/history/swaps?interval=day&count=1';
        const swapsAPI = 'https://midgard.thorchain.info/v2/history/swaps?interval=day&count=30';
        const tvlAPI = 'https://midgard.thorchain.info/v2/history/tvl?interval=day&count=30';
        const poolHistoryAPI = 'https://midgard.thorchain.info/v2/history/depths/BTC.BTC?interval=day&count=30';  // start with BTC
        const poolsAPI = 'https://midgard.thorchain.info/v2/pools';

        const getNetwork = axios.get(networkAPI);
        const getStats = axios.get(statsAPI);
        const getDailyVolume = axios.get(dailyVolumeAPI);
        const getSwaps = axios.get(swapsAPI);
        const getTVL = axios.get(tvlAPI);
        const getPoolHistory = axios.get(poolHistoryAPI);
        const getPools = axios.get(poolsAPI);

        axios.all([getNetwork, getStats, getDailyVolume, getSwaps, getTVL, getPoolHistory, getPools]).then(
            axios.spread((...allData) => {

                const networkData = allData[0].data;
                const statsData = allData[1].data;
                const dailyVolumeData = allData[2].data;
                const swapsData = allData[3].data;
                const tvlData = allData[4].data;
                const poolHistory = allData[5].data;
                const poolsData = allData[6].data;
 
                if (this.mounted) {
                    const totalPooledRune = toMillions(torToRune(networkData.totalPooledRune)).toFixed(1) + "M";
                    const dailyVolume = toMillions(torToRune(dailyVolumeData.intervals[0].totalVolume));
                    const runePrice = statsData.runePriceUSD;
                    const totalVolume = (toMillions(torToRune(statsData.swapVolume * runePrice))/1000).toFixed(2) + "B";
                    const liquidityAPY = roundToHundreths(toPercent(Number(networkData.liquidityAPY))) + "%";
                    let totalValueLocked = torToRune(Number(networkData.bondMetrics.totalActiveBond) + Number(networkData.totalPooledRune)*2) * runePrice;
                    totalValueLocked = "$" + toMillions(totalValueLocked).toFixed(2) + "M";
                    const impermanentLossProtectionPaid = "$" + Math.round(torToRune(Number(statsData.impermanentLossProtectionPaid))).toLocaleString();

                    // grab and format swap volume, total rune pooled, asset history, and price history
                    let swapVolume = [];
                    let totalValuePooled = [];
                    let depthHistory = [];
                    let priceHistory = [];
                    for (let i=0; i<swapsData.intervals.length; i++) {
                        let volume = swapsData.intervals[i].totalVolume;
                        let pooled = tvlData.intervals[i].totalValuePooled;
                        let assetDepth = poolHistory.intervals[i].assetDepth;
                        let assetPrice = poolHistory.intervals[i].assetPriceUSD
                        volume = Math.round(torToRune(volume) * runePrice);
                        pooled = Math.round(torToRune(pooled) * runePrice);
                        assetDepth = torToRune(assetDepth).toFixed(2);
                        assetPrice = Number(assetPrice).toFixed(2);
                        swapVolume.push(volume);
                        totalValuePooled.push(pooled);
                        depthHistory.push(assetDepth);
                        priceHistory.push(assetPrice);
                    }

                    poolsData.sort(this.compare);
                    console.log(poolsData);

                    // Data for pool depth pie chart
                    let assetNames = [];
                    let assetTotalValues = [];
                    let assetDominances = [];
                    let assetAPYs = [];
                    let assetPrices = [];
                    for (let i=0; i<poolsData.length; i++) {
                        // asset comes in format CHAIN.ASSET-ADDRESS
                        const assetName = poolsData[i].asset.split("-")[0]
                        const assetTotalValue = torToRune(poolsData[i].runeDepth) * runePrice;
                        // the value of all non-RUNE assets is the same as the value of all pooled RUNE
                        // slicing off the M on totalPooledRune
                        const assetDominance = assetTotalValue / (torToRune(networkData.totalPooledRune) * runePrice);
                        const poolAPY = poolsData[i].poolAPY;
                        assetNames.push(assetName);
                        assetTotalValues.push(assetTotalValue);
                        assetDominances.push(assetDominance);
                        assetAPYs.push(poolAPY);
                        assetPrices.push(poolsData[i].assetPriceUSD);
                    }
                    console.log(assetNames)
                    console.log(assetDominances);

                    this.setState({data: {
                        "Total Pooled Rune": totalPooledRune, "Daily Volume": dailyVolume, "Total Volume": totalVolume,
                        "Liquidity APY": liquidityAPY, "Total Value Locked": totalValueLocked,
                        }, swapVolume, totalValuePooled, depthHistory, priceHistory,
                        dailyActiveUsers: statsData.dailyActiveUsers, monthlyActiveUsers: statsData.monthlyActiveUsers, 
                        uniqueSwapperCount: statsData.uniqueSwapperCount, impermanentLossProtectionPaid: impermanentLossProtectionPaid,
                        poolReward: networkData.blockRewards.poolReward, poolActivationCountdown: networkData.poolActivationCountdown,
                        assetNames, assetTotalValues, assetDominances, assetAPYs, assetPrices
                        })
                }
            }
        ))
    };

    render() {
        return (
            <div>
            <Header page="Liquidity Pools" />

                <Overview data={this.state.data}  />

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={5}>
                    <ChartCard chart="lineGraph" data={this.state.totalValuePooled} title={"Total Value Pooled"} />
                    </Grid>
                    <Grid item xs={5}>
                    <ChartCard chart="liquidityDistribution" data={this.state.swapVolume} title={"Swap Volume"}/>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={5}>
                        <ChartCard chart="lineGraph" data={this.state.priceHistory} title={"Asset Price"}/>
                    </Grid>
                    <Grid item xs={5}>
                    <ChartCard chart="liquidityDistribution" data={this.state.depthHistory} title={"Asset Depth History"} />
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                <LiquidityMetrics dailyActiveUsers={this.state.dailyActiveUsers} monthlyActiveUsers={this.state.monthlyActiveUsers}
                    impermanentLossProtectionPaid={this.state.impermanentLossProtectionPaid} poolReward={this.state.poolReward} 
                    poolActivationCountdown={this.state.poolActivationCountdown} />
                <Grid item xs={5}>
                    {this.state.assetNames && <ChartCard chart="poolSizes" labels={this.state.assetNames} 
                        data={this.state.assetDominances} title="Asset Dominance"
                        assetTotalValues={this.state.assetTotalValues} assetPrices={this.state.assetPrices}/>}
                </Grid>

                </Grid>


            </div>
        )
    }
}