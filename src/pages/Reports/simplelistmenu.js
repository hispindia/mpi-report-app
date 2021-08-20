import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PieChart from '@material-ui/icons/PieChart';
import BarChart from '@material-ui/icons/BarChart';
import BorderAll from '@material-ui/icons/BorderAll';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Print from '@material-ui/icons/Print';
import jsPDF from 'jspdf';

import html2canvas from "html2canvas";

import Chart from "./chart";
import Pie from "./pieChart";
import Tabular from "./tabular"
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
    const [isTabular, setIsTabular] = React.useState(false);
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
        setIsTabular(false);
        setIsPrint(false);
      }
      else if(newValue === 'tabular'){
        setIsPDF(false);
        setIsPie(false);
        setIsTabular(true);
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
        setIsTabular(false);
        setIsPrint(false);
      }
      setValue(newValue);
      return true;      
    };
    
    
  return (
    <>
    <GridContainer>
    <GridItem>
  <BottomNavigation  value={value} onChange={handleChange} className={classes.root}>
    <BottomNavigationAction label="Tabular Data" value="tabular" icon={<BorderAll />} />
    {!isPie &&(<BottomNavigationAction label="Pie Chart" value="pie" icon={<PieChart />} />)}
    {isPie &&(
      <BottomNavigationAction label="Bar Chart" value="bar" icon={<BarChart />} />
    )}
    <BottomNavigationAction label="Save as PDF" value="pdf" icon={<PictureAsPdf />} />
    <BottomNavigationAction label="Print" value="print" icon={<Print />} />
    
</BottomNavigation>
</GridItem>
</GridContainer>

<Grid id="section-to-print" ref={inputRef}>
{!isPie && !isTabular  && (<Chart reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>)}
{isPie && !isTabular && (<Pie reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>)}
{!isPie && isTabular && (<Tabular reportName={props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData = {props.femaleData}/>)}
</Grid>

    </>
    
  );
}
