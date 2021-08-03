import React from 'react';
import { torToRune, toPercent, roundToHundreths } from '../../library/library';
import Header from '../header';
import Overview from '../overview';
import NodeDistributionChart from './nodeDistribution';
import Container from '@material-ui/core/Container';
import ChartCard from '../chartCard'

const fetch = require("node-fetch");


export default class Network extends React.Component {

    constructor(props) {
        super(props);
        // hard coded for now
        this.state = {
            data: {"Active Node Count": "38", "Standby Node Count": "10", "Time To Next Churn": "1D 11H 37M", 
            "Bond APY": "13.3%", "Total Reserve": "37.2M RUNE"},
            size: 2
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
            let bondingAPY = roundToHundreths(toPercent(data.bondingAPY));
            let liquidityAPY = roundToHundreths(toPercent(data.liquidityAPY));
            let totalReserve = roundToHundreths(torToRune(data.totalReserve));
            let activeBonds = data.activeBonds;
            let poolActivationCountDown = data.poolActivationCountDown;
            let poolShareFactor = data.poolShareFactor;

            if (this.mounted) {
                this.setState({activeNodeCount});
                this.setState({totalActiveBond});
                this.setState({standbyNodeCount});
                this.setState({totalPooledRune});
                this.setState({nextChurnHeight});
                this.setState({bondingAPY});
                this.setState({liquidityAPY});
                this.setState({totalReserve});
                this.setState({poolActivationCountDown});
                this.setState({poolShareFactor});


            }
        });
    }

    

    render() {

        return (
            <div>
                <Header page="Network"/>
                <Overview data={this.state.data} size={this.state.size} />
                <Container maxWidth="sm">
                    <ChartCard />
                    {/* <NodeDistributionChart /> */}
                </Container>
                <p>{`Active Node Count: ${this.state.activeNodeCount}`}</p>
                <p>{`Total Active Bond: ${this.state.totalActiveBond}`}</p>
                <p>{`Standby Node Count: ${this.state.standbyNodeCount}`}</p>
                <p>{`Total Rune Pooled: ${this.state.totalPooledRune}`}</p>
                <p>{`Next Churn Height: ${this.state.nextChurnHeight}`}</p>
                <p>{`Bonding APY: ${this.state.bondingAPY}`}</p>
                <p>{`Liquidity APY: ${this.state.liquidityAPY}`}</p>
                <p>{`Total Reserve: ${this.state.totalReserve}`}</p>
                <p>{`${this.state.poolActivationCountDown}`}</p>
                <p>{`${this.state.poolShareFactor}`}</p>
            </div>
        )
    }
}

