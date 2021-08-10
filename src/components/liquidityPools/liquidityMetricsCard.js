import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    paper: {
      padding: theme.spacing(1),
      textAlign: 'left',
    backgroundColor: "#0b0b0f",
      borderColor: "#1BE6C8", 
      borderWidth: "1px",
      color: "white",
      width: "98%",
    },
    paperHeader: {
        fontSize: "1vw",
        color: "#1BE6CB",
    },
    paperValue: {
        fontSize: "1vw",
        color: "white",
    }
  }));

export default function LiquidityMetricsCard(props) {

    const classes = useStyles();

    return (
        <Paper variant="outlined" className={classes.paper} style={{marginTop: props.margin}}>
            <Typography classes={{root: classes.paperHeader}}>{props.title}</Typography>
            <Typography classes={{root: classes.paperValue}}>{props.value}</Typography>
        </Paper>
    )
}