import React from 'react';
import { Bar } from 'react-chartjs-2';


export default function NodeDistributionChart(props) {

    const data = {
        labels: ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5', 'Node 6'],
        datasets: [
          {
            label: 'Active Node Bond',
            data: [542104, 603913, 340591, 850397, 697693, 405948],
            backgroundColor: [
              '#17A07B',
            ],
            borderColor: [
              '#0F1821',
            ],
            borderWidth: 1,
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
        },
      };

    return <Bar data={data} options={options}/>
};