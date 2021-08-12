import React from "react";

import { GridContainer, GridItem } from "../../components/Grid";
import { Bar} from 'react-chartjs-2';
import SimpleListMenu from './simplelistmenu';


export default function Chart(props) {
  

  let[isGenderReport, setisGenderReport] = React.useState(false);
  let[isHospitalReport, setisHospitalReport] = React.useState(false);
  let[isDistrictReport, setisDistrictReport] = React.useState(false);
  let[newData, setnewData] = React.useState([]);
  if(props.reportName === 'gender'){
    isGenderReport = true;
  }
  if(props.reportName === 'hospital'){
    isHospitalReport = true;
    newData.push(props.maleData);
    newData.push(props.femaleData);
  }
  if(props.reportName === 'district'){
    isDistrictReport = true;
  }
  
  const state = {
      showChart:false,
      labels: props.labelName,
      weight: "200",
      height:"200",
      borderWidth: 2,
      datasets: [
        {
          label: 'Sum of Registrations',
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 92)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
          ],
          borderColor: [
            'rgba(255, 9, 192)',
            'rgba(54, 14, 255)',
            'rgba(255, 106, 10)',
            'rgba(75, 192, 10)',
            'rgba(153, 102, 105)',
            'rgba(255, 89, 64)',
          ],
          borderWidth: 1,
          data: props.data
        }
      ]
    }


    const groupData = {
      showChart:false,
      labels: props.labelName,
      weight: "200",
      height:"200",
      borderWidth: 2,
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

    var options = {
      scales: {
          yAxes: [
              {
                  ticks: {
                      min: 0
                      ,max: 5
                      ,callback: function(val) {
                          if(val == 0 || val == 5) {
                              return null;
                          }
                          return Number.isInteger(val) ? val : null;
                      }
                  }
              }
          ]
      }
  };
    
    return (
      
      <>
      <GridContainer display={state.showChart}>
        <GridItem item xs={12} sm={6} md={6} >
            <SimpleListMenu/>
        </GridItem>
      </GridContainer>
      {!isGenderReport &&(
 <GridContainer display={state.showChart} >
 
 <GridItem item xs={6}>
 <Bar data={state} options={options} />
 </GridItem>
 </GridContainer>
      )}
    
 {isGenderReport && (
 <GridContainer>
 <Bar data={groupData} options={options} />
 </GridContainer>
 )}
 </>
    )
  
  };