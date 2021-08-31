import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';
import { GridContainer, GridItem } from '../../components/Grid';
import  "chartjs-plugin-datalabels";

import Tabular from "./tabular"

const useStyles = makeStyles({
  chart: {
    minWidth: 250,
    maxWidth: 850
  },
});
export default function Chart(props) {
  
  const classes = useStyles();
  let[isGenderReport, setisGenderReport] = React.useState(false);
  let[newData, setnewData] = React.useState([]);
  const findMaxVal = data => Math.max(props.data);
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };
  if(props.reportName === 'gender'){
    isGenderReport = true;
  }  
  const data = {
    labels: props.labelName,
    datasets: [
      {
        label: 'Number of Registrations',
        data: props.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
    const groupData = {      
      labels: props.labelName,     
      datasets: [
        {
          label: 'Male',
          data: props.maleData,
          backgroundColor: 'rgb(255, 160, 255)',
        },
        {
          label: 'Female',
          data: props.femaleData,
          backgroundColor: 'rgb(54, 190, 255)',
        },        
      ],
    };
    const options2 = {      
      legend: {
        display: true,
        position: 'right'
    },
      scales: {
        yAxes: [
          {
            stacked: true,
            ticks: {
              userCallback(label, index, labels) {
                // only show if whole number
                if (Math.floor(label) === label) {
                    return label;
                }
             },
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    
    const options = {
      plugins: {
        datalabels: {
          display: true,
          color: "black",
          align: "top",
          anchor: "end",
          font: { size: "14" }
        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              userCallback(label, index, labels) {
                 // only show if whole number
                 if (Math.floor(label) === label) {
                     return label;
                 }
              },
              beginAtZero: true
            }
          }
         ],
      },
    };
    return (
      
      <>
      
 <GridContainer>
        <GridItem item xs={12} sm={4} md={6}>
      {!isGenderReport &&(
 
 <Bar data={data} options={options} />
 
      )}
    
 {isGenderReport && (
  
 <Bar data={groupData} options={options2} 
/>
 
 )}
 </GridItem>
 
 </GridContainer>
 <GridContainer id="gd1">
      <GridItem item xs={12} sm={4} md={6}>
 <Tabular reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>
 </GridItem>
 </GridContainer>
 </>
    )
  
  };