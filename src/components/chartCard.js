import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import NodeDistributionChart from './network/nodeDistribution';
import SwapDistribution from './liquidityPools/swapsDistribution';
import PoolSizesChart from './liquidityPools/poolSizes';
import LineGraph from './liquidityPools/lineGraph';
import RuneDistribution from './rune/runeDistribution';
import RunePriceCard from './rune/runePriceCard';
import "../styles/sass/main.scss";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    card: {
        backgroundColor: "#3B3F43",
        borderColor: "#1BE6C8",
        display: "flex",
        flexDirection: "column"
    },
});


export default function ChartCard(props) {

    const classes = useStyles();
    const returnChart = () => {
        if (props.chart === "nodeDistribution") {
            return <NodeDistributionChart data={props.data} title={props.title} />
        }
        if (props.chart === "liquidityDistribution") {
            return <SwapDistribution data={props.data} title={props.title} />
        }
        if (props.chart === "lineGraph") {
            return <LineGraph data={props.data} title={props.title} />
        }
        if (props.chart === "poolSizes") {
            return <PoolSizesChart labels={props.labels} data={props.data} title={props.title} 
            assetTotalValues={props.assetTotalValues} assetAPYs={props.assetAPYs}
            totalPooledRune={props.totalPooledRune} runePrice={props.runePrice} />
        }
        if (props.chart === "runeDistribution") {
            return <RuneDistribution max={props.max} data={props.data} total={props.total} windowSize={props.windowSize} />
        }
        if (props.chart === "runePriceGraph") {
            return <RunePriceCard runePriceOverInterval={props.runePriceOverInterval} 
                deterministicRunePriceOverInterval={props.deterministicRunePriceOverInterval} />

        }
        return <div></div>
    }

    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader title={props.title} className="cardHeader"
                    titleTypographyProps={{variant: "subtitle2"}}></CardHeader>
            {returnChart()}
        </Card>
    )
}