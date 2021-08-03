import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import NodeDistributionChart from './network/nodeDistribution';


export default class ChartCard extends React.Component {


    render() {
        return (
            <Card variant="outlined" style={{width: "80%", backgroundColor: "#3B3F43", borderColor: "#1BE6C8", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <CardHeader title="Active Node Bonds" style={{color: "white", }} 
                        titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
                <NodeDistributionChart />
            </Card>
        )
    }
}