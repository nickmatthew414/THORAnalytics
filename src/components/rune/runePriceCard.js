import RunePriceGraph from './runePriceGraph';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { toPriceString, roundToHundreths } from '../../library/library';


const useStyles = makeStyles({
    paper: {
        backgroundColor: 'transparent',
    },
    tableCell: {
        fontSize: ".8vw",
        color: "white",
    },
    tableRow: {
        height: 30,
    }
  });

export default function RunePriceCard(props) {

    const classes = useStyles();
    const runePrice = props.runePriceOverInterval[props.runePriceOverInterval.length - 1];
    const deterministicRunePrice = props.deterministicRunePriceOverInterval[props.deterministicRunePriceOverInterval.length - 1];
    const speculativeMultiplier = runePrice / deterministicRunePrice;

    return (
        <Box display="flex" style={{gap: "2%", margin: "3%"}}>
        <div style={{position: "relative", width: "80%"}}>
        <RunePriceGraph runePriceOverInterval={props.runePriceOverInterval} 
                deterministicRunePriceOverInterval={props.deterministicRunePriceOverInterval} />
        </div>

        <TableContainer className={classes.paper} component={Paper} style={{width: "20%"}}>
        <Table>
            <TableBody>
            <TableRow key={1} >
                <TableCell className={classes.tableCell} align="left">
                    {`Rune Price: ${toPriceString(runePrice)}`}
                </TableCell>
            </TableRow>
            <TableRow key={2} >
                <TableCell className={classes.tableCell} align="left">
                    {`Deterministic Price: ${toPriceString(deterministicRunePrice)}`}
                </TableCell>
            </TableRow>
            <TableRow key={3}>
            <TableCell className={classes.tableCell} align="left">
                    {`Speculative Multiplier: ${roundToHundreths(speculativeMultiplier)}x`}
                </TableCell> 
            </TableRow>

            </TableBody>
        </Table>
        </TableContainer>
      </Box>
    )
}