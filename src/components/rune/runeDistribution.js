import React from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';
import RuneDistributionTable from './runeDistributionTable';


// sort distribution for table display. Highest values are displayed at top of the table
function sortDistribution(a, b) {
  if ( a.value < b.value ){
    return 1;
  }
  if ( a.value > b.value ){
    return -1;
  }
  return 0;
}

export default function RuneDistribution(props) {

    Chart.defaults.color = "#FFFFFF";  // change text color to white

    const labels = ['Active Bond', 'Standby Bond', 'Pooled', 'Unused Native RUNE', 'BEP2 or ERC20', 'Non-Circulating RUNE'];
    const backgroundColors = ['#17A07B', 'red', 'green', 'blue', 'purple', 'gray'];
    const toolTipInfo = ['Total RUNE bonded by all active nodes', 'Total RUNE bonded by all standby nodes', 
                          'Total RUNE pooled in the network by all LPs', 'Total Native RUNE not bonded or pooled',
                        'Non-native RUNE on Ethereum or Binance Chain', 'RUNE set for future emissions or unlock']

    let values = [];
    let total = props.total;
    for (let i=0; i<props.data.length; i++) {
        values.push(props.data[i] / props.max);
    }
    values.push((props.max - props.total) / props.max)
    
    let tableData = values.map(function(e, i) {
      return {"value": e, "label": labels[i], "color": backgroundColors[i], "info": toolTipInfo[i]};
    });
    tableData.sort(sortDistribution)


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
              enabled: false
          },
        }
      };

    return (
      <div style={{display: "flex", margin: "2%", gap: "2%", alignItems: "center"}}>
        <div style={{position: "relative"}}>
          <Doughnut data={data} options={options} />
        </div>
        <RuneDistributionTable tableData={tableData} />
      </div>
    )
}