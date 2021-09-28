import React from 'react';
import { Line, Chart } from 'react-chartjs-2';


export default function RunePriceCalculator(props) {

    Chart.defaults.color = "#FFFFFF";  // change text color to white

    let date = new Date();
    let labels = [];
    if (props.runePriceOverInterval !== undefined) {
      for (let i=0; i<props.runePriceOverInterval.length; i++) {
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
            label: "Rune Price",
            pointRadius: 0,
            labels: props.title,
            data: props.runePriceOverInterval,
            borderColor: [
              '#0F1821',
            ],
            pointBackgroundColor: '#1be6c8',
            borderWidth: 1,
            scaleFontColor: ["#FFFFFF"],
          },
          {
            label: "Deterministic Rune Price",
            pointRadius: 0,
            labels: props.title,
            data: props.deterministicRunePriceOverInterval,
            borderColor: ['green'],
            borderWidth: 1,
            scaleFontColor: ["#FFFFFF"]

          }
        ]};
      
      const options = {
        scales: {
          y: {
            ticks: {
              callback: function(value, index, values) {
                return '$' + value; 
            }}
          },
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
                    let number;
                    if (Number(context.dataset.data[context.dataIndex]) > 100) {
                      number = Math.round(Number(context.dataset.data[context.dataIndex])).toLocaleString();
                    } else {
                      number = Number(context.dataset.data[context.dataIndex]).toFixed(2);
                    }
      
                    return `${context.dataset.label}: $${number}`;
                }
              }
          }
        }
      };

    return <Line data={data} options={options}/>

};