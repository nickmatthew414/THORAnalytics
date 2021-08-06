import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/Styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#17A07B',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
    table: {
      width: "100%",
    },
  });


export default function ChainStatus(props)  {

    const classes = useStyles();

    const getTableRow = (chain) => {

        const getHaltedText = (bool) => {
            if (bool) {
                return <Typography variant="subtitle2" style={{color: "red"}} key={2}>{"Halted"}</Typography>
            }
            return <Typography variant="subtitle2" style={{color: "#17A07B"}} key={2}>{"Active"}</Typography> 
        }

        let chains = {"BTC": "Bitcoin", "BCH": "Bitcoin Cash", "BNB": "Binance", "LTC": "Litecoin", "ETH": "Ethereum"};
        let chainName = chains[chain.chain];
        return (
            <StyledTableRow key={chainName}>
              <StyledTableCell component="th" align="center" key={1}>{chainName}</StyledTableCell>
              <StyledTableCell align="center" key={2}>{getHaltedText(chain.halted)}</StyledTableCell>
              <StyledTableCell align="center" key={3}>{chain.gas_rate}</StyledTableCell>
            </StyledTableRow>
        )
    }

    return (
        <Card variant="outlined" style={{backgroundColor: "#0f674d", borderColor: "#1BE6C8", marginTop: "2%"}}>
            <CardHeader title="Chains Status" style={{color: "white" , textAlign: "center"}} 
                        titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" key={1}>Chain</StyledTableCell>
                            <StyledTableCell align="center" key={2}>Status</StyledTableCell>
                            <StyledTableCell align="center" key={3}>Gas Rate</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.chainsStatus && props.chainsStatus.map((chain) => (
                        getTableRow(chain)
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}