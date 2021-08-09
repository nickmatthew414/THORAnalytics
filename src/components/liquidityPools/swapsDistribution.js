import React from 'react';
import { Bar, Chart } from 'react-chartjs-2';


export default function SwapDistribution(props) {

    Chart.defaults.color = "#FFFFFF";  // change text color to white

    let date = new Date();
    let labels = [];
    if (props.data !== undefined) {
      for (let i=0; i<props.data.length; i++) {
        const dateList = String(date).split(" ");
        const dateString = dateList[1] + " " + dateList[2];
        labels.push(`${dateString}`);
        date.setDate(date.getDate() - 1);
      }

    }
    labels = labels.reverse();  // most recent date last

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