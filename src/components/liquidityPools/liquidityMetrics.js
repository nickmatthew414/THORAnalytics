import React from 'react';
import Grid from '@material-ui/core/Grid';
import LiquidityMetricsCard from './liquidityMetricsCard';



export default function LiquidityMetrics(props) {

    return (
            <Grid container item xs={5} justifyContent="space-between">
                <Grid item xs={6}>
                    <LiquidityMetricsCard title="Daily Active Users" value={props.dailyActiveUsers.toLocaleString()} />
                    <LiquidityMetricsCard title="Impermanent Loss Paid" value={Math.round(props.impermanentLossProtectionPaid).toLocaleString()} margin="2%"/>
                    <LiquidityMetricsCard title="Pool Block Reward" value={props.poolReward.toLocaleString()} margin="2%"/>
                    <LiquidityMetricsCard title="Pool Block Reward" value={props.poolReward.toLocaleString()} margin="2%"/>
                </Grid>
                <Grid item xs={6}>
                    <LiquidityMetricsCard title="Monthly Active Users" value={props.monthlyActiveUsers.toLocaleString()} />
                    <LiquidityMetricsCard title="Pool Activation Countdown" value={props.poolActivationCountdown.toLocaleString()} margin="2%" />
                    <LiquidityMetricsCard title="Temp Slot" value={0} margin="2%"/>
                    <LiquidityMetricsCard title="Pool Block Reward" value={props.poolReward.toLocaleString()} margin="2%"/>
                </Grid>
            </Grid>
    )
}