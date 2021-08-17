import React from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';


export default function RuneDistribution(props) {

    Chart.defaults.color = "#FFFFFF";  // change text color to white

    const labels = ['Active Bond', 'Standby Bond', 'Pooled', 'Unused Native RUNE', 'BEP2 or ERC20', 'Non-Circulating RUNE'];
    const backgroundColors = ['#17A07B', 'red', 'green', 'blue', 'purple', 'gray'];
    let values = [];
    let total = props.total;
    for (let i=0; i<props.data.length; i++) {
        values.push(props.data[i] / props.max);
    }
    values.push((props.max - props.total) / props.max)
    console.log(total, props.max)

    const data = {
        labels: labels,
        datasets: [
          {
            label: "Blah",
            data: values,
            backgroundColor: backgroundColors,

            borderColor: [
              '#0F1821',
            ],
            borderWidth: 1,
            scaleFontColor: ["#FFFFFF"],
          },
        ],
      };
      
      const options = {
        plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                  label: function(context) { 
                      let value = (Number(context.dataset.data[context.dataIndex]) * 100).toFixed(2)
                      return `${context.label}: ${value}%`;
                  }
              }
          },
        }
      };

    return <Doughnut data={data} options={options}/>
}