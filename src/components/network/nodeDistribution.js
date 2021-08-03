import React from 'react';
import { useState, setState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';


export default function NodeDistributionChart(props) {

    Chart.defaults.color = "#FFFFFF";  // change text color to white


    let labels = [];
    if (props.data !== undefined) {
      for (let i=0; i<props.data.length; i++) {
        labels.push(`Node ${i}`)
      }

    }

    const data = {
        labels: labels,
        datasets: [
          {
            label: props.title,
            data: props.data,
            backgroundColor: [
              '#17A07B',
            ],
            borderColor: [
              '#0F1821',
            ],
            borderWidth: 1,
            scaleFontColor: ["#FFFFFF"],
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          x: {
            ticks: {
              display: false,
            },
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      };

    return <Bar data={data} options={options}/>
};