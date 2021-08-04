import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Bar, Chart } from 'react-chartjs-2';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';

export default function IncentivePendulum(props) {

    Chart.defaults.color = "#FFFFFF";  // change text color to white


    const data = {
        labels: [""],
        datasets: [
          {
            label: "Node Operators",
            data: [-props.data[0]],
            backgroundColor: [
              '#17A07B',
            ],
            borderColor: [
              '#0F1821',
            ],
            borderWidth: 1,
            scaleFontColor: ["#FFFFFF"],
            barThickness: 20,
            borderRadius: Number.MAX_VALUE,
          },
          {
            label: "Liquidity Providers",
            data: [props.data[1]],
            backgroundColor: "blue",
            borderColor: [
            '#0F1821',
            ],
            borderWidth: 1,
            barThickness: 20,
            borderRadius: Number.MAX_VALUE,

          }
        ],
      };

    const options = {
        maintainAspectRatio: false,
        indexAxis: 'y',
        elements: {
        bar: {
            borderWidth: 2,
        }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
            },
            y: {
                stacked: true,
                grid: {
                    display: false,
                    drawBorder: false,
                },
            }
        },
        plugins: {
        legend: {
            position: 'top',
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function(context) { 
                    let value = Number(context.dataset.data).toFixed(3);
                    if (value < 0) {
                        return context.dataset.label + ": " + value * 100 * -1 + "%";
                    }
                    return context.dataset.label + ": " + value * 100 + "%";
                }
            }
        },
        }
    };

    return (
        <Card variant="outlined" style={{backgroundColor: "#3B3F43", borderColor: "#1BE6C8", display: "flex", flexDirection: "column", alignItems: "left"}}>
            <div style={{display: "flex", justifyContent: "space-between", margin: "2%", alignItems: "center"}}>
                <Typography style={{color: "white", fontSize: "14px"}}>{"Incentive Pendulum"}</Typography>
                <IconButton size="small" href={"https://docs.thorchain.org/how-it-works/incentive-pendulum"}>
                    <LaunchIcon style={{color: "white"}}/>
                </IconButton> 
            </div>
            <CardContent style={{color: "white"}}>
                <Box display="flex" flexDirection="column" justifyContent="center">
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="body2">Node Operators</Typography>
                        <Typography variant="body2">Liquidity Providers</Typography>
                    </div>
                    <div >
                        <Bar data={data} options={options}/>
                    </div>
                    <Typography variant="body2">{`Imbalance: ${props.imbalance}%`}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
    
}
