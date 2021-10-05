import React from 'react';
import OverviewCard from './overviewCard';
import Grid from '@material-ui/core/Grid';


export default function Overview(props) {

    const returnCard = () => {
        const size = 2;
        let cardData = []
        for (const [title, value] of Object.entries(props.data)) {
             cardData.push(
                <Grid item xs={size} key={title}>
                    <OverviewCard title={title} value={value} />
                </Grid>
            )
          }
        return cardData;
    }

    return (

        <Grid container spacing={2} direction="row" justifyContent="center" key={999} style={{marginTop: "2%"}}>
                {returnCard()}
        </Grid>
    )
}