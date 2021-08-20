import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';
import { GridContainer, GridItem } from '../../components/Grid';

const useStyles = makeStyles({
  chart: {
    minWidth: 100,
    maxWidth: 400
  },
});
export default function Chart(props) {
  
  const classes = useStyles();
  let[isGenderReport, setisGenderReport] = React.useState(false);
  let[newData, setnewData] = React.useState([]);

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
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 150, 1.2)',
          'rgba(54, 162, 235, 1.2)',
          'rgba(255, 206, 86, 1.2)',
          'rgba(75, 192, 192, 1.2)',
          'rgba(153, 102, 255, 1.2)',
          'rgba(255, 159, 64, 1.2)',
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
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Female',
          data: props.femaleData,
          backgroundColor: 'rgb(54, 162, 235)',
        },        
      ],
    };
    const options2 = {
      legend: {
        display: true,
        position: 'left'
    },
      scales: {
        yAxes: [
          {
            stacked: true,
            ticks: {
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
    
    return (
      
      <>
      <GridContainer id="gd1">
        
        <GridItem item xs={6} sm={6} md={8}>
      {!isGenderReport &&(
 
 <Bar data={data} options={options}  legend={legend}/>
 
      )}
    
 {isGenderReport && (
  
 <Bar data={groupData} options={options2} 
/>
 
 )}
 </GridItem></GridContainer>
 </>
    )
  
  };