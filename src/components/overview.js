import React from 'react';
import OverviewCard from './overviewCard';
import Grid from '@material-ui/core/Grid';


export default class Overview extends React.Component {

    constructor(props) {
        super(props);
    }

    size = 2;

    returnCard = () => {
        let cardData = []
        for (const [title, value] of Object.entries(this.props.data)) {
             cardData.push(
                <Grid item xs={this.props.size} key={title}>
                    <OverviewCard title={title} value={value} />
                </Grid>
            )
          }
        return cardData;
    }

    render() {
        return (

            <Grid container spacing={2} direction="row" justifyContent="center" key={999} style={{marginTop: "2%"}}>
                    {this.returnCard()}
            </Grid>
        )
    }
}