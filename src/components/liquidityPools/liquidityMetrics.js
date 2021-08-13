import React from 'react';
import Grid from '@material-ui/core/Grid';
import LiquidityMetricsCard from './liquidityMetricsCard';



export default function LiquidityMetrics(props) {

    return (
            <Grid container item xs={5} justifyContent="space-between">
                <Grid item xs={6}>
                    <LiquidityMetricsCard title="Daily Active Users" value={props.dailyActiveUsers.toLocaleString()} />
                    <LiquidityMetricsCard title="Unique Swapper Count" value={props.uniqueSwapperCount.toLocaleString()} margin="2%" />
                    <LiquidityMetricsCard title="Impermanent Loss Paid" value={Math.round(props.impermanentLossProtectionPaid).toLocaleString()} margin="2%"/>
                    <LiquidityMetricsCard title="Pool Block Reward" value={props.poolReward.toLocaleString()} margin="2%"/>
                    <LiquidityMetricsCard title="Add Liquidity Count" value={props.addLiquidityCount.toLocaleString()} margin="2%"/>
                </Grid>
                <Grid item xs={6}>
                    <LiquidityMetricsCard title="Monthly Active Users" value={props.monthlyActiveUsers.toLocaleString()} />
                    <LiquidityMetricsCard title="Pool Activation Countdown" value={Number(props.poolActivationCountdown).toLocaleString()} margin="2%" />
                    <LiquidityMetricsCard title="Pool Block Reward" value={props.poolReward.toLocaleString()} margin="2%"/>
                    <LiquidityMetricsCard title="Daily Swap Count" value={props.swapCount24h.toLocaleString()} margin="2%"/>
                    <LiquidityMetricsCard title="Total Swap Count" value={props.swapCount.toLocaleString()} margin="2%"/>

                </Grid>
            </Grid>
    )
}