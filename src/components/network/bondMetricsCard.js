import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';


export default class BondMetricsCard extends React.Component {

    constructor(props) {
        super(props);
    }

    cardContentMaker = () => {
        let content = [];
        let metrics = ["Maximum", "Minimum", "Average", "Median", ];
        for (let i=0; i<metrics.length; i++) {
            content.push(
                <CardContent style={{color: "white", fontSize: "12px"}} key={i}>
                    {`${metrics[i]} ${this.props.nodeType} Bond: ${this.props.metrics[i]}`}
                </CardContent>
            )
        }
        return content;
    }

    render() {
        return (
            <Card variant="outlined" style={{backgroundColor: "#3B3F43", borderColor: "#1BE6C8", display: "flex", flexDirection: "column", alignItems: "left"}}>
                <CardHeader title={this.props.title} style={{color: "white"}} 
                        titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
                    {this.cardContentMaker()}
            </Card>
        )
    }
}