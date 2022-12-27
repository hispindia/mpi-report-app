import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PieChart from '@material-ui/icons/PieChart';
import BarChart from '@material-ui/icons/BarChart';
import LineChart from '@material-ui/icons/Timeline';
import DonutChart from '@material-ui/icons/DonutLarge';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Print from '@material-ui/icons/Print';
import Divider from '@material-ui/core/Divider';
import jsPDF from 'jspdf';
import jQuery from 'jquery';

import html2canvas from "html2canvas";

import Chart from "./chart";
import Pie from "./pieChart";
import Donut from "./donutChart";
import Line from "./lineChart"
import { GridContainer, GridItem } from '../../components/Grid';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});


function SimpleListMenu(props) {
  const {reportName,data, labelName, maleData,femaleData}= props;
  // console.log('props>>>>>>', props)
  // {props.reportName} data={props.data} labelName={props.labelName} maleData={props.maleData} femaleData={props.femaleData
  const classes = useStyles();
  var inputRef = React.createRef();
  const [value, setValue] = React.useState('');
  const [isPie, setIsPie] = React.useState(false);
  const [isBar, setIsBar] = React.useState(true);
  const [isDonut, setIsDonut] = React.useState(false);
  const [isLine, setIsLine] = React.useState(false);
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      // Adjust width and height
      const imgWidth = (canvas.width * 60) / 240;
      const imgHeight = (canvas.height * 70) / 240;
      const imgData = canvas.toDataURL("image/jpeg,1.0");

      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, "PDF", 0, 0, imgWidth, imgHeight);
      pdf.save(reportName + "_report.pdf");

    });
  };
  const handleChange = (event, newValue) => {

    if (newValue === 'pdf') {
      printDocument();
    }
    else if (newValue === 'pie') {
      setIsPie(true);
      setIsBar(false);
      setIsDonut(false);
      setIsLine(false);
    }
    else if (newValue === 'bar') {
      setIsBar(true);
      setIsPie(false);
      setIsDonut(false);
      setIsLine(false);
    }
    else if (newValue === 'donut') {
      setIsDonut(true);
      setIsPie(false);
      setIsBar(false);
      setIsLine(false);
    }
    else if (newValue === 'line') {
      setIsLine(true);
      setIsPie(false);
      setIsBar(false);
      setIsDonut(false);
    }
    else if (newValue === 'print') {
      window.print();
    }
    else {
      setIsPie(false);
    }
    setValue(newValue);
    return true;
  };


  return (
    <>

      <BottomNavigation value={value} onChange={handleChange} spacing={0}>
        {reportName !== 'gender' && (
          <BottomNavigationAction disabled={isPie} label="Pie Chart" value="pie" icon={<PieChart />} />)}

        <BottomNavigationAction disabled={isBar} label="Bar Chart" value="bar" icon={<BarChart />} />
        <BottomNavigationAction disabled={isLine} label="Line Chart" value="line" icon={<LineChart />} />
        {reportName !== 'gender' && (
          <BottomNavigationAction label="Doughnut Chart" value="donut" icon={<DonutChart />} />)}
        <BottomNavigationAction label="Save as PDF" value="pdf" icon={<PictureAsPdf />} />
        <BottomNavigationAction label="Print" value="print" icon={<Print />} />
      </BottomNavigation>
      <Divider style={{ marginBottom: 4, padding: 2 }} />
      <Grid id="section-to-print" ref={inputRef}>
        {isBar && (<Chart reportName={reportName} data={data} labelName={labelName} maleData={maleData} femaleData={femaleData} />)}
        {isPie && (<Pie reportName={reportName} data={data} labelName={labelName} maleData={maleData} femaleData={femaleData} />)}
        {isDonut && (<Donut reportName={reportName} data={data} labelName={labelName} maleData={maleData} femaleData={femaleData} />)}
        {isLine && (<Line reportName={reportName} data={data} labelName={labelName} maleData={maleData} femaleData={femaleData} />)}
      </Grid>
    </>

  );
}


export default memo(SimpleListMenu)