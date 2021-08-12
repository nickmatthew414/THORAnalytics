import React from 'react';
import { Pie, Chart } from 'react-chartjs-2';
import PoolSizesTable from './poolSizesTable';


export default function PoolSizesChart(props) {

    Chart.defaults.color = "#FFFFFF";  // change text color to white
    const colors = [
        '#17A07B', 'red', 'green', 'blue', 'purple', 'white', 'orange', 'yellow', 'pink']

    const labelsMaker = () => {
        let labels = props.labels.slice(0, 8);
        labels.push("Other");
        return labels;
    }

    const dataMaker = () => {
        let data = props.data.slice(0, 8);
        let sum = 0;
        for (let i=0; i<data.length; i++) {
            sum += data[i]
        }
        // remaining percentage in other assets
        data.push(1 - sum);
        return data;

    }


    const data = {
        labels: labelsMaker(),
        datasets: [
          {
            label: props.title,
            data: dataMaker(),
            backgroundColor: colors,
            borderColor: [
              '#0F1821',
            ],
            borderWidth: 1,
            scaleFontColor: ["#FFFFFF"],
          },
        ],
      };
      
      const options = {
        maintainAspectRatio: false,
        scales: {
          y: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                drawBorder: false,
            },
        },
          x: {
            ticks: {
              display: false,
            },
            grid: {
                display: false,
                drawBorder: false,
            },
          },
        },
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

    return (
      <div style={{display: "flex", margin: "2%", gap: "2%", alignItems: "center"}}>
      <div style={{position: "relative", height: "20vw", width: "20vw"}}>
        <Pie data={data} options={options} />
      </div>
      <PoolSizesTable names={labelsMaker()} colors={colors} 
        assetTotalValues={props.assetTotalValues} assetPrices={props.assetPrices} assetAPYs={props.assetAPYs} 
        totalPooledRune={props.totalPooledRune} runePrice={props.runePrice}/>
      </div>
    )
}