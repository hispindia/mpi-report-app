/* eslint-disable no-loop-func */
import React from 'react'
import {
    Select,
    MenuItem,
    TextField,
    InputLabel,
    Button,
    Paper,
  } from "@material-ui/core";

import { GridContainer, GridItem } from "../../components/Grid";
import Chart from "./chart";
import axios from "axios";
import styles from "./styles";
import "./styles.css";
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(styles);
var username = "samta";
var password = "Samta123";
const headers = {
    Authorization: "Basic " + btoa(`${username}:${password}`),
  };

 
function Reports() {
    
const classes = useStyles();
  
  var param = "";
  var headerCon = '';
  var isApiCalled = false;
  //var isAllReport = true;
  let[isAllReport, setisAllReport] = React.useState(false);
  let[ishospital, setishospital] = React.useState(false);
  let[isdistrict, setisDistrict] = React.useState(false);
  const [allHosptsName, setallHosptsName] = React.useState([]);
  const [allHosptsData, setallHosptsData] = React.useState([]);
  const [allHosptsmale, setallHosptsmale] = React.useState([]);
  const [allHosptsfemale, setallHosptsfemale] = React.useState([]);
  let [allHospts, setallHospts] = React.useState([]);
  let [allDistricts, setallDistricts] = React.useState([]);
    var [reportType, setReportType] = React.useState('');
    var [districtId, setdistrictId] = React.useState([]);
    var [disName, setDisName] = React.useState('');
    var [hosName, setHosName] = React.useState('');
    let [fromDate, setfromDate] = React.useState('');
    let [toDate, settoDate] = React.useState('');
    const [isDateOpened, setIsDateOpened] = React.useState(false);
    const [isMonthOpened, setIsMonthOpened] = React.useState(false);
    const [isYearOpened, setIsYearOpened] = React.useState(false);
    let[isChart, setIsChart] = React.useState(false);
    let[isGenerated, setisGenerated] = React.useState(false);
    
    const [startDate, setStartDate] = React.useState(new Date());
 
    var sDate = startDate.getDate()-1 +"-"+ startDate.getMonth() +"-"+ startDate.getFullYear();
    var eDate = startDate.getDate() +"-"+ startDate.getMonth()+1 +"-"+ startDate.getFullYear();

    let maxOffset = 10;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for(let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    const yearList = allYears.map((x) => {return(<MenuItem value={x} >{x-1}-{x}</MenuItem>)});

function getChart(){
    
        if(reportType === 'daily')
        {
            fromDate = (startDate.getDate()-1) +"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
           toDate = (startDate.getDate()) +"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
            settoDate(toDate);
        }       
        if(disName !== 'all'){
            console.log(disName);
            var str = disName.split("-")
            districtId.length = 0;            
            districtId.push(str[1]) ;
        }
        else {
            hosName = "all";
        }
        if(hosName === "all"){
            headerCon = "";
        }
        else{
            headerCon = '&hosp_name='+hosName;
        }
        
        
        var newallHosptsData = [];
        var newallHosptsName = [];
        var newallHosptsmale = [];
        var newallHosptsfemale = [];
        for (var i=0; i <= districtId.length-1; i++) {            
            param = districtId[i];
            if(reportType === 'district'){
              headerCon = "";  
            }
            const url = `http://localhost:8080/openmrs/ws/hisp/rest/mpi_reporting?district=${param}${headerCon}&from_date=${fromDate}&to_date=${toDate}`;
        axios
          .get(url, { headers: headers })
          .then((response) => {
            console.log(url);
            if(response.data.length > 0) {
               
                
                var searchdatanew = [];
                for (let i = 0; i < response.data.length; i++) {                
                  searchdatanew.push(response.data);                
                  let hospname = searchdatanew[0][i]["hospital"]["hosp_name"];
                  let hospval = searchdatanew[0][i]["hospital"]["tot_reg"]; 
                  let malVal =  searchdatanew[0][i]["hospital"]["male_reg"];
                  let femalVal =  searchdatanew[0][i]["hospital"]["female_reg"];
    
                    if(!newallHosptsName.includes(hospname+"")
                   )
                    {
                        newallHosptsName.push(hospname+"");  
                        newallHosptsData.push(hospval);
                        newallHosptsmale.push(malVal);
                        newallHosptsfemale.push(femalVal);
                    }
              }
              console.log(newallHosptsName);
        allHosptsName.length = 0;                  // Clear contents
        allHosptsName.push.apply(allHosptsName, newallHosptsName);

        allHosptsData.length = 0;                  // Clear contents
        allHosptsData.push.apply(allHosptsData, newallHosptsData);

        allHosptsmale.length = 0;
        allHosptsmale.push.apply(allHosptsmale, newallHosptsmale); 

        allHosptsfemale.length = 0;
        allHosptsfemale.push.apply(allHosptsfemale, newallHosptsfemale);
         
        setisGenerated(true);
            }
            else{
                allHosptsName.length = 0; 
                allHosptsData.length = 0;
                allHosptsmale.length = 0;
                allHosptsfemale.length = 0;
                setisGenerated(true);
            }
            
          })
         
        }
      } 
function handleReportType(e){
    setIsChart(false);
    //isChart = false;
    setReportType(e.target.value) ;
    if(e.target.value === 'daily'){
        setisAllReport(true) ;
    }
    else if(e.target.value === 'district'){
        setisDistrict(true);
    }
    else if(e.target.value === 'hospital'){
        setishospital(true) ;
    }
    else{
        setisDistrict(false);
        setishospital(false) ;
        setisAllReport(false) ;

    }
}
function handleHospitalType(e){
    setIsChart(false);
    setHosName(e.target.value ) ;    
}
function handleDistrictType(e){
    //setIsChart(false);
    setDisName(e.target.value ) ;
    hosptName();
    //var str = e.target.value.split("-")
}

function showPieChart(){

    getChart();
    var chartReturn = isGenerated;
    console.log(chartReturn);
    if(chartReturn){
        isApiCalled = true;        
        if(!isChart){
            setIsChart(true);
        }
        else{
            setIsChart(false);
        }
    }
    
    return isApiCalled;
    
}
function hosptName(){
    let hos = [];
    
    if(!ishospital && (disName !== '' || disName !== 'all')){
        var data = [];
        for(var i=0;i<=allHospts.length-1;i++){
            var str2 = allHospts[i].split("-")
            if(disName === (str2[0]+"-"+str2[1])){
                data.push(str2[2]); 
            }
        }
        console.log(data)
        hos = data.map((x) => { 
            return(
                <MenuItem key={x} value={x} >{x}</MenuItem>)
      })
        
    }
    return hos;
}
function districName(){
    let districtList ;
    
    if(allDistricts.length > 0){
        allDistricts = allDistricts.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);
    }
    if(allHospts.length > 0){
        allHospts = allHospts.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);
    }
    var base_url = `http://localhost:8080/openmrs/ws/rest/v1/onlineappointment/hospitals?country_id=1&state_id=2&district_id=`;
    for(var y = 3; y <=  20 ; y++){
        var url = base_url + y;
   axios
      .get(url, { headers: headers })
      .then((response) => { 
          if(response.data.sessionLocation.length !== 0 )   {
            var searchdatanew = []; 
            var newData = [];
            for (let i = 0; i < response.data.sessionLocation.length; i++) {                
                searchdatanew.push(response.data.sessionLocation);                
                let hospval = searchdatanew[0][i]["online_hospital_name"];
                let district_name = searchdatanew[0][i]["online_hospital_district"]['online_location_name'];
                let district_id = searchdatanew[0][i]["online_hospital_district"]['online_location_id'];
                if(!districtId.includes(district_name)){
                    districtId.push(district_name);
                }                
                allDistricts.push(district_id+"-"+district_name); 
                allHospts.push(district_id+"-"+district_name+"-"+hospval );               
            }
          }
          
      })
      
        districtList = allDistricts.map((x) => { 
            var str_id = x.split("-")
            return(
                <MenuItem key={str_id[0]} value={x} >{str_id[1]}</MenuItem>)
      })
       
        
    }
  
return districtList;
}
function handleToDate(e){
    var tDate = e.target.value;
    var str = tDate.split("-");
    toDate = str[2]+"-"+str[1]+"-"+str[0]
    settoDate(toDate);
    if(reportType ==='daily'){
        setIsDateOpened(false);
    }
}
function handleFromDate(e){
    var fDate = e.target.value;
    var str = fDate.split("-");
    fromDate = str[2]+"-"+str[1]+"-"+str[0]
    setfromDate(fromDate);
    if(reportType ==='daily'){
        setIsDateOpened(false);
    }
}
function handleToMonth(e){
    var mdate = e.target.value;
    var str = mdate.split("-");
    fromDate = "01-"+str[1]+"-"+str[0];
    toDate = "31-"+str[1]+"-"+str[0];
    setfromDate(fromDate);
    settoDate(toDate);
    if(reportType ==='daily'){
        setIsMonthOpened(false);
    }
    
    console.log(fromDate)
}
function handleToYear(e){
    var ydate = e.target.value;
    fromDate = "1-3-"(ydate-1);
    toDate = "30-4-"+ydate;
    setfromDate(fromDate);
    settoDate(toDate);
    console.log(ydate) 
    if(reportType ==='daily'){
        setIsYearOpened(false);
    }
}
function handleChange(e){

    var selectVal = e.target.value;
    setIsDateOpened(false);
    setIsMonthOpened(false);
    setIsYearOpened(false);
    switch (selectVal) {
        case '31days':
            return (
                setIsDateOpened(wasOpened => !wasOpened)                
            )
        case 'month':
            return (
              setIsMonthOpened(wasOpened => !wasOpened)
            )
            case 'year':
            return (
              setIsYearOpened(wasOpened => !wasOpened)
            )
        default:
            return (
              <div></div>
            )
     }
}

    return (
        <>
        <Paper className={classes.paper}>
        <br/>
        <GridContainer>
        <GridItem item xs={12} sm={6} md={3}>
        <InputLabel htmlFor="age-native-simple">Report Type</InputLabel>
        <Select defaultValue="-1" className={classes.field}
        labelId="label" id="select" label="Report Type" onChange={handleReportType} >
                <MenuItem value="-1" disabled>Please Select</MenuItem>
                <MenuItem value="daily">Daily Activity Report</MenuItem>
                <MenuItem value="gender">Gender Wise Report</MenuItem>
                <MenuItem value="hospital">Hospital wise Report</MenuItem>
                <MenuItem value="district">District wise Report</MenuItem>
            </Select>
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="age-native-simple">District Name</InputLabel>
            <Select defaultValue="-1" className={classes.field}
            id="disName" onChange={handleDistrictType} >
                <MenuItem value="-1" disabled>Please Select</MenuItem>
                {!ishospital &&(<MenuItem value="all" >ALL District</MenuItem>)}
                {districName()}
            </Select>
        </GridItem>
        {!isdistrict &&(
            <GridItem item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="age-native-simple">Health Facility Name</InputLabel>
            <Select defaultValue="-1" className={classes.field}
            id="hosName" onChange={handleHospitalType}>
                <MenuItem value="-1" disabled>Please Select</MenuItem>
                <MenuItem value="all" >ALL Facilities</MenuItem>
                {hosptName()}
            </Select>
        </GridItem>)}
        
        <GridItem item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="age-native-simple">Date Range</InputLabel>
            <Select label="Patient Id" defaultValue="-1" onChange={handleChange} disabled = {isAllReport} className={classes.field}>
                <MenuItem value="-1" disabled>Please Select</MenuItem>
                <MenuItem value="31days">Date Wise</MenuItem>
                <MenuItem value="month">Month Wise</MenuItem>
                <MenuItem value="year">Financial Year</MenuItem>
            </Select>
        </GridItem>
        </GridContainer>
            <br/>
            {isDateOpened && !isAllReport && (
        <GridContainer id="gd1">
        
            <GridItem item xs={12} sm={3} md={3}>
        <TextField
                id="date"
                label="From Date"
                type="date"
                data-date-format="DD MMMM YYYY"
                defaultValue={sDate}
                onChange={handleFromDate}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
            <TextField
                id="date"
                label="To Date"
                type="date"
                defaultValue={eDate}                
                onChange={handleToDate}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </GridItem>
        </GridContainer>)}
        {isMonthOpened && (
        <GridContainer>
   
            <GridItem item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="age-native-simple">Month Range</InputLabel>
            
            <TextField
            type="month" 
                defaultValue="2021-08"
                onChange={handleToMonth}    
                />
            </GridItem>
        </GridContainer>
        )}
        {isYearOpened && (
        <GridContainer>
        <GridItem item xs={12} sm={6} md={3}>
        <InputLabel htmlFor="age-native-simple">Financial Year</InputLabel>
        <Select label="Financial Year" defaultValue="-1" onChange={handleToYear}>
        <MenuItem value="-1" disabled>Please Select</MenuItem>
                {yearList}
         </Select>           
        </GridItem>
        </GridContainer>
        )}<br/>
        <GridContainer>
        <GridItem item xs={12} sm={6} md={3}>
        <Button className={clsx(classes.button, classes.field)} variant="contained" color="primary" onClick={showPieChart} id="show" >  Show Result</Button>
        <Button className={clsx(classes.button, classes.field)} variant="contained" color="secondary" onClick={showPieChart}>  Reset</Button>
</GridItem>
        </GridContainer>
        </Paper>

       {isChart && (<Paper className={classes.paper}>
        
       <Chart reportName={reportType} data={allHosptsData} labelName={allHosptsName} maleData={allHosptsmale} femaleData = {allHosptsfemale}/>
       </Paper>
       )}
        </>
    )
}

export default Reports