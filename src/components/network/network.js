import React from 'react';
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

const fetch = require("node-fetch");


export default class Network extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 2,
            data: {"Active Node Count" : '-', "Standby Node Count": "-",
             "Bond APY": "-", "Total Reserve": "-", "Time To Next Churn": "-" },
            activeBondMetrics: ["-", "-", "-", "-"],
            standbyBondMetrics: ["-", "-", "-", "-"],
            bondHistoryInterval: "week",
            bondHistoryCount: "15",
            incentivePendulumData: [],
            incentivePendulumImbalance: "-",
            optimalLine: 0,
        };
        this.getNetworkData();
        this.getNodeBondHistory();
        this.getInboundAddresses();
        this.getNodes();
        this.getLastBlock();
    }

    componentDidMount() { 
        this.mounted = true; 
      }

    getLastBlock = () => {
        fetch("https://midgard.thorchain.info/v2/thorchain/lastblock")
        .then(response => response.json())
        .then(data => {
            if (this.mounted) {
                // hacky solution grabbed last height from BNB chain. Need a better solution
                let blocksToNextChurn = this.state.nextChurnHeight - data[1].last_signed_out;
                let timeToNextChurn = blocksToTime(blocksToNextChurn);
                let newData = {...this.state.tempData, "Time To Next Churn": timeToNextChurn}
                this.setState({data: newData});
            }
        })
    }

    getNodes = () => {
        fetch("https://midgard.thorchain.info/v2/thorchain/nodes")
        .then(response => response.json())
        .then(data => {
            if (this.mounted) {
                let activeNodesData = [];
                let standbyNodesData = [];
                for (let i=0; i<data.length; i++) {
                    if (data[i].status === "Active") {
                        activeNodesData.push(data[i]);
                    } else if (data[i].status === "Standby" ) {
                        standbyNodesData.push(data[i]);
                    }
                }
                this.setState({activeNodesData: activeNodesData});
                this.setState({standbyNodesData: standbyNodesData});
            }
        })
    }

    getNodeBondHistory = () => {
        fetch(`https://midgard.thorchain.info/v2/history/tvl`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let valueBondedHistory = Math.round(torToRune(data.intervals.totalValueBonded)).toLocaleString();
            
            if (this.mounted) {
                this.setState({valueBondedHistory})
            }

        });
    }

    getInboundAddresses = () => {
        fetch("https://midgard.thorchain.info/v2/thorchain/inbound_addresses")
        .then(response => response.json())
        .then(data => {
            if (this.mounted) {
                this.setState({chainsStatus: data})
            }
        })
    }

    getNetworkData = () => {
        fetch('https://midgard.thorchain.info/v2/network')
        .then(response => response.json())
        .then(data => {
            let activeNodeCount = data.activeNodeCount;
            let totalActiveBond = roundToHundreths(torToRune(data.bondMetrics.totalActiveBond));
            let standbyNodeCount = data.standbyNodeCount;
            let totalPooledRune = roundToHundreths(torToRune(data.totalPooledRune));
            let nextChurnHeight = data.nextChurnHeight;
            let bondingAPY = roundToHundreths(toPercent(data.bondingAPY)) + "%";
            let totalReserve = roundToHundreths(toMillions(torToRune(data.totalReserve))) + "M RUNE";
            let activeBonds = data.activeBonds.reverse(); // get from largest to smallest
            let standbyBonds = data.standbyBonds.reverse(); // get from largest to smallest
            let bondMetrics = data.bondMetrics;
            let activeBondMetrics = [bondMetrics.maximumActiveBond,bondMetrics.minimumActiveBond, bondMetrics.averageActiveBond, 
                bondMetrics.medianActiveBond];
            let standbyBondMetrics = [bondMetrics.maximumStandbyBond, bondMetrics.minimumStandbyBond, bondMetrics.averageStandbyBond, 
                bondMetrics.medianStandbyBond];


            if (this.mounted) {

                /* a bad solution. Making this temp data and setting it to state.data once we get block height in 
                 other api call. Need to convert them into a single process so we don't have redundant temp data */
                const tempData = {"Active Node Count" : activeNodeCount, "Standby Node Count": standbyNodeCount,
                                "Bond APY": bondingAPY, "Total Reserve": totalReserve };

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
                let bondPercentage = totalActiveBond / (Number(totalActiveBond) + Number(totalPooledRune));
                let LPPercentage = totalPooledRune / (Number(totalActiveBond) + Number(totalPooledRune));
                let incentivePendulumData = [bondPercentage, LPPercentage];
                let incentivePendulumImbalance = Math.abs(((bondPercentage  - 2/3) * 100).toFixed(2));
                let optimalLine = incentivePendulumData[1] - 1/3;

                this.setState({tempData});
                this.setState({nextChurnHeight})
                this.setState({activeBonds});
                this.setState({standbyBonds});
                this.setState({activeBondMetrics});
                this.setState({standbyBondMetrics});
                this.setState({totalActiveBond});
                this.setState({totalPooledRune});
                this.setState({incentivePendulumData});
                this.setState({incentivePendulumImbalance});
                this.setState({optimalLine})

            }
        });
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
                    <Grid item xs={6}>
                        <BondMetricsCard metrics={this.state.activeBondMetrics} nodeType="Active" title="Active Bond Stats" />
                    </Grid>
                    <Grid item xs={6} >
                        <BondMetricsCard metrics={this.state.standbyBondMetrics} nodeType="Standby" title="Standby Bond Stats" />
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

