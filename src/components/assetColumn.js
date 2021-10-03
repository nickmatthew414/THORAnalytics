import bitcoin_cash from '../assets/bitcoin_cash_logo.png';
import bitcoin from '../assets/bitcoin_logo.png';
import bnb from '../assets/bnb_logo.png';
import litecoin from '../assets/litecoin_logo.svg';
import ethereum from '../assets/ethereum_logo.png';
import Box from '@material-ui/core/Box';
import "../styles/sass/main.scss";


export default function AssetColumn() {

    const size = "80%";
    
    return (
        <Box display="flex" className="assetColumn">
        <div><img src={bitcoin} alt="bitcoin logo" width={size} height={size} ></img></div>
        <div><img src={ethereum} alt="ethereum logo" width={size} height={size} ></img></div>
        <div><img src={bnb} alt="bnb logo" width={size} height={size} ></img></div>
        <div><img src={litecoin} alt="litecoin logo" width={size} height={size} ></img></div>
        <div><img src={bitcoin_cash} alt="bitcoin cash logo" width={size} height={size} ></img></div>

        </Box>
    )
}