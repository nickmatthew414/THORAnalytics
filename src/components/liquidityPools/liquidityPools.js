import React from 'react';
import axios from 'axios';
import Header from '../header';
import Overview from '../overview';
import { torToRune, roundToHundreths, toMillions } from '../../library/library';


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

        const getNetwork = axios.get(networkAPI);
        const getStats = axios.get(statsAPI);
        const getDailyVolume = axios.get(dailyVolumeAPI);

        axios.all([getNetwork, getStats, getDailyVolume]).then(
            axios.spread((...allData) => {

                const networkData = allData[0].data;
                const statsData = allData[1].data;
                const dailyVolumeData = allData[2].data;

                if (this.mounted) {
                    const totalPooledRune = toMillions(torToRune(networkData.totalPooledRune)).toFixed(1) + "M";
                    const dailyVolume = toMillions(torToRune(dailyVolumeData.intervals[0].totalVolume));
                    const runePrice = statsData.runePriceUSD;
                    const totalVolume = (toMillions(torToRune(statsData.swapVolume * runePrice))/1000).toFixed(2) + "B";
                    const liquidityAPY = roundToHundreths(Number(networkData.liquidityAPY)) + "%";
                    const totalValueLocked = "To Be Done";

                    this.setState({data: {
                        "Total Pooled Rune": totalPooledRune, "Daily Volume": dailyVolume, "Total Volume": totalVolume,
                        "Liquidity APY": liquidityAPY, "Total Value Locked": totalValueLocked,
                    }})
                }
            }
        ))
    };

    render() {
        return (
            <div>
            <Header page="Liquidity Pools" />

                <Overview data={this.state.data}  />

                {/* <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={5}>
                    <ChartCard data={this.state.activeBonds} title={"Active Node Bonds"} />
                    </Grid>
                    <Grid item xs={5}>
                    <ChartCard data={this.state.standbyBonds} title={"Standby Node Bonds"}/>
                    </Grid>
                </Grid> */}

            </div>
        )
    }
}