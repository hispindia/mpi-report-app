/* eslint-disable no-loop-func */
import React from "react";
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
import styles from "./styles";
import "./styles.css";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { getAPI, getHispAPI } from "../../services";
import SimpleListMenu from './simplelistmenu';
import ProgressBar from './progressBar';

const useStyles = makeStyles(styles);

function Reports() {
  const classes = useStyles();

  var param = "";
  var headerCon = "";
  var isApiCalled = false;
  var formRef = React.createRef();

  //var isAllReport = true;
  let[isAllReport, setisAllReport] = React.useState(false);
  let[ishospital, setishospital] = React.useState(false);
  let[isdistrict, setisDistrict] = React.useState(false);
  let[startProgress, setstartProgress] = React.useState(false);
  let[dateRange,setDateRange]=React.useState('');
  const [allHosptsName, setallHosptsName] = React.useState([]);
  const [allHosptsData, setallHosptsData] = React.useState([]);
  const [allHosptsmale, setallHosptsmale] = React.useState([]);
  const [allHosptsfemale, setallHosptsfemale] = React.useState([]);
  let [allHospts, setallHospts] = React.useState([]);
  let [allDistricts, setallDistricts] = React.useState([]);
    var [reportType, setReportType] = React.useState('-1');
    var [districtId, setdistrictId] = React.useState([]);
    var [disName, setDisName] = React.useState('-1');
    var [hosName, setHosName] = React.useState('');
    let [fromDate, setfromDate] = React.useState('');
    let [toDate, settoDate] = React.useState('');
    const [isDateOpened, setIsDateOpened] = React.useState(false);
    const [isMonthOpened, setIsMonthOpened] = React.useState(false);
    const [isYearOpened, setIsYearOpened] = React.useState(false);
    let[isChart, setIsChart] = React.useState(false);
    let[isGenerated, setisGenerated] = React.useState(false);
    
    const [startDate, setStartDate] = React.useState(new Date());

    var frommonth = '';
    var tomonth = '';
    if((startDate.getMonth()) < 10){
        frommonth = "0"+(startDate.getMonth());
        tomonth =  "0"+(startDate.getMonth()+1)
    }
 
    var sDate = startDate.getFullYear()+"-"+frommonth+"-"+startDate.getDate();
    var eDate = startDate.getFullYear() +"-"+ tomonth +"-"+ startDate.getDate();

    let maxOffset = 10;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for(let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }
    let[isCall, setisCall] = React.useState(false);
    
    if(!isCall){
        setisCall(true);
        districName();
    }
    if(allDistricts.length > 0){
        allDistricts = allDistricts.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);
    }
  const distList = allDistricts.map((x) =>
     {var str_id = x.split("-")
    return(
        <MenuItem key={str_id[0]} value={x} >{str_id[1]}</MenuItem>)});
  const yearList = allYears.map((x) => {
        return(<MenuItem value={x} >{x-1}-{x}</MenuItem>)});

  const getChart = () =>{
    var dis = [];
        if(reportType === 'daily')
        {
            fromDate = (startDate.getDate()-1) +"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
           toDate = (startDate.getDate()) +"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
            settoDate(toDate);
        } 
            
        if(disName !== 'all'){
            var str = disName.split("-")
            dis.length = 0;
            dis.push(str[1]);
        }
        else {
            hosName = "all";
            dis.length = 0;
            dis.push.apply(dis,districtId);
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
    for (var i=0; i <= dis.length-1; i++) {            
      param = dis[i];
      if(reportType === 'district'){
        headerCon = "";  
      }
      getHispAPI(
        `/mpi_reporting?district=${param}${headerCon}&from_date=${fromDate}&to_date=${toDate}`
      ).then((response) => {
       
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
                    newallHosptsmale.push(parseInt(malVal));
                    newallHosptsfemale.push(parseInt(femalVal));
                    
                }
                setisGenerated(true);
    allHosptsName.length = 0;
   allHosptsName.push.apply(allHosptsName, newallHosptsName);
    setallHosptsName(newallHosptsName);
    allHosptsData.length = 0;             
    allHosptsData.push.apply(allHosptsData, newallHosptsData);
    setallHosptsData(newallHosptsData);
    allHosptsmale.length = 0;        
    allHosptsmale.push.apply(allHosptsmale, newallHosptsmale); 
    setallHosptsmale(newallHosptsmale);
    allHosptsfemale.length = 0;
    allHosptsfemale.push.apply(allHosptsfemale, newallHosptsfemale); 
    setallHosptsfemale(newallHosptsfemale);
      
          }
        
    setisGenerated(true);
    setallHosptsName(allHosptsName);
    setallHosptsData(allHosptsData);
        }
        else{
            allHosptsName.length = 0; 
            allHosptsData.length = 0;
            allHosptsmale.length = 0;
            allHosptsfemale.length = 0;
            setisGenerated(true);
        }
        
      })
      .catch( ( error ) => {
          console.log(error)
        //setstartProgress(true);
      } )
      console.log(allHosptsName);
    }
    
    return isGenerated;
} 
  function handleReportType(e){
    setIsChart(false);
    setReportType(e.target.value) ;
    if(e.target.value === 'daily'){
        setisAllReport(true) ;
        setisDistrict(false);
        setishospital(false) ;
    }
    else if(e.target.value === 'district'){
        setisDistrict(true);
        setishospital(false) ;        
    }
    else if(e.target.value === 'hospital'){
        setHosName('all');
        setishospital(true) ;
        setisDistrict(false);
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
    setIsChart(false);
    setDisName(e.target.value ) ;
    hosptName();    
    //var str = e.target.value.split("-")
}
function checkValidation(){
  var valid = false;
  var stDate = new Date(toDate);
  var enDate = new Date(fromDate); 
 if(reportType === '-1') {
    alert("Please select Report");
    return false;
 }  
 if(disName === "-1"){
    alert("Please select District");
    return false;
 }
 if((reportType !== 'daily' || reportType !== 'hospital') && hosName === '-1'){
    alert("Please select Hospital");
    return false;
 }
 if((reportType !== 'daily' ) && dateRange === ""){
    alert("Please select Date Range");
    return false;
 }
 if(stDate.getTime() > enDate.getTime()){
    alert("Please select Valid Dates");
    return false;
 }
 else{
    valid = true;
 }
 return valid;
}
  function showPieChart() {
    if(getChart()){
        
      if(checkValidation()){ 
          setstartProgress(false);   
          isApiCalled = true;        
          if(!isChart){
              setIsChart(true);
          }
          else{
              setIsChart(false);
          }
      }  
      }else{
          getChart();
          if(checkValidation()){
              setstartProgress(true);
          
              setIsChart(true);
              setstartProgress(false);
              return true
          }
      }
      return isApiCalled;
    }
    function resetAll(e){
      setIsChart(false);
      allHosptsData.length = 0;
      allHosptsName.length = 0;
      allHosptsfemale.length = 0;
      allHosptsmale.length = 0;    
      formRef.current.reset();
      return true
  }
  function hosptName() {
    let hos = [];
    
    if(!ishospital && (disName !== '' || disName !== 'all')){
        var data = [];
        for(var i=0;i<=allHospts.length-1;i++){
            var str2 = allHospts[i].split("-")
            if(disName === (str2[0]+"-"+str2[1])){
                data.push(str2[2]); 
            }
        }
        
        hos = data.map((x) => { 
            return(
                <MenuItem key={x} value={x} >{x}</MenuItem>)
      })
        
    }
    return hos;
  }
  function districName() {
    if(allHospts.length > 0){
      allHospts = allHospts.reduce(function(a,b){
          if (a.indexOf(b) < 0 ) a.push(b);
          return a;
        },[]);
    }
    var base_url = `/onlineappointment/hospitals?country_id=1&state_id=2&district_id=`;
    for (var y = 3; y <= 20; y++) {
      var url = base_url + y;
      getAPI(url).then((response) => {
        if(response.data.sessionLocation.length !== 0 )   {
          var searchdatanew = []; 
          //var newData = [];
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
  }
  return allDistricts;
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
  function handleChange(e) {
    var selectVal = e.target.value;
    setDateRange(selectVal);
    setIsDateOpened(false);
    setIsMonthOpened(false);
    setIsYearOpened(false);
    switch (selectVal) {
      case "31days":
        var str1 = sDate.split("-");
        fromDate = str1[2]+"-"+str1[1]+"-"+str1[0]
        setfromDate(fromDate);
        var str2 = eDate.split("-");
        toDate = str2[2]+"-"+str2[1]+"-"+str2[0]
        settoDate(toDate);
        return setIsDateOpened((wasOpened) => !wasOpened);
      case "month":        
        var str = eDate.split("-");
        fromDate = "01-"+str[1]+"-"+str[0];
        toDate = "31-"+str[1]+"-"+str[0];
        setfromDate(fromDate);
        settoDate(toDate);
        return setIsMonthOpened((wasOpened) => !wasOpened);
      case "year":
        var str = eDate.split("-");
        fromDate = "01-03-"(str[0]-1);
        toDate = "30-04-"+str[0];
        setfromDate(fromDate);
        settoDate(toDate);
        return setIsYearOpened((wasOpened) => !wasOpened);
      default:
        return <div></div>;
    }
  }

  return (
    <>
        <form ref={formRef}>
        <Paper className={classes.paper} >
        <br/>
        <GridContainer>
        <GridItem item xs={12} sm={6} md={3}>
        <InputLabel htmlFor="age-native-simple">Report Type</InputLabel>
        <Select defaultValue="-1" className={classes.field}
        labelId="label" id="reportType" label="Report Type" onChange={handleReportType} >
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
                {distList}
            </Select>
        </GridItem>
        {!isdistrict &&(
            <GridItem item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="age-native-simple">Health Facility Name</InputLabel>
            <Select defaultValue={ishospital ? "all":"-1"} className={classes.field}
            id="hosName" onChange={handleHospitalType} disabled = {ishospital}>
                <MenuItem value="-1" disabled>Please Select</MenuItem>
                <MenuItem value="all" >ALL Facilities</MenuItem>
                {hosptName()}
            </Select>
        </GridItem>)}
        
        <GridItem item xs={12} sm={6} md={3}>
            <InputLabel htmlFor="age-native-simple">Date Range</InputLabel>
            <Select label="Date Range" defaultValue="-1" onChange={handleChange} disabled = {isAllReport} className={classes.field}>
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
                defaultValue={sDate}
                onChange={handleFromDate}
                inputProps={{ max: eDate }}
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
                inputProps={{ max: eDate }}               
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
        <Button className={clsx(classes.button, classes.field)} variant="contained" color="primary" 
         onClick={(e) => showPieChart(e)}
       id="show" >  Show Result</Button>
        <Button className={clsx(classes.button, classes.field)} variant="contained"
         color="secondary" 
         onClick={(e) => resetAll(e)}
         >  Reset</Button>
</GridItem>
        </GridContainer>
        </Paper>
        </form>
        {startProgress && ( <ProgressBar/>)}
       {isChart && (<Paper className={classes.paper}  >

        <SimpleListMenu reportName={reportType} data={allHosptsData} labelName={allHosptsName} maleData={allHosptsmale} femaleData = {allHosptsfemale}/>
       
       </Paper>
       )}
    </>
  );
}

export default Reports;
