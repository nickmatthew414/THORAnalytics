import React from 'react';
import axios from 'axios';
import Header from '../header';
import ChartCard from '../chartCard';
import Overview from '../overview';
import LiquidityMetrics from './liquidityMetrics';
import PoolsTable from './poolsTable';
import { torToRune, toMillions, toMillionsString, toPercentString, compareDepth } from '../../library/library';
import Grid from '@material-ui/core/Grid';
import AssetColumn from '../assetColumn';

export default class LiquidityPools extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            totalPooledRune: "0",
            liquidityAPY: "0",
            totalValueLocked: "0",
            dailyVolume: "0",
            totalVolume: "0",
            dailyActiveUsers: 0,
            monthlyActiveUsers: 0,
            uniqueSwapperCount: 0,
            swapCount24h: 0,
            swapCount: 0,
            addLiquidityCount: 0,
            impermanentLossProtectionPaid: 0,
            poolReward: 0,
            poolActivationCountdown: 0,
        }
        this.fetchData();
    }


    componentDidMount() { 
        this.mounted = true; 
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
                    const totalPooledRune = torToRune(networkData.totalPooledRune);
                    const dailyVolume = torToRune(dailyVolumeData.intervals[0].totalVolume);
                    const runePrice = statsData.runePriceUSD;
                    const totalVolume = torToRune(statsData.swapVolume * runePrice);
                    const liquidityAPY = Number(networkData.liquidityAPY);
                    const totalValueLocked = torToRune(Number(networkData.bondMetrics.totalActiveBond) + Number(networkData.totalPooledRune)*2) * runePrice;

                    // grab and format swap volume, total rune pooled, asset history, and price history
                    let swapVolume = [];
                    let totalValuePooled = [];
                    let depthHistory = [];
                    let priceHistory = [];
                    for (let i=0; i<swapsData.intervals.length; i++) {
                        let volume = torToRune(swapsData.intervals[i].totalVolume) * runePrice;
                        let pooled = torToRune(tvlData.intervals[i].totalValuePooled) * runePrice;
                        let assetDepth = torToRune(poolHistory.intervals[i].assetDepth);
                        let assetPrice = poolHistory.intervals[i].assetPriceUSD;
                        swapVolume.push(volume);
                        totalValuePooled.push(pooled);
                        depthHistory.push(assetDepth);
                        priceHistory.push(assetPrice);
                    }

                    poolsData.sort(compareDepth);

                    // Data for pool depth pie chart
                    let assetNames = [];
                    let assetVolumes = []
                    let assetTotalValues = [];
                    let assetDominances = [];
                    let assetAPYs = [];
                    let assetPrices = [];
                    let activeAssetData = [];
                    let pendingAssetData = [];
                    for (let i=0; i<poolsData.length; i++) {
                        // asset comes in format CHAIN.ASSET-ADDRESS
                        const assetName = poolsData[i].asset.split("-")[0]
                        const assetVolume = torToRune(poolsData[i].volume24h) * runePrice;
                        const assetTotalValue = torToRune(poolsData[i].runeDepth) * runePrice;
                        // the value of all non-RUNE assets is the same as the value of all pooled RUNE
                        // slicing off the M on totalPooledRune
                        const assetDominance = assetTotalValue / (torToRune(networkData.totalPooledRune) * runePrice);
                        const poolAPY = poolsData[i].poolAPY;
                        const assetPrice = poolsData[i].assetPriceUSD;
                        assetNames.push(assetName);
                        assetTotalValues.push(assetTotalValue);
                        assetDominances.push(assetDominance);
                        assetAPYs.push(poolAPY);
                        assetPrices.push(assetPrice);
                        if (poolsData[i].status === "staged") {
                            pendingAssetData.push({"Asset": assetName, "Daily Volume": assetVolume,
                            "Pool Depth": assetTotalValue, "Pool APY": poolAPY, "Price": assetPrice});
                        } else {
                            activeAssetData.push({"Asset": assetName, "Daily Volume": assetVolume,
                            "Pool Depth": assetTotalValue, "Pool APY": poolAPY, "Price": assetPrice});
                        }
                    }

                    // info for metrics cards
                    const dailyActiveUsers = Number(statsData.dailyActiveUsers);
                    const monthlyActiveUsers = Number(statsData.monthlyActiveUsers);
                    const uniqueSwapperCount = Number(statsData.uniqueSwapperCount);
                    const impermanentLossProtectionPaid = torToRune(statsData.impermanentLossProtectionPaid);
                    const poolReward = Number(networkData.blockRewards.poolReward);
                    const poolActivationCountdown = networkData.poolActivationCountdown;
                    const swapCount24h = Number(statsData.swapCount24h);
                    const swapCount = Number(statsData.swapCount);
                    const addLiquidityCount = Number(statsData.addLiquidityCount);

                    this.setState({ totalPooledRune, dailyVolume, totalVolume, liquidityAPY, totalValueLocked, swapVolume, totalValuePooled, depthHistory, priceHistory,
                        dailyActiveUsers, monthlyActiveUsers, uniqueSwapperCount, impermanentLossProtectionPaid, poolReward, poolActivationCountdown,
                        assetNames, assetVolumes, assetTotalValues, assetDominances, assetAPYs, assetPrices, runePrice, activeAssetData, pendingAssetData,
                        swapCount24h, swapCount, addLiquidityCount
                        })
                }
            }
        ))
    };

    getOverview = () => {
        const totalPooledRune = toMillionsString(this.state.totalPooledRune);
        const dailyVolume = toMillions(this.state.dailyVolume);
        const totalVolume = (toMillions(this.state.totalVolume)/1000).toFixed(2) + "B";
        const liquidityAPY = toPercentString(this.state.liquidityAPY);
        const totalValueLocked = "$" + toMillionsString(this.state.totalValueLocked);
        return (
            <Overview data={{"Total Pooled Rune": totalPooledRune, "Daily Volume": dailyVolume,
            "Total Volume": totalVolume, "Liquidity APY": liquidityAPY, "Total Value Locked": totalValueLocked}}  />
        )
    }

    render() {
        return (
            <div>
            <Header page="Liquidity Pools" />
                {this.getOverview()}

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={1}>
                        <AssetColumn/>
                    </Grid>
                    <Grid item xs={5}>
                    <ChartCard chart="lineGraph" data={this.state.totalValuePooled} title={"Total Value Pooled"} />
                    </Grid>
                    <Grid item xs={5}>
                    <ChartCard chart="liquidityDistribution" data={this.state.swapVolume} title={"Swap Volume"}/>
                    </Grid>
                    <Grid item xs={1}/>
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
                        uniqueSwapperCount={this.state.uniqueSwapperCount} impermanentLossProtectionPaid={this.state.impermanentLossProtectionPaid} poolReward={this.state.poolReward} 
                        poolActivationCountdown={this.state.poolActivationCountdown} swapCount24h={this.state.swapCount24h} swapCount={this.state.swapCount} 
                        addLiquidityCount={this.state.addLiquidityCount} /> 
                    <Grid item xs={5}>
                        {this.state.assetNames && <ChartCard chart="poolSizes" labels={this.state.assetNames} 
                        data={this.state.assetDominances} title="Asset Dominance"
                        assetTotalValues={this.state.assetTotalValues} assetAPYs={this.state.assetAPYs}
                        totalPooledRune={this.state.totalPooledRune} runePrice={this.state.runePrice} />}
                </Grid>

                </Grid>

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={10}>
                    {this.state.assetNames && <PoolsTable tableData={this.state.activeAssetData} title={"Active Pools"} />}
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={10}>
                    {this.state.assetNames && <PoolsTable tableData={this.state.pendingAssetData} title={"Standby Pools"} />}
                    </Grid>
                </Grid>



            </div>
        )
    }
}