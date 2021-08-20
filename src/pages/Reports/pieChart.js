import React from "react";

import { GridContainer, GridItem } from "../../components/Grid";
import { Pie} from 'react-chartjs-2';


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


    
    return (
      
      <>      
 <GridContainer>
        
        <GridItem item xs={12} sm={4} md={6}>
 <Pie data={state} options={options}/>
 </GridItem></GridContainer>
 </>
    )
  
  };