import React from 'react';
import { Line, Chart } from 'react-chartjs-2';


export default function LineGraph(props) {

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
            // showLine: false,
            pointRadius: 0,
            label: props.title,
            fill: true,
            data: props.data,
            backgroundColor: [
              '#1be6c8',
            ],
            borderColor: [
              '#0F1821',
            ],
            pointBackgroundColor: '#1be6c8',
            borderWidth: 1,
            scaleFontColor: ["#FFFFFF"],
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true,
            },
          }],
          x: {
            ticks: {
              display: false,
            },
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
              mode: "nearest",
              intersect: false,
              callbacks: {
                label: function(context) { 
                    return `${context.dataset.label}: $${Number(context.dataset.data[context.dataIndex]).toLocaleString()}`;
                }
              }
          }
        }
      };

    return <Line data={data} options={options}/>

};