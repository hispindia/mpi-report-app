import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';
import { GridContainer, GridItem } from '../../components/Grid';
import  "chartjs-plugin-datalabels";

import Tabular from "./tabular"

const useStyles = makeStyles({});
export default function Chart(props) {
  
  const classes = useStyles();
  let[isGenderReport, setisGenderReport] = React.useState(false);

  var alldata = props.data;
  var maximumVal = Math.max.apply(null,alldata);
  
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
      },
    ],
  };
  
    const groupData = {      
      labels: props.labelName,     
      datasets: [
        {
          label: 'Male',
          data: props.maleData,
          backgroundColor: 'rgba(255, 99, 132, 0.4)',
        },
        {
          label: 'Female',
          data: props.femaleData,
          backgroundColor: 'rgba(54, 162, 235, 0.4)',
        },        
      ],
    };
    const options2 = {      
      legend: {
        display: true,
        position: 'top'
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
              min: 0,
              max: maximumVal+1,
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
        display: true,
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
              beginAtZero: true,
              min: 0,
              max: maximumVal+1,
            }
          }
         ],
      },
    };
    return (
      
      <>
      
 <GridContainer>
        <GridItem item xs={12} md={6} sm={6}>
      {!isGenderReport &&(
 
 <Bar data={data} options={options} minWidth="100" height="170"/>
 
      )}
    
 {isGenderReport && (
  
 <Bar data={groupData} options={options2} minWidth={100} height={170}/>
 
 )}
 </GridItem>
 <GridItem item xs={12} md={6} sm={6}>
      <Tabular reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>
 </GridItem>
 </GridContainer>
 </>
    )
  
  };