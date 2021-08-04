import React from 'react';
import { torToRune, toPercent, roundToHundreths, toMillions } from '../../library/library';
import Header from '../header';
import Overview from '../overview';
import Box from '@material-ui/core/Box';
import ChartCard from '../chartCard'
import Grid from '@material-ui/core/Grid';
import BondMetricsCard from './bondMetricsCard';

const fetch = require("node-fetch");


export default class Network extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 2,
            data: {"Active Node Count" : '-', "Standby Node Count": "-",
            "Time To Next Churn": "-", "Bond APY": "-", "Total Reserve": "-" },
            activeBondMetrics: ["-", "-", "-", "-"],
            standbyBondMetrics: ["-", "-", "-", "-"],
        };
        this.getNetworkData();
    }

    componentDidMount() { 
        this.mounted = true; 
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
            let liquidityAPY = roundToHundreths(toPercent(data.liquidityAPY));
            let totalReserve = roundToHundreths(toMillions(torToRune(data.totalReserve))) + "M RUNE";
            let activeBonds = data.activeBonds.reverse(); // get from largest to smallest
            let standbyBonds = data.standbyBonds.reverse(); // get from largest to smallest
            let poolActivationCountDown = data.poolActivationCountDown;
            let poolShareFactor = data.poolShareFactor;
            let bondMetrics = data.bondMetrics;
            let activeBondMetrics = [bondMetrics.maximumActiveBond,bondMetrics.minimumActiveBond, bondMetrics.averageActiveBond, 
                bondMetrics.medianActiveBond];
            let standbyBondMetrics = [bondMetrics.maximumStandbyBond, bondMetrics.minimumStandbyBond, bondMetrics.averageStandbyBond, 
                bondMetrics.medianStandbyBond, ];

            if (this.mounted) {
                const data = {"Active Node Count" : activeNodeCount, "Standby Node Count": standbyNodeCount,
                                "Time To Next Churn": nextChurnHeight, "Bond APY": bondingAPY, "Total Reserve": totalReserve };

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

                this.setState({data});
                this.setState({activeBonds});
                this.setState({standbyBonds});
                this.setState({activeBondMetrics});
                this.setState({standbyBondMetrics});

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
                    <Grid container item xs={5} spacing={1} justifyContent="space-between">
                    <Grid item xs={6}>
                        <BondMetricsCard metrics={this.state.activeBondMetrics} nodeType="Active" title="Active Bond Stats" />
                    </Grid>
                    <Grid item xs={6}>
                        <BondMetricsCard metrics={this.state.standbyBondMetrics} nodeType="Standby" title="Standby Bond Stats" />
                    </Grid> 
                    </Grid>
                    <Grid item xs={5} />
                </Grid>
            </div>
        )
    }
}

