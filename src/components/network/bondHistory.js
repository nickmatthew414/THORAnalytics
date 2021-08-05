import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Bar, Chart } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function BondHistory(props) {

    Chart.defaults.color = "#FFFFFF";  // change text color to white

    // temporary dummy data
    let bonded = []
    let labels = []
    for (let i=0; i<30; i++) {
        bonded.push(10000000*1.05**(1+(i/2)));
        labels.push("Week " + i)
    }

    const data = {
        labels: labels,
        datasets: [
          {
            label: "Total Value Bonded",
            data: bonded,
            backgroundColor: [
                '#05d0f5',
            ],
            scaleFontColor: ["#FFFFFF"],
          },
        ],
      };

    const options = {
        elements: {
        bar: {
            borderWidth: 1,
        }
        },
        responsive: true,
        scales: {
            x: {
                ticks: {
                    display: false,
                },
            }
        },
        plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        
        },
    };


    return (
        <Card variant="outlined" style={{marginTop: "2%", width: "100%", backgroundColor: "#3B3F43", borderColor: "#1BE6C8",
         display: "flex", flexDirection: "column", alignItems: "left"}}>
            <CardHeader title="Total Value Bonded History" titleTypographyProps={{variant:'subtitle2'}} style={{color: "white"}} />
            <Box style={{width: "90%", marginLeft: "5%"}}>
                <Bar data={data} options={options} />
            </Box>
        </Card>
    )
}