import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Bar, Chart } from 'react-chartjs-2';
import Box from '@material-ui/core/Box';

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
            label: "LPs",
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
            // text: 'Chart.js Horizontal Bar Chart'
        },
        tooltip: {
            callbacks: {
                label: function(context) { 
                    let value = Number(context.dataset.data).toFixed(2);
                    if (value < 0) {
                        return context.dataset.label + ": " + value * -1 + "%";
                    }
                    return context.dataset.label + ": " + value + "%";
                }
            }
        },
        }
    };

    return (
        <Card variant="outlined" style={{backgroundColor: "#3B3F43", borderColor: "#1BE6C8", display: "flex", flexDirection: "column", alignItems: "left"}}>
        <CardHeader title="Incentive Pendulum" style={{color: "white", }} 
                titleTypographyProps={{variant:'subtitle2'}}></CardHeader>
            <CardContent style={{color: "white"}}>
                <Box >
                    <Bar data={data} options={options}/>
                </Box>
            </CardContent>
        </Card>
    )
    
}
