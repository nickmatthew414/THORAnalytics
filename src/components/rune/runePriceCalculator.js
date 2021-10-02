import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, alpha, createTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { timesMillion, toPriceString } from '../../library/library';
import InfoIcon from '../infoIcon';
import Typography from '@material-ui/core/Typography';
import '../../styles/sass/main.scss';


const theme = createTheme({
    palette: {
      primary: green
    }
  });

const useStyles = makeStyles((theme) => ({
    root: {
        border: '2px solid #17A07B',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
        backgroundColor: '#fff',
        },
        '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
        },
    },
    card: {
        backgroundColor: "#3B3F43",
        borderColor: "#1BE6C8",
        display: "flex",
        flexDirection: "column",
    },
    focused: {},
}));

const runeSupplies = ["Circulating Rune Supply", "Fully Diluted Rune Supply"];

// these will be passed in as props
const runeCirculatingSupply = 220000000  
const fullyDilutedSupply = 500000000  


function CustomTextField(props) {
    const classes = useStyles();
    return <TextField InputLabelProps={{shrink: true }} InputProps={{ classes, disableUnderline: true }} {...props} />;
}


export default function RunePriceCalculator(props) {

    const [runeSupply, setRuneSupply] = React.useState('Circulating Rune Supply');
    const [speculativeMultiplier, setSpeculativeMultiplier] = React.useState(1);
    const [runePrice, setRunePrice] = React.useState("");
    const [deterministicPrice, setDeterministicPrice] = React.useState("");
    const [TVL, setTVL] = React.useState(100); // TVL will be calculated in millions
    const classes = useStyles();


    const handleRuneSupply = (event) => {
        setRuneSupply(event.target.value);
    };

    const handleSpeculativeMultiplier = (event) => {
        setSpeculativeMultiplier(event.target.value);
    }

    const handleTVL = (event) => {
        setTVL(event.target.value);
    }

    const calculateRuneValue = () => {
        let dPrice = timesMillion(TVL * 3);
        if (runeSupply === "Circulating Rune Supply") {
            dPrice = dPrice / runeCirculatingSupply;
        } else {
            dPrice = dPrice / fullyDilutedSupply;
        }
        const rPrice = dPrice * speculativeMultiplier;

        setDeterministicPrice(toPriceString(dPrice));
        setRunePrice(toPriceString(rPrice));

    }

    return (
        <Card variant="outlined" className={classes.card} >
        <CardHeader title={
            // <Box display="flex" justifyItems="center" className={styles.cardHeaderBox}>
            <Box display="flex" justifyItems="center" className="cardHeaderBox">
            <Typography variant="subtitle2">Rune Price Calculator</Typography>
            <InfoIcon info="Calculator for Deterministic and Market Price of Rune.
                            Deterministic Price is approximated as (3 x Non-Rune TVL) / Rune Supply" fontSize="1.5vw"/>
            </Box>
        } titleTypographyProps={{variant:'subtitle2'}} className="cardHeader"></CardHeader>
        <Box display="flex" alignItems="center" justifyContent="space-between" className="textFieldsBox">

            <CustomTextField type="number" id="tvl" 
            label="Non-Rune TVL (M)" 
            value={TVL}
            onChange={handleTVL} 
            variant="filled" />
            <CustomTextField
                id="rune_supply"
                select
                label="Rune Supply"
                value={runeSupply}
                onChange={handleRuneSupply}
                SelectProps={{
                    native: true
                }}
                variant="filled">
            {runeSupplies.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
            ))}
            </CustomTextField>

            <CustomTextField type="number" id="speculative_multiplier"
                label="Speculative Multiplier" 
                value={speculativeMultiplier}
                onChange={handleSpeculativeMultiplier} 
                variant="filled" />

            <Button variant="contained" color="primary" onClick={calculateRuneValue}>
                Calculate
            </Button>

            <Box display="flex" flexDirection="column" className="resultsBox">
            <CustomTextField
                    label="Rune Price"
                    className={classes.margin}
                    value={runePrice}
                    variant="filled"
                    id="rune_output"
            />
            <CustomTextField
                    label="Deterministic Price"
                    className={classes.margin}
                    value={deterministicPrice}
                    variant="filled"
                    id="deterministic_output"
            />
            </Box>
        </Box>

        </Card>
    )
}

