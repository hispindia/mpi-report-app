import React from "react";

import { GridContainer, GridItem } from "../../components/Grid";
import { Doughnut} from 'react-chartjs-2';


import Tabular from "./tabular"

export default function Chart(props) {
  
  const options = {
    legend: {
        display: true,
        position: 'right',
        plugins: {
          datalabels: {
            display: true,
            color: "black",
            align: "top",
            anchor: "end",
            font: { size: "14" },
            percentage: true,
          }
        },

    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue/total*100).toFixed(1));
          return currentValue + ' (' + percentage + '%)';
        },
        title: function(tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    }
};
  const state = {
      labels: props.labelName,
      borderWidth: 2,     
      datasets: [
        {
          label: 'Sum of Registrations',
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 92, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 19, 10, 0.5)',
            'rgba(59, 109, 100, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 19, 10, 1)',
            'rgba(59, 109, 100, 1)',
          ],
          borderWidth: 1,
          data: props.data
        }
      ]
    }


    
    return (
      
      <>      
 <GridContainer>
        <GridItem item xs={12} md={6} sm={6}>
            <Doughnut data={state} options={options}/>
        </GridItem> 
        <GridItem item xs={12} md={6} sm={6}>
            <Tabular reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>
        </GridItem>
 </GridContainer>
 </>
    )
  
  };