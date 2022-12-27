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
import "chartjs-plugin-datalabels";

import { GridContainer, GridItem } from "../../components/Grid";
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
  let [isAllReport, setisAllReport] = React.useState(false);
  let [ishospital, setishospital] = React.useState(false);
  let [isdistrict, setisDistrict] = React.useState(false);
  let [startProgress, setstartProgress] = React.useState(false);
  let [dateRange, setDateRange] = React.useState('');
  const [allHosptsName, setallHosptsName] = React.useState([]);
  const [allHosptsData, setallHosptsData] = React.useState([]);
  const [allHosptsmale, setallHosptsmale] = React.useState([]);
  const [allHosptsfemale, setallHosptsfemale] = React.useState([]);
  let [allHospts, setallHospts] = React.useState([]);
  let [hospitals, setHospitals] = React.useState([]);
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
  let [isChart, setIsChart] = React.useState(false);
  let [isGenerated, setisGenerated] = React.useState(false);

  const [startDate, setStartDate] = React.useState(new Date());

  var frommonth = '';
  var tomonth = '';
  var cudate = '';
  var monthWise = '';
  if ((startDate.getMonth()) < 10) {
    frommonth = "0" + (startDate.getMonth());
    tomonth = "0" + (startDate.getMonth() + 1);
  } else {
    frommonth = startDate.getMonth();
    tomonth = (startDate.getMonth() + 1);
  }
  if ((startDate.getDate()) < 10) {
    cudate = "0" + (startDate.getDate());
  } else { cudate = startDate.getDate(); }

  var sDate = startDate.getFullYear() + "-" + frommonth + "-" + cudate;
  var eDate = startDate.getFullYear() + "-" + tomonth + "-" + cudate;

  monthWise = startDate.getFullYear() + "-" + tomonth;

  let maxOffset = 10;
  let thisYear = (new Date()).getFullYear() + 1;
  let allYears = [];
  
  for (let x = 0; x <= maxOffset; x++) {
    allYears.push(thisYear - x)
  }
  let [isCall, setisCall] = React.useState(false);

  if (!isCall) {
    setisCall(true);
    districtName();
  }
  if (allDistricts.length > 0) {
    allDistricts = allDistricts.reduce(function (a, b) {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, []);
  }
  const hosList = hosptName();
  const distList = allDistricts.map((x) => {
    var str_id = x.split("-")
    return (
      <MenuItem key={str_id[0]} value={x} >{str_id[1]}</MenuItem>)
  });
  const yearList = allYears.map((x) => {
    return (<MenuItem value={x} >{x - 1}-{x}</MenuItem>)
  });

  const getChart = () => {
    var dis = [];
    if (reportType === 'daily') {
      fromDate = (startDate.getDate() - 1) + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
      toDate = (startDate.getDate()) + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
      settoDate(toDate);
    }

    if (disName !== 'all') {
      var str = disName.split("-")
      dis.length = 0;
      dis.push(str[1]);
    }
    else {
      hosName = "all";
      dis.length = 0;
      dis.push.apply(dis, districtId);
    }
    if (hosName === "all") {
      headerCon = "";
    }
    else {
      headerCon = '&hosp_name=' + hosName;
    }

    var newallHosptsData = [];
    var newallHosptsName = [];
    var newallHosptsmale = [];
    var newallHosptsfemale = [];
    for (var i = 0; i <= dis.length - 1; i++) {
      param = dis[i];
      if (reportType === 'district') {
        headerCon = "";
      }
      setallHosptsName([])
      setallHosptsData([])
      setallHosptsmale([])
      setallHosptsfemale([])
      console.log('param>>>>>>>.', param, headerCon)
      getHispAPI(
        `/mpi_reporting?district=${param}${headerCon}&from_date=${fromDate}&to_date=${toDate}`
      ).then((response) => {

        if (response.data.length > 0) {
          var searchdatanew = [];
          for (let i = 0; i < response.data.length; i++) {
            searchdatanew.push(response.data);
            let hospname = searchdatanew[0][i]["hospital"]["hosp_name"];
            let hospval = searchdatanew[0][i]["hospital"]["tot_reg"];
            let malVal = searchdatanew[0][i]["hospital"]["male_reg"];
            let femalVal = searchdatanew[0][i]["hospital"]["female_reg"];

            if (!newallHosptsName.includes(hospname + "")
            ) {
              newallHosptsName.push(hospname + "");
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
        else {
          allHosptsName.length = 0;
          allHosptsData.length = 0;
          allHosptsmale.length = 0;
          allHosptsfemale.length = 0;
          setisGenerated(true);
        }

      })
        .catch((error) => {
          console.log(error)
          //setstartProgress(true);
        })
      console.log(allHosptsName);
    }

    return isGenerated;
  }
  function handleReportType(e) {
    setIsChart(false);
    setReportType(e.target.value);
    if (e.target.value === 'daily') {
      setisAllReport(true);
      setisDistrict(false);
      setishospital(false);
      setIsMonthOpened(false);
      setIsDateOpened(false);
      setIsYearOpened(false);
    }
    else if (e.target.value === 'district') {
      setisDistrict(true);
      setishospital(false);
      setisAllReport(false);
      if (dateRange !== '-1') {
        if (dateRange === '31days') {
          setIsDateOpened(true);
        }
        if (dateRange === 'month') {
          setIsMonthOpened(true);
        }
        if (dateRange === 'year') {
          setIsYearOpened(true);
        }
      }
    }
    else if (e.target.value === 'hospital') {
      setHosName('all');
      setishospital(true);
      setisDistrict(false);
      setisAllReport(false);
      if (dateRange !== '-1') {
        if (dateRange === '31days') {
          setIsDateOpened(true);
        }
        if (dateRange === 'month') {
          setIsMonthOpened(true);
        }
        if (dateRange === 'year') {
          setIsYearOpened(true);
        }
      }
    }
    else {
      setisDistrict(false);
      setishospital(false);
      setisAllReport(false);
      if (dateRange !== '-1') {
        if (dateRange === '31days') {
          setIsDateOpened(true);
        }
        if (dateRange === 'month') {
          setIsMonthOpened(true);
        }
        if (dateRange === 'year') {
          setIsYearOpened(true);
        }
      }

    }
  }
  function handleHospitalType(e) {
    setIsChart(false);
    setHosName(e.target.value);
  }
  function handleDistrictType(e) {

    var dis = districName(e.target.value);

    setIsChart(false);
    console.log(dis)
    setDisName(e.target.value);

    //var str = e.target.value.split("-")
  }
  function checkValidation() {
    var valid = false;
    if (reportType === '-1') {
      alert("Please select Report");
      return false;
    }
    if (disName === "-1") {
      alert("Please select District");
      return false;
    }
    if ((reportType !== 'daily' || reportType !== 'hospital') && hosName === '-1') {
      alert("Please select Hospital");
      return false;
    }
    if ((reportType !== 'daily') && dateRange === "") {
      alert("Please select Date Range");
      return false;
    }
    else {
      valid = true;
    }
    return valid;
  }
  function showPieChart() {
    if (getChart()) {
      if (checkValidation()) {
        setstartProgress(false);
        isApiCalled = true;
        if (!isChart) {
          setIsChart(true);
        }
        else {
          setIsChart(false);
        }
      }
    } else {
      getChart();
      if (checkValidation()) {
        setstartProgress(true);

        setIsChart(true);
        setstartProgress(false);
        return true
      }
    }
    return isApiCalled;
  }
  function resetAll(e) {
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
    return hos;
  }
  function districtName() {
    allHosptsData.length = 0;
    allHosptsName.length = 0;
    allHosptsfemale.length = 0;
    allHosptsmale.length = 0;
    // data={allHosptsData} labelName={allHosptsName} maleData={allHosptsmale} femaleData={allHosptsfemale}
    var base_url = `/onlineappointment/locations?location_type_id=3`;
    getAPI(base_url).then((response) => {
      if (response.data.sessionLocation.length !== 0) {
        var searchdatanew = [];
        //var newData = [];
        for (let i = 0; i < response.data.sessionLocation.length; i++) {
          searchdatanew.push(response.data.sessionLocation);

          let district_name = searchdatanew[0][i]['online_location_name'];
          let district_id = searchdatanew[0][i]['online_location_id'];

          if (!districtId.includes(district_name)) {
            districtId.push(district_name);
          }
          allDistricts.push(district_id + "-" + district_name);
        }
      }
    })
    return allDistricts;
  }

  function districName(dis) {
    allHosptsData.length = 0;
    allHosptsName.length = 0;
    allHosptsfemale.length = 0;
    allHosptsmale.length = 0;
    let hos = [];
    hospitals.length = 0;
    if (!ishospital && (dis !== '-1' || dis !== 'all')) {
      var data = [];
      console.log(dis);
      var disStr = dis.split("-");
      if (disStr[0] !== 'all') {
        var base_url = `/onlineappointment/hospitals?country_id=1&state_id=2&district_id=` + disStr[0];
        console.log(base_url);
        getAPI(base_url).then((response) => {
          if (response.data.sessionLocation.length !== 0) {
            var searchdatanew = [];
            var newhosNames = []
            for (let i = 0; i < response.data.sessionLocation.length; i++) {
              searchdatanew.push(response.data.sessionLocation);
              let hospval = searchdatanew[0][i]["online_hospital_name"];
              let district_name = searchdatanew[0][i]["online_hospital_district"]['online_location_name'];
              let district_id = searchdatanew[0][i]["online_hospital_district"]['online_location_id'];
              if (!districtId.includes(district_name)) {
                districtId.push(district_name);
              }
              newhosNames.push(district_id + "-" + district_name + "-" + hospval);
            }
            allHospts.length = 0;
            allHospts.push.apply(allHospts, newhosNames);
            setallHospts(newhosNames);
          }
          else {
            allHospts.length = 0;
          }
          console.log(allHospts)
          if (allHospts.length > 0) {
            allHospts = allHospts.reduce(function (a, b) {
              if (a.indexOf(b) < 0) a.push(b);
              return a;
            }, []);
          }

          for (var i = 0; i <= allHospts.length - 1; i++) {
            var str2 = allHospts[i].split("-")
            if (disName === (str2[0] + "-" + str2[1])) {
              data.push(str2[2]);
            }
          }
          hos = allHospts.map((x) => {
            var str2 = x.split("-")
            return (
              <MenuItem key={str2[2]} value={str2[2]} >{str2[2]}</MenuItem>)
          })
          hospitals.push.apply(hospitals, hos)
          //setHospitals(hos);
          console.log(hos)
        })
      }
    }


    return hospitals;
  }
  function handleToDate(e) {
    setIsChart(false)
    var tDate = e.target.value;
    var str = tDate.split("-");
    toDate = str[2] + "-" + str[1] + "-" + str[0]
    settoDate(toDate);
    if (reportType === 'daily') {
      setIsDateOpened(false);
    }
  }
  function handleFromDate(e) {
    setIsChart(false)
    var fDate = e.target.value;
    var str = fDate.split("-");
    fromDate = str[2] + "-" + str[1] + "-" + str[0]
    setfromDate(fromDate);
    if (reportType === 'daily') {
      setIsDateOpened(false);
    }
  }
  function handleToMonth(e) {
    setIsChart(false)
    var mdate = e.target.value;
    var str = mdate.split("-");
    fromDate = "01-" + str[1] + "-" + str[0];
    toDate = "31-" + str[1] + "-" + str[0];
    setfromDate(fromDate);
    settoDate(toDate);
    if (reportType === 'daily') {
      setIsMonthOpened(false);
    }
  }
  function handleToYear(e) {
    setIsChart(false)
    var ydate = e.target.value;
    fromDate = "1-3-" + (ydate - 1);
    toDate = "30-4-" + ydate;
    setfromDate(fromDate);
    settoDate(toDate);
    console.log(ydate)
    if (reportType === 'daily') {
      setIsYearOpened(false);
    }
  }
  function handleChange(e) {
    var selectVal = e.target.value;
    setDateRange(selectVal);
    setIsDateOpened(false);
    setIsMonthOpened(false);
    setIsYearOpened(false);
    setIsChart(false)
    switch (selectVal) {
      case "31days":
        var str1 = sDate.split("-");
        fromDate = str1[2] + "-" + str1[1] + "-" + str1[0]
        setfromDate(fromDate);
        var str2 = eDate.split("-");
        toDate = str2[2] + "-" + str2[1] + "-" + str2[0]
        settoDate(toDate);
        return setIsDateOpened((wasOpened) => !wasOpened);
      case "month":
        var str = eDate.split("-");
        fromDate = "01-" + str[1] + "-" + str[0];
        toDate = "31-" + str[1] + "-" + str[0];
        setfromDate(fromDate);
        settoDate(toDate);
        return setIsMonthOpened((wasOpened) => !wasOpened);
      case "year":
        var yr = eDate.split("-");
        //alert(yr[0])
        fromDate = "01-03-" + (yr[0] - 1);
        toDate = "30-04-" + yr[0];
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
          <br />
          <GridContainer>
            <GridItem item xs={12} sm={6} md={3}>
              <InputLabel htmlFor="age-native-simple">Report Type</InputLabel>
              <Select variant="outlined"
                margin="dense"
                fullWidth defaultValue="-1" className={classes.field}
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
              <Select variant="outlined"
                margin="dense"
                fullWidth defaultValue="-1" className={classes.field}
                id="disName" onChange={handleDistrictType} >
                <MenuItem value="-1" disabled>Please Select</MenuItem>
                {!ishospital && (<MenuItem value="all" >ALL District</MenuItem>)}
                {distList}
              </Select>
            </GridItem>
            {!isdistrict && (
              <GridItem item xs={12} sm={6} md={3}>
                <InputLabel htmlFor="age-native-simple">Health Facility Name</InputLabel>
                <Select variant="outlined"
                  margin="dense"
                  fullWidth defaultValue={ishospital ? "all" : "-1"} className={classes.field}
                  id="hosName" onChange={handleHospitalType} disabled={ishospital}>
                  <MenuItem value="-1" disabled>Please Select</MenuItem>
                  <MenuItem value="all" >ALL Facilities</MenuItem>
                  {hospitals}
                </Select>
              </GridItem>)}

            <GridItem item xs={12} sm={6} md={3}>
              <InputLabel htmlFor="age-native-simple">Date Range</InputLabel>
              <Select variant="outlined"
                margin="dense"
                fullWidth label="Date Range" defaultValue="-1" onChange={handleChange} disabled={isAllReport} className={classes.field}>
                <MenuItem value="-1" disabled>Please Select</MenuItem>
                <MenuItem value="31days">Date Wise</MenuItem>
                <MenuItem value="month">Month Wise</MenuItem>
                <MenuItem value="year">Financial Year</MenuItem>
              </Select>
            </GridItem>
            {isDateOpened && !isAllReport && (
              <>
                <GridItem item xs={12} sm={6} md={3}>
                  <InputLabel htmlFor="age-native-simple">From Date</InputLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    id="date"
                    type="date"
                    className={classes.field}
                    defaultValue={sDate}
                    onChange={handleFromDate}
                    inputProps={{ max: eDate }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem item xs={12} sm={6} md={3}>
                  <InputLabel htmlFor="age-native-simple">To Date</InputLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    id="date"
                    type="date"
                    className={classes.field}
                    defaultValue={eDate}
                    inputProps={{ max: eDate }}
                    onChange={handleToDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem></>
            )}
            {isMonthOpened && (

              <GridItem item xs={12} sm={6} md={3}>
                <InputLabel htmlFor="age-native-simple">Month Wise</InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="month"
                  className={classes.field}
                  defaultValue={monthWise}
                  onChange={handleToMonth}
                />
              </GridItem>

            )}
            {isYearOpened && (
              <GridItem item xs={12} sm={6} md={3}>
                <InputLabel htmlFor="age-native-simple">Financial Year</InputLabel>
                <Select
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  label="Financial Year" defaultValue="-1" onChange={handleToYear} className={classes.field}>
                  <MenuItem value="-1" disabled>Please Select</MenuItem>
                  {yearList}
                </Select>
              </GridItem>
            )}
          </GridContainer>
          <GridContainer>
            <GridItem item xs={12} sm={6} md={3}>
              <Button className={clsx(classes.button, classes.field)} style={{backgroundColor:'#26c6da'  }} variant="contained" color="primary"
                onClick={(e) => showPieChart(e)}
                id="show" >  Show Result</Button>
              <Button className={clsx(classes.button, classes.field)} variant="contained"
                onClick={(e) => resetAll(e)}
              >  Reset</Button>
            </GridItem>
          </GridContainer>
        </Paper>
      </form>
      {startProgress && (<ProgressBar />)}
      {isChart && (
        <Paper className={classes.paper} >

          <SimpleListMenu reportName={reportType} data={allHosptsData} labelName={allHosptsName} maleData={allHosptsmale} femaleData={allHosptsfemale} />

        </Paper>
      )}
    </>
  );
}

export default Reports;
