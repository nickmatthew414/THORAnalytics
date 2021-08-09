import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import NodeDistributionChart from './network/nodeDistribution';
import SwapDistribution from './liquidityPools/swapsDistribution';


export default class ChartCard extends React.Component {

    returnChart = () => {
        if (this.props.chart === "nodeDistribution") {
            return <NodeDistributionChart data={this.props.data} title={this.props.title} />
        }
        if (this.props.chart === "liquidityDistribution") {
            return <SwapDistribution data={this.props.data} title={this.props.title} />
        }
        return <div></div>
    }

    render() {
        return (
            <Card variant="outlined" style={{backgroundColor: "#3B3F43", borderColor: "#1BE6C8", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <CardHeader title={this.props.title} style={{color: "white", }} 
                        titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
                {this.returnChart()}
            </Card>
        )
    }
}