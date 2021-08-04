import React from 'react';
import styles from '../scss/header.scss';
import thorchainlogo from '../assets/thorchainlogo.jpeg';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';



export default class Header extends React.Component {

    getPages = () => {
        let pages = ['Network', 'Liquidity Pools', 'RUNE'];
        let pagesToLink = {'Network': '', 'Liquidity Pools': 'liquidityPools', 'RUNE': 'rune'};
        let returnPages = [];
        
        for (let page of pages) {
            let link = pagesToLink[page];
            if (this.props.page === page) {
                returnPages.push(
                <Button variant="text" component={Link} to={`/${link}`} key={page}>
                <div style={{textUnderlineOffset: "5px", textDecoration: 'underline', textDecorationColor: '#17A07B'}}><p>{page}</p></div>
                </Button>
                )
            } else {
                returnPages.push(
                <Button variant="text" component={Link} to={`/${link}`} key={page}>
                <p>{page}</p>
                </Button>
                )
            }
        }
        returnPages.push(<Button variant="text" disabled={true} key={"THORNames"}><p style={{color: "grey"}}>THORNames</p></Button>)
        return returnPages
    }

    render() {

        let name = "THORAnalytics";

        return (
        <div style={{marginTop: "1%", marginLeft: "1%"}}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center" key={0}>
                <Grid container item xs={3} alignItems="center" key={1}>
                    <div><img src={thorchainlogo} width="50" height="50" alt="Thorchain Logo"/></div>
                    <Typography style={{fontSize: "25px", letterSpacing: "0.1em"}}>{name}</Typography>
                </Grid>
                <Grid container item xs={1} key={2}/>
                <Grid container item xs={2} key={3}/>
                <Grid container item xs={5} justifyContent="flex-end" key={4}>
                    {this.getPages()} 
                </Grid>
                <Grid container item xs={1} key={5}/>
            </Grid>
        </div>
        )
    }

}