import React, { useEffect, useState } from "react";
import {
    Select,
    MenuItem,
    InputLabel,
    Button,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import "chartjs-plugin-datalabels";

import { GridContainer, GridItem } from "../../components/Grid";
import styles from "./styles";
import "./styles.css";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import SimpleListMenu from './simplelistmenu';
import ProgressBar from './progressBar';
import { useDispatch, useSelector } from "react-redux";

import { AllDistrictList, AllReportChartData } from '../../services/reportService'
import { addHospitals, addHospitalsLists, addReportData } from "../../actions/reportActions";
import swal from "sweetalert";

const useStyles = makeStyles(styles);

function Reports() {
    const classes = useStyles();
    var formRef = React.createRef();
    const dispatch = useDispatch()

    const [finalcialYearList, setFinalcialYearList] = useState('');
    const [fromDate, setfromDate] = useState(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())
    const [toDate, settoDate] = useState(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())
    const [dailyActiveToggle, setdailyActiveToggle] = useState(false)
    const [genderWiseToggle, setgenderWiseToggle] = useState(false)
    const [hospitalWiseToggle, sethospitalWiseToggle] = useState(false)
    const [districWiseToggle, setdistricWiseToggle] = useState(false)
    const [dateWiseToggle, setdateWiseToggle] = useState(false)
    const [monthWiseToggle, setmonthWiseToggle] = useState(false)
    const [yearWiseToggle, setyearWiseToggle] = useState(false)
    const [reportShow, setReportShow] = useState(false)
    const [loader, setloader] = useState(false)
    const [reportType, setReportType] = useState('-1');
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospitalName, setSelectedHospitalName] = useState('-1');

    // const [startDate, setstartDate] = useState(new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate())
    // const [endDate, setendDate] = useState(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())
    const [monthwiseDate, setmonthwiseDate] = useState(new Date().getFullYear() + "-" + (new Date().getMonth() + 1))
    const [districName, setDistricName] = useState('')

    const { hospitalLits, reportData = [], hospitalsByDistrict = [] } = useSelector(state => state.reports)
    const { totalRegistrationCount = [], totalMaleCount = [], totalFeMaleCount = [], totalHospitalName = [] } = reportData

    const districLable = hospitalLits?.map(dist => <MenuItem key={dist?.online_location_id} value={dist?.online_location_id}  >{dist?.online_location_name}</MenuItem>)
    
    function Alert(msg) {
        swal({
            title: "Warning?",
            text: msg,
            icon: "warning",
            dangerMode: true,
        })
    }

    function checkValidaionsReport() {
        if (dailyActiveToggle || genderWiseToggle || hospitalWiseToggle || districWiseToggle) return true
        else return false
    }
    function checkValidaionsDistric() {
        if (districName.length) return true
        else return false
    }
    function checkValidaionsDaterRange() {
        if (dailyActiveToggle) return true
        else {
            if (dateWiseToggle || monthWiseToggle || yearWiseToggle) return true
            else return false
        }
    }

    async function handleShowResults() {
        if (checkValidaionsReport()) {
            if (checkValidaionsDistric()) {
                if (checkValidaionsDaterRange()) {
                    setloader(true)

                    const fStr = fromDate.split("-")
                    const tStr = toDate.split("-");
                    const fDate = fStr[2] + "/" + fStr[1] + "/" + fStr[0]
                    const tDate = tStr[2] + "/" + tStr[1] + "/" + tStr[0]

                    const result = await AllReportChartData.getAllReportChartData(fDate, tDate, districName, selectedHospitalName, setloader)
                    dispatch(addReportData(result))
                    setloader(false)
                    setReportShow(true)
                } else Alert('Please select a date range!')
            } else Alert('Please select a district!')
        } else Alert('Please select a report!')
    }

    function handleReportType(e) {
        const selectReportType = e.target.value
        setReportShow(false)
        switch (selectReportType) {
            case 'daily':
                setdailyActiveToggle(true)
                setgenderWiseToggle(false)
                sethospitalWiseToggle(false)
                setdistricWiseToggle(false)
                setReportType(selectReportType)
                break;

            case 'gender':
                setdailyActiveToggle(false)
                setgenderWiseToggle(true)
                sethospitalWiseToggle(false)
                setdistricWiseToggle(false)
                setReportType(selectReportType)
                break;

            case 'hospital':
                setdailyActiveToggle(false)
                setgenderWiseToggle(false)
                sethospitalWiseToggle(true)
                setdistricWiseToggle(false)
                setSelectedHospitalName('-1')
                setReportType(selectReportType)
                break;

            case 'district':
                setdailyActiveToggle(false)
                setgenderWiseToggle(false)
                sethospitalWiseToggle(false)
                setdistricWiseToggle(true)
                setSelectedHospitalName('-1')
                setReportType(selectReportType)
                break;

            case '31days':
                setdateWiseToggle(true)
                setmonthWiseToggle(false)
                setyearWiseToggle(false)
                break;

            case 'month':
                setdateWiseToggle(false)
                setmonthWiseToggle(true)
                setyearWiseToggle(false)
                setfromDate((new Date()).getFullYear() + 1 + "-03-01");
                settoDate((new Date()).getFullYear() + 1 + "-04-31");
                break;

            case 'year':
                setdateWiseToggle(false)
                setmonthWiseToggle(false)
                setyearWiseToggle(true)
                setfromDate(((new Date()).getFullYear() + 1 - 1) + "-03-01");
                settoDate((new Date()).getFullYear() + 1 + "-04-31");
                break;

            default:
                break;
        }
    }

    function handleToDate(e) {
        setReportShow(false)
        const tDate = e.target.value;
        const str = tDate.split("-");
        settoDate(str[0] + "-" + str[1] + "-" + str[2]);
    }

    function handleFromDate(e) {
        setReportShow(false)
        const fDate = e.target.value;
        const str = fDate?.split("-");
        setfromDate(str[0] + "-" + str[1] + "-" + str[2]);
    }

    function handleToMonth(e) {
        setReportShow(false)
        const mdate = e.target.value;
        const str = mdate.split("-");

        setfromDate(str[0] + "-" + str[1] + "-" + '01');
        settoDate(str[0] + + str[1] + "-" + '31');
        setmonthwiseDate(str[1] + "-" + str[0])
    }

    function handleToYear(e) {
        setReportShow(false)
        const ydate = e.target.value;
        setfromDate((ydate - 1) + "-03-01");
        settoDate(ydate + "-04-31");
    }

    async function handleDistricName(e, v) {
        const name = v?.props?.children
        const id = v.props?.value
        setReportShow(false)
        setDistricName(name)
        if (id !== 'all') {
            const hospitalsList = await AllDistrictList.getAllDistricHospitalsLists(id)
            const hospitals = hospitalsList?.map(hos => <MenuItem key={hos?.online_hospital_id} value={hos?.online_hospital_id}  >{hos?.online_hospital_name}</MenuItem>)
            setHospitals(hospitals)

            dispatch(addHospitalsLists(hospitalsList))
        } else {
            setHospitals([])
            dispatch(addHospitalsLists([]))
        }
    }


    // ---------------------------------------useEffacts--------------------------------------------------------

    useEffect(() => {
        async function fetchInitialData() {
            let maxOffset = 10;
            let thisYear = (new Date()).getFullYear() + 1;
            let allYears = [];

            for (let x = 0; x <= maxOffset; x++) {
                allYears.push(thisYear - x)
            }

            const yearList = allYears.map((x) => {
                return (<MenuItem value={x} >{x - 1}-{x}</MenuItem>)
            });

            setFinalcialYearList(yearList)

            const lists = await AllDistrictList.getAllDistricLists()
            dispatch(addHospitals(lists))
        }

        // const fStr = fromDate.split("-")
        // const tStr = toDate.split("-");
        // const fDate = fStr[2] + "/" + fStr[1] + "/" + fStr[0]
        // const tDate = tStr[2] + "/" + tStr[1] + "/" + tStr[0]

        // const result = await AllReportChartData.getAllReportChartData(fDate, tDate, districName, setloader)
        // dispatch(addReportData(result))
        fetchInitialData()
    }, [])

    useEffect(() => {
        setReportShow(false)
    }, [selectedHospitalName])



    function handleReset() {
        window.location.reload(false)
        // setFinalcialYearList('');
        // setfromDate(new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate())
        // settoDate(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())
        // setdailyActiveToggle(false)
        // setgenderWiseToggle(false)
        // sethospitalWiseToggle(false)
        // setdistricWiseToggle(false)
        // setdateWiseToggle(false)
        // setmonthWiseToggle(false)
        // setyearWiseToggle(false)
        // setReportShow(false)
        // setloader(false)
        // setReportType('-1');
        // setmonthwiseDate(new Date().getFullYear() + "-" + (new Date().getMonth() + 1))
        // setDistricName('-1')
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
                                labelId="label" id="reportType" label="Report Type" onChange={handleReportType}  >
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
                                name='hosName'
                                fullWidth defaultValue="-1" className={classes.field} onChange={(e, v) => handleDistricName(e, v)}
                                id="hosName" >
                                <MenuItem value="-1" disabled>Please Select</MenuItem>
                                {!hospitalWiseToggle && <MenuItem value="all" >ALL District</MenuItem>}
                                {districLable}
                            </Select>
                        </GridItem>

                        {!districWiseToggle && <GridItem item xs={12} sm={6} md={3}>
                            <InputLabel htmlFor="age-native-simple">Health Facility Name</InputLabel>
                            <Select variant="outlined"
                                margin="dense"
                                fullWidth
                                defaultValue="-1"
                                // value={selectedHospitalName}
                                disabled={hospitalWiseToggle}
                                onChange={(e, v) => setSelectedHospitalName(v ? v?.props?.children : '')}
                                className={classes.field}
                                id="healthName" >
                                <MenuItem value="-1" disabled>Please Select</MenuItem>
                                <MenuItem value="all" >ALL Facilities</MenuItem>
                                {hospitals}
                            </Select>
                        </GridItem>}

                        <GridItem item xs={12} sm={6} md={3}>
                            <InputLabel htmlFor="age-native-simple">Date Range</InputLabel>
                            <Select variant="outlined"
                                margin="dense"
                                disabled={dailyActiveToggle}
                                fullWidth label="Date Range" defaultValue="-1" className={classes.field} onChange={handleReportType} >
                                <MenuItem value="-1" disabled>Please Select</MenuItem>
                                <MenuItem value="31days">Date Wise</MenuItem>
                                <MenuItem value="month">Month Wise</MenuItem>
                                <MenuItem value="year">Financial Year</MenuItem>
                            </Select>
                        </GridItem>

                        {!dailyActiveToggle && dateWiseToggle && <>
                            <GridItem item xs={12} sm={6} md={3}>
                                <InputLabel htmlFor="age-native-simple">From Date</InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    type="date"
                                    className={classes.field}
                                    defaultValue={fromDate}
                                    onChange={handleFromDate}
                                    inputProps={{ max: fromDate }}

                                />
                            </GridItem>
                            <GridItem item xs={12} sm={6} md={3}>
                                <InputLabel htmlFor="age-native-simple">To Date</InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    type="date"
                                    className={classes.field}
                                    defaultValue={toDate}
                                    inputProps={{ max: toDate }}
                                    onChange={handleToDate}
                                />
                            </GridItem></>}

                        {!dailyActiveToggle && monthWiseToggle &&
                            <GridItem item xs={12} sm={6} md={3}>
                                <InputLabel htmlFor="age-native-simple">Month Wise</InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    defaultValue={monthwiseDate}
                                    type="month"
                                    onChange={handleToMonth}
                                    className={classes.field}
                                />
                            </GridItem>
                        }

                        {!dailyActiveToggle && yearWiseToggle && <GridItem item xs={12} sm={6} md={3}>
                            <InputLabel htmlFor="age-native-simple">Financial Year</InputLabel>
                            <Select
                                variant="outlined"
                                fullWidth
                                onChange={handleToYear}
                                margin="dense"
                                label="Financial Year" defaultValue="-1" className={classes.field}>
                                <MenuItem value="-1" disabled>Please Select</MenuItem>
                                {finalcialYearList}
                            </Select>
                        </GridItem>}
                    </GridContainer>
                    <GridContainer>
                        <GridItem item xs={12} sm={6} md={3}>
                            <Button disabled={reportShow} loader={loader} onClick={handleShowResults} className={clsx(classes.button, classes.field)} style={{ backgroundColor: '#26c6da', color: 'white' }} variant="contained"
                                id="show" >  Show Result</Button>
                            <Button className={clsx(classes.button, classes.field)} variant="contained" onClick={handleReset}

                            >  Reset</Button>
                        </GridItem>
                    </GridContainer>
                </Paper>
            </form>
            {loader && <Typography className={classes.paper} align="center" ><ProgressBar /></Typography>}
            {reportShow && <Paper className={classes.paper} >
                <SimpleListMenu reportName={reportType} data={totalRegistrationCount} labelName={totalHospitalName} maleData={totalMaleCount} femaleData={totalFeMaleCount} />
            </Paper>}
        </>
    )
}

export default Reports