import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PieChart from '@material-ui/icons/PieChart';
import BarChart from '@material-ui/icons/BarChart';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Print from '@material-ui/icons/Print';
import jsPDF from 'jspdf';

import html2canvas from "html2canvas";

import Chart from "./chart";
import Pie from "./pieChart";
import { GridContainer, GridItem} from '../../components/Grid';
import {Grid  } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });


export default function SimpleListMenu(props) {
    const classes = useStyles();
    var inputRef = React.createRef();
    const [value, setValue] = React.useState('');
    const [isPDF, setIsPDF] = React.useState(false);
    const [isPie, setIsPie] = React.useState(false);
    const [isPrint, setIsPrint] = React.useState(false);
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(props.reportName+"_report.pdf");
    });
  };
    const handleChange = (event, newValue) => {     
      
      if(newValue === 'pdf'){
        setIsPDF(true);
        setIsPrint(false);
        printDocument();
      }
      else if(newValue === 'pie'){
        setIsPDF(false);
        setIsPie(true);
        setIsPrint(false);
      }
     
      else if(newValue === 'print'){
        setIsPDF(false);
        setIsPrint(true);
        window.print();
       // handlePrint();
      }
      else{
        setIsPDF(false);
        setIsPie(false);
        setIsPrint(false);
      }
      setValue(newValue);
      return true;      
    };
    
    
  return (
    <>
    <GridContainer>
    <GridItem item xs={12} sm={4} md={6}>
  <BottomNavigation  value={value} onChange={handleChange} className={classes.Left}>
    
    {!isPie && props.reportName !== 'gender' &&  (<BottomNavigationAction label="Pie Chart" value="pie" icon={<PieChart />} />)}
    {isPie &&(
      <BottomNavigationAction label="Bar Chart" value="bar" icon={<BarChart />} />
    )}
    <BottomNavigationAction label="Save as PDF" value="pdf" icon={<PictureAsPdf />} />
    <BottomNavigationAction label="Print" value="print" icon={<Print />} />
    
</BottomNavigation>
</GridItem>
</GridContainer>

<Grid id="section-to-print" ref={inputRef}>
{!isPie   && (<Chart reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>)}
{isPie  && (<Pie reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>)}

</Grid>

    </>
    
  );
}
