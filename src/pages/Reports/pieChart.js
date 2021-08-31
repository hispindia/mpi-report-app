import React from "react";

import { GridContainer, GridItem } from "../../components/Grid";
import { Pie} from 'react-chartjs-2';


import Tabular from "./tabular"

export default function Chart(props) {
  
  const options = {
    legend: {
        display: true,
        position: 'left'
    },
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
          data: props.data
        }
      ]
    }


    
    return (
      
      <>      
 <GridContainer>
        
        <GridItem item xs={12} sm={4} md={6}>
 <Pie data={state} options={options}/>
 </GridItem>
 </GridContainer>
 <GridContainer>
 <GridItem item xs={12} sm={4} md={6}>
 <Tabular reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>
 </GridItem>
 </GridContainer>
 </>
    )
  
  };