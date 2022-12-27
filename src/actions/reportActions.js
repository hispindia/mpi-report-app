import { SET_DISTRIC_LIST, SET_REPORT_DATA, SET_HOSPITALS_LISTS_DATA } from "../constants/action-types";

export function addHospitals(payload) {
  return { type: SET_DISTRIC_LIST, payload };
}

export function addReportData(payload) {
  return { type: SET_REPORT_DATA, payload };
}
export function addHospitalsLists(payload) {
  return { type: SET_HOSPITALS_LISTS_DATA, payload };
}