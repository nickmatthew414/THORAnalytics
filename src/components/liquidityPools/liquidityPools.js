import React from 'react';
import axios from 'axios';
import Header from '../header';
import ChartCard from '../chartCard';
import Overview from '../overview';
import { torToRune, roundToHundreths, toMillions, toPercent } from '../../library/library';
import Grid from '@material-ui/core/Grid';


export default class LiquidityPools extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: { "Total Pooled Rune": "-", "Liquidity APY": "-", 
               "Total Value Locked": "-", "Daily Volume": "-", "Total Volume": "-"
            }
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

        const getNetwork = axios.get(networkAPI);
        const getStats = axios.get(statsAPI);
        const getDailyVolume = axios.get(dailyVolumeAPI);
        const getSwaps = axios.get(swapsAPI);
        const getTVL = axios.get(tvlAPI);

        axios.all([getNetwork, getStats, getDailyVolume, getSwaps, getTVL]).then(
            axios.spread((...allData) => {

                const networkData = allData[0].data;
                const statsData = allData[1].data;
                const dailyVolumeData = allData[2].data;
                const swapsData = allData[3].data;
                const tvlData = allData[4].data;

                if (this.mounted) {
                    const totalPooledRune = toMillions(torToRune(networkData.totalPooledRune)).toFixed(1) + "M";
                    const dailyVolume = toMillions(torToRune(dailyVolumeData.intervals[0].totalVolume));
                    const runePrice = statsData.runePriceUSD;
                    const totalVolume = (toMillions(torToRune(statsData.swapVolume * runePrice))/1000).toFixed(2) + "B";
                    const liquidityAPY = roundToHundreths(toPercent(Number(networkData.liquidityAPY))) + "%";
                    const totalValueLocked = "To Be Done";

                    // grab and format swap volume and total rune pooled
                    let swapVolume = []
                    let totalValuePooled = []
                    for (let i=0; i<swapsData.intervals.length; i++) {
                        let volume = swapsData.intervals[i].totalVolume;
                        let pooled = tvlData.intervals[i].totalValuePooled;
                        volume = Math.round(torToRune(volume) * runePrice);
                        pooled = Math.round(torToRune(pooled) * runePrice);
                        swapVolume.push(volume);
                        totalValuePooled.push(pooled);
                    }

                    this.setState({data: {
                        "Total Pooled Rune": totalPooledRune, "Daily Volume": dailyVolume, "Total Volume": totalVolume,
                        "Liquidity APY": liquidityAPY, "Total Value Locked": totalValueLocked,
                        }, swapVolume, totalValuePooled
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
                    <ChartCard chart="liquidityDistribution" data={this.state.totalValuePooled} title={"Total Value Pooled"} />
                    </Grid>
                    <Grid item xs={5}>
                    <ChartCard chart="liquidityDistribution" data={this.state.swapVolume} title={"Swap Volume"}/>
                    </Grid>
                </Grid>

            </div>
        )
    }
}