import {
  DISTRICT_PARAM,
} from "../../utils/constants";
import { MenuItem } from "@material-ui/core";
import { getAPI, getHispAPI } from "../../services";

let allBaseHost = [];
export function getChart(hospital_name) {
  var headerCon = "&hosp_name=" + hospital_name;
  var district_param = DISTRICT_PARAM;

  var allHospitalData = {};

  getHispAPI(`/mpi_reporting?district=${district_param}${headerCon}`).then(
    (response) => {
      var searchdatanew = [];
      for (let i = 0; i < response.data.length; i++) {
        searchdatanew.push(response.data);
        let hospname = searchdatanew[0][i]["hospital"]["hosp_name"];
        //console.log(hospname);
        let hospval = searchdatanew[0][i]["hospital"]["tot_reg"];
        allHospitalData[hospname] = hospval;
      }
    }
  );
  return allHospitalData;
}
export function hosptName() {
  var allHospts = [];
  var hosptNameList = [];

  getAPI(
    `/onlineappointment/hospitals?country_id=1&state_id=2&district_id=11`
  ).then((response) => {
    var searchdatanew = [];
    for (let i = 0; i < response.data.sessionLocation.length; i++) {
      searchdatanew.push(response.data.sessionLocation);
      let hospval = searchdatanew[0][i]["online_hospital_name"];
      allHospts.push(hospval);
      console.log(hospval);
    }
    //hosptNameList = allHospts.map((x) => {return(<MenuItem value={x} key={x} >{x}</MenuItem>)});

    return allHospts;
  });
}
