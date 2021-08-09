import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LiquidityMetricsCard from './liquidityMetricsCard';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));


export default function LiquidityMetrics(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
            <Grid container item xs={5} justifyContent="space-between">
                <Grid item xs={6}>
                    <LiquidityMetricsCard title={"Daily Active Users"} value={props.dailyActiveUsers} />
                </Grid>
                <Grid item xs={6}>
                    <LiquidityMetricsCard title={"Monthly Active Users"} value={props.monthlyActiveUsers} />
                </Grid>
            </Grid>
            <Grid container item xs={5} />
        </Grid>

        <Grid container spacing={2} justifyContent="center" >
            <Grid container item xs={5} justifyContent="space-between">
                <Grid item xs={6}>
                    <LiquidityMetricsCard title={"Impermanent Loss Paid"} value={props.impermanentLossProtectionPaid} />
                </Grid> 
                <Grid item xs={6}>
                    <LiquidityMetricsCard title={"Pool Block Reward"} value={props.poolReward} />
                </Grid>
            </Grid>
            <Grid container item xs={5} />
        </Grid>
    </div>
    )
}