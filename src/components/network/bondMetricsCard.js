import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


export default class BondMetricsCard extends React.Component {

    cardContentMaker = (metricsValues, node_type) => {
        let content = [];
        let metrics = ["Maximum", "Minimum", "Average", "Median", ];
        for (let i=0; i<metrics.length; i++) {
            content.push(
                <Box display="flex" justifyContent="space-between">
                    <p>{`${metrics[i]} ${node_type} Bond: `}</p> 
                    <p>{`${metricsValues[i]}`}</p>
                    <br></br>
                </Box>
            )
        }
        return content;
    }

    render() {
        return (
            <Card variant="outlined" style={{backgroundColor: "#3B3F43", borderColor: "#1BE6C8", display: "flex", flexDirection: "column", alignItems: "left"}}>
                <Grid container>
                <Grid item xs={6}>
                <CardHeader title={'Active Node Metrics'} style={{color: "white"}} 
                        titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
                <CardContent style={{color: "white", fontSize: "1vw"}} key={1}>
                {this.cardContentMaker(this.props.activeMetrics, "Active")}
                </CardContent>
                </Grid>
                <Grid item xs={6}>
                <CardHeader title={'Standby Node Metrics'} style={{color: "white"}} 
                        titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
                <CardContent style={{color: "white", fontSize: "1vw"}} key={1}>
                {this.cardContentMaker(this.props.standbyMetrics, "Standby")}
                </CardContent> 
                </Grid>
                </Grid>
            </Card>
        )
    }
}