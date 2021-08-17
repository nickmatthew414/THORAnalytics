import React from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';


export default function RuneDistribution(props) {

    const labels = ['1', '2'];
    const values = [1, 2]

    const data = {
        labels: labels,
        datasets: [
          {
            label: "Blah",
            data: values,
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

      };

    return <Doughnut data={data} options={options}/>
}