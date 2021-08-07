import React from 'react';
import axios from 'axios';
import { torToRune, toPercent, roundToHundreths, toMillions, blocksToTime } from '../../library/library';
import Header from '../header';
import Overview from '../overview';
import ChartCard from '../chartCard'
import Grid from '@material-ui/core/Grid';
import BondMetricsCard from './bondMetricsCard';
import IncentivePendulum from './incentivePendulum';
import ChainStatus from './chainsStatus';
import NodeTable from './nodeTable';
import BondHistory from './bondHistory';



export default class Network extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 2,
            data: {"Active Node Count" : '-', "Standby Node Count": "-", "Time To Next Churn": "-",
             "Bond APY": "-", "Total Reserve": "-"},
            activeBondMetrics: ["-", "-", "-", "-"],
            standbyBondMetrics: ["-", "-", "-", "-"],
            bondHistoryInterval: "week",
            bondHistoryCount: "15",
            incentivePendulumData: [],
            incentivePendulumImbalance: "-",
            optimalLine: 0,
        };
        this.fetchData();
    }

    componentDidMount() { 
        this.mounted = true; 
      }

    fetchData = () => {
        const networkAPI = 'https://midgard.thorchain.info/v2/network';
        const ChainsStatusAPI = 'https://midgard.thorchain.info/v2/thorchain/inbound_addresses';
        const nodesAPI = 'https://midgard.thorchain.info/v2/thorchain/nodes';
        const lastBlockAPI = 'https://midgard.thorchain.info/v2/thorchain/lastblock';

        const getNetwork = axios.get(networkAPI);
        const getChainsStatus = axios.get(ChainsStatusAPI);
        const getNodes = axios.get(nodesAPI);
        const getLastBlock = axios.get(lastBlockAPI);

        axios.all([getNetwork, getChainsStatus, getNodes, getLastBlock]).then(
            axios.spread((...allData) => {
                const networkData = allData[0].data;
                const chainsStatus = allData[1].data;
                const nodesData = allData[2].data;
                const lastBlockData = allData[3].data;

                if (this.mounted) {

                    // network data
                    const activeNodeCount = networkData.activeNodeCount;
                    const totalActiveBond = roundToHundreths(torToRune(networkData.bondMetrics.totalActiveBond));
                    const standbyNodeCount = networkData.standbyNodeCount;
                    const totalPooledRune = roundToHundreths(torToRune(networkData.totalPooledRune));
                    const nextChurnHeight = networkData.nextChurnHeight;
                    const bondingAPY = roundToHundreths(toPercent(networkData.bondingAPY)) + "%";
                    const totalReserve = roundToHundreths(toMillions(torToRune(networkData.totalReserve))) + "M RUNE";
                    const activeBonds = networkData.activeBonds.reverse(); // get from largest to smallest
                    const standbyBonds = networkData.standbyBonds.reverse(); // get from largest to smallest
                    const bondMetrics = networkData.bondMetrics;
                    const activeBondMetrics = [bondMetrics.maximumActiveBond,bondMetrics.minimumActiveBond, bondMetrics.averageActiveBond, 
                        bondMetrics.medianActiveBond];
                    const standbyBondMetrics = [bondMetrics.maximumStandbyBond, bondMetrics.minimumStandbyBond, bondMetrics.averageStandbyBond, 
                        bondMetrics.medianStandbyBond];

                    for (let i=0; i<activeBonds.length; i++) {
                        activeBonds[i] = torToRune(activeBonds[i])
                    }
                    for (let i=0; i<standbyBonds.length; i++) {
                        standbyBonds[i] = torToRune(standbyBonds[i])
                    }

                    // convert to rune, round to int, add commas to numbers
                    for (let i=0; i<activeBondMetrics.length; i++) {
                        activeBondMetrics[i] = Math.round(torToRune(activeBondMetrics[i])).toLocaleString();
                        standbyBondMetrics[i] = Math.round(torToRune(standbyBondMetrics[i])).toLocaleString();
                    }

                    const bondPercentage = totalActiveBond / (Number(totalActiveBond) + Number(totalPooledRune));
                    const LPPercentage = totalPooledRune / (Number(totalActiveBond) + Number(totalPooledRune));
                    const incentivePendulumData = [bondPercentage, LPPercentage];
                    const incentivePendulumImbalance = Math.abs(((bondPercentage  - 2/3) * 100).toFixed(2));
                    const optimalLine = incentivePendulumData[1] - 1/3;


                    // nodes data
                    let activeNodesData = [];
                    let standbyNodesData = [];
                    for (let i=0; i<nodesData.length; i++) {
                        if (nodesData[i].status === "Active") {
                            activeNodesData.push(nodesData[i]);
                        } else if (nodesData[i].status === "Standby" ) {
                            standbyNodesData.push(nodesData[i]);
                        }
                    }


                    // last block data
                    const blocksToNextChurn = nextChurnHeight - lastBlockData[1].last_signed_out;
                    const timeToNextChurn = blocksToTime(blocksToNextChurn);

                    // finally setting state
                    this.setState({activeBonds, standbyBonds, activeBondMetrics, standbyBondMetrics, totalActiveBond,
                        totalPooledRune, incentivePendulumData, incentivePendulumImbalance, optimalLine,
                        chainsStatus, activeNodesData, standbyNodesData, data: {
                            "Active Node Count": activeNodeCount, "Standby Node Count": standbyNodeCount,
                            "Time to Next Churn": timeToNextChurn, "Bond APY": bondingAPY, "Total Reserve": totalReserve
                        }});
                }
            })
        )
    }

    render() {

        return (
            <div>
                <Header page="Network"/>

                <Overview data={this.state.data} size={this.state.size} />

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={5}>
                    <ChartCard data={this.state.activeBonds} title={"Active Node Bonds"} />
                    </Grid>
                    <Grid item xs={5}>
                    <ChartCard data={this.state.standbyBonds} title={"Standby Node Bonds"}/>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid container item xs={5} justifyContent="space-between">
                        <Grid item xs={12}>
                            <BondMetricsCard activeMetrics={this.state.activeBondMetrics} standbyMetrics={this.state.standbyBondMetrics} />
                        </Grid> 
                    <BondHistory />

                    </Grid>
                    <Grid item xs={5} >
                        <IncentivePendulum imbalance={this.state.incentivePendulumImbalance} data={this.state.incentivePendulumData}
                            optimalLine={this.state.optimalLine} />
                        <ChainStatus chainsStatus={this.state.chainsStatus} />
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                    <Grid item xs={5}>
                        <NodeTable title="Active Nodes" nodeData={this.state.activeNodesData} />
                    </Grid>
                    <Grid item xs={5}>
                        <NodeTable title="Standby Nodes" nodeData={this.state.standbyNodesData} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

