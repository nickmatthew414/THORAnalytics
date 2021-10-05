import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


export default function OverviewCard(props) {

    return (
            <Card variant="outlined" style={{backgroundColor: "#3B3F43", borderColor: "#1BE6C8", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <CardHeader title={props.title} style={{color: "white", }} 
                    titleTypographyProps={{variant:'subtitle2'}}>
                </CardHeader>
                <CardContent style={{color: "white"}}>
                    {props.value}
                </CardContent>
            </Card>
    )
}