import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


export default class ChainStatus extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card variant="outlined" style={{backgroundColor: "#3B3F43", borderColor: "#1BE6C8", display: "flex", 
                flexDirection: "column", alignItems: "left", marginTop: "2%"}}>
            <CardHeader title={this.props.title} style={{color: "white"}} 
                    titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
            <Grid container justifyContent="center">
                <Grid item xs={2}>
                <Typography variant="subtitle2" style={{fontSize: "12px", color: "white"}}>Bitcoin</Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="subtitle2" style={{fontSize: "12px", color: "white"}}>Bitcoin Cash</Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="subtitle2" style={{fontSize: "12px", color: "white"}}>Ethereum</Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="subtitle2" style={{fontSize: "12px", color: "white"}}>Litecoin</Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="subtitle2" style={{fontSize: "12px", color: "white"}}>Binance Chain</Typography>
                </Grid>
            </Grid>

            </Card>
        )
    }
}