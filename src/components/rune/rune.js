import React from 'react';
import axios from 'axios';
import Header from '../header';
import ChartCard from '../chartCard';
import { Grid } from '@material-ui/core';
import { torToRune } from '../../library/library';
import AssetColumn from '../assetColumn';
import RunePriceCalculator from './runePriceCalculator';


export default function LiquidityPools(props) {

    const [state, setState] = React.useState({
        switchedRune: 0,
        runePrice: 0,
    })

    React.useEffect(() => {


        const globalStatsAPI = 'https://midgard.thorchain.info/v2/stats';
        const networkDataAPI = 'https://midgard.thorchain.info/v2/network';
        const poolsDataAPI = 'https://midgard.thorchain.info/v2/pools';
        const tvlDataAPI = 'https://midgard.thorchain.info/v2/history/tvl?interval=day&count=30';
        // const config = {'Authorization': `Basic ${process.env.REACT_APP_COIN_MARKET_CAP}`};
        // const thorchainSupplyAPI = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=bitcoin';

        const getGlobalStats = axios.get(globalStatsAPI);
        const getNetworkData = axios.get(networkDataAPI);
        const getPoolsData = axios.get(poolsDataAPI);
        const getTVLData = axios.get(tvlDataAPI);
        // const getThorchainSupplyData = axios.get(thorchainSupplyAPI, {headers: config});
        axios.all([getGlobalStats, getNetworkData, getPoolsData, getTVLData]).then(
            axios.spread((...allData) => {
                const globalStatsData = allData[0].data;
                const networkData = allData[1].data;
                const poolsData = allData[2].data;
                const tvlData = allData[3].data;

                let totalNoneRuneTVL = 0;
                for (let i=0; i<poolsData.length; i++) {
                    totalNoneRuneTVL += poolsData[i].assetPriceUSD * torToRune(poolsData[i].assetDepth);
                }

                const switchedRune = torToRune(globalStatsData.switchedRune);
                const runePrice = globalStatsData.runePriceUSD;
                const runeTotalSupply = 226839202.82; // hard-coded for now
                const runeMaxSupply = 500000000;
                const totalActiveBondedRune = torToRune(networkData.bondMetrics.totalActiveBond);
                const totalStandbyBondedRune = torToRune(networkData.bondMetrics.totalStandbyBond);
                const totalPooledRune = torToRune(networkData.totalPooledRune);
                const unusedNativeRune = switchedRune - totalActiveBondedRune - totalStandbyBondedRune - totalPooledRune;
                const nonUpgradedRune = runeTotalSupply - switchedRune;
                const deterministicRune = 3* totalNoneRuneTVL / runeTotalSupply;
                const noncirculatingSupply = runeMaxSupply - runeTotalSupply;

                // grabbing runePrice and deterministic RUNE price for the returned interval for line graph
                let runePriceOverInterval = []
                let deterministicRunePriceOverInterval = []
                
                for (let i=0; i<tvlData.intervals.length; i++) {
                    runePriceOverInterval.push(Number(tvlData.intervals[i].runePriceUSD));

                    // multiply by runePrice since the TVP is quoted in rune
                    // divide by 2 for just non-rune in pools
                    const totalNonRunePooled = (torToRune(tvlData.intervals[i].totalValuePooled) * runePrice) / 2;
                    const deterministicRunePrice = 3 * totalNonRunePooled / runeTotalSupply;
                    deterministicRunePriceOverInterval.push(deterministicRunePrice);  
                }

                    setState({totalNoneRuneTVL, switchedRune, runePrice, totalActiveBondedRune, totalStandbyBondedRune, totalPooledRune, 
                    runeTotalSupply, runeMaxSupply, unusedNativeRune, nonUpgradedRune, noncirculatingSupply, runePriceOverInterval, deterministicRunePriceOverInterval});
            })
        )
    }, []);

    return (
        <div>
            <Header page="RUNE" />

            <Grid container spacing={2} justifyContent="center" style={{marginTop: "2%"}}>
                <Grid item xs={1}>
                    <AssetColumn/>
                </Grid>
                <Grid item xs={5}>
                {state.nonUpgradedRune && <ChartCard title="Rune Distribution" chart="runeDistribution" data={[state.totalActiveBondedRune,
                    state.totalStandbyBondedRune, state.totalPooledRune, state.unusedNativeRune,
                state.nonUpgradedRune]} max={state.runeMaxSupply} total={state.runeTotalSupply} /> }                    
                </Grid>
                <Grid item xs={5}>
                    {state.runePriceOverInterval && 
                        <ChartCard title="Rune Price History" chart="runePriceGraph" runePriceOverInterval={state.runePriceOverInterval}
                            deterministicRunePriceOverInterval={state.deterministicRunePriceOverInterval}>
                        </ChartCard>}
                    <ChartCard style={{marginTop: "2%"}}/>
                </Grid>
                <Grid item xs={1} />
            </Grid>

            <Grid container spacing ={2} justifyContent="center" style={{marginTop: "2%"}}>
                <Grid item xs={10}>
                    <RunePriceCalculator title="Rune Price Calculator" />
                </Grid>

            </Grid>

        </div>
    )
}



// temporarily placed here for testing:
function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState({
      width: undefined,
      height: undefined,
    });
    React.useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }