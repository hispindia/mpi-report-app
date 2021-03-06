import axios from "axios";
import Cookies from "js-cookie";
import { updateSession } from "../utils/authentication";
import { JSESSIONID, BASE_URL, HISP_API_URL} from "../utils/constants";


export function getAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URL + endpoint, config);
}
export function getHispAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(HISP_API_URL + endpoint, config);
}


export function getImageAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    responseType: "blob",
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URL + endpoint, config);
}

export function postAPI(
  endpoint,
  data,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.post(BASE_URL + endpoint, data, config);
}

export function deleteAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.delete(BASE_URL + endpoint, config);
}

/**
 * This function remaps array with a specific field. For example if we want an array to be accessed
 * through the uuid function we pass 'uuid' to fieldToMapWith. This way, each element of an array
 * can be easily accessed because the element is just accessed through the uuid Property.
 * @param {*} array the array containing all elements.
 * @param {*} fieldToMapWith the field to look for in individual elements which will be used as the index
 */
export function remapArrayWithField(array,fieldToMapWith){
  array.forEach(element => {
    array[element[fieldToMapWith]]=element
  });
}


