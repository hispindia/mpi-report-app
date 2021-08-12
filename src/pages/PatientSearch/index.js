import React, { useState } from "react";
import clsx from "clsx";
import {
  Button,
  TextField,
  FormControl,
  Typography,
  CircularProgress,
  Paper,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import { GridContainer, GridItem } from "../../components/Grid";
import styles from "./styles";
import "./styles.css";
import { getHispAPI } from "../../services";

const useStyles = makeStyles(styles);

const createData = (
  mpi,
  identifier,
  name,
  phone,
  gender,
  age,
  address,
  lvd,
  addhar,
  action,
  id
) => {
  return {
    mpi,
    identifier,
    name,
    phone,
    gender,
    age,
    address,
    lvd,
    addhar,
    action,
    id,
  };
};

export default function PatientSearch(props) {
  const classes = useStyles();
  var [searchDetails, setsearchDetails] = useState({
    phone: "",
    mpi: "",
    firstName: "",
    identifier: "",
    age: "",
    gender: "",
    lvd: "",
    addhar: "",
  });
  var [searchData, setsearchData] = useState([]);
  var [firstNameVal, setfirstNameVal] = useState("");
  var [firstName, setfirstName] = useState("");
  var [phone, setphone] = useState("");
  var [mpi, setmpi] = useState("");
  var [addhar, setaddhar] = useState("");
  var [identifier, setidentifier] = useState("");
  var [age, setage] = useState("");
  var [genderValue, setgenderValue] = useState("");
  var [loading, setLoading] = useState(false);
  var [errors, setErrors] = useState({
    phoneData: true,
    addharData: true,
    nameData: true,
    identifierData: true,
  });
  var [isDataPresent, setisDataPresent] = useState(false);
  var [phoneData, setphoneData] = useState(false);

  var [addharData, setaddharData] = useState(false);
  var [nameData, setnameData] = useState(false);
  var [apihit, setapihit] = useState(false);
  var [charErrorMsj, setcharErrorMsj] = useState("");
  var isEnter = "Enter";
  var [AddharErrorMsj, setAddharErrorMsj] = useState();
  var [PhoneErrorMsj, setPhoneErrorMsj] = useState();
  var [NameErrorMsj, setNameErrorMsj] = useState();
  var [IdenErrorMsj, setIdenErrorMsj] = useState();

  const columns = [
    { field: "mpiId", headerName: "MPI ID", width: 120 },
    { field: "identifier", headerName: "Patient ID", width: 130 },
    { field: "name", headerName: "Name", width: 120 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 120,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "number",
      width: 130,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      width: 130,
    },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "addhar", headerName: "Addhar No", width: 120 },
  ];

  const isEnteredPressed = (charLen, event, name, eventName) => {
    if (
      (event.key === isEnter && event.target.value.length > charLen) ||
      (event.key === isEnter && name === "age")
    ) {
      if (
        name !== "phone" ||
        (name === "phone" && event.target.value.length > 9)
      ) {
        return true;
      }
      if (
        name !== "addhar" ||
        (name === "addhar" && event.target.value.length > 11)
      ) {
        return true;
      }
    } else if (event.key === isEnter && event.target.value.length <= charLen) {
      if (name === "firstName") {
        setErrors({ nameData: !firstName ? false : true });
        if (firstName) {
          var nameLen = firstName.length;
        }
        if (nameLen && nameLen <= charLen && nameLen > 0) {
          setNameErrorMsj("Atleast 3 characters is required");
        } else if (errors.nameData) {
          setNameErrorMsj("Name is required");
        }
      }

      if (name === "phone") {
        setErrors({ phoneData: !phone ? false : true });
        if (phone) {
          var phoneLen = phone.length;
        }
        if (phoneLen && phoneLen <= charLen && phoneLen > 0) {
          setPhoneErrorMsj("Atleast 10 characters is required");
        } else if (errors.phoneData) {
          setPhoneErrorMsj("Phone is required");
        }
      }
      if (name === "addhar") {
        setErrors({ addharData: !addhar ? false : true });
        if (addhar) {
          var addharLen = addhar.length;
        }
        if (addharLen && addharLen <= charLen && addharLen > 0) {
          setAddharErrorMsj("Atleast 12 characters is required");
        } else if (errors.addharData) {
          setAddharErrorMsj("Addhar is required");
        }
      }
      if (name === "identifier") {
        setErrors({ identifierData: !identifier ? false : true });
        if (identifier) {
          var idenLen = identifier.length;
        }
        if (idenLen && idenLen < charLen && idenLen > 0) {
          setIdenErrorMsj("Atleast 3 characters is required");
        } else if (errors.identifierData) {
          setIdenErrorMsj("Identifier is required");
        }
      }
    }
  };

  const isSearchClicked = (charLen, event, name, eventName) => {
    if (eventName === "clicked") {
      if (
        (addhar && addhar.length) > charLen ||
        (phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen)
      ) {
        return true;
      } else {
        var nameLen = "";
        var phoneLen = "";
        var idenLen = "";
        var addharLen = "";
        setErrors({ nameData: !firstName ? false : true });
        setErrors({ addharData: !addhar ? false : true });
        setErrors({ phoneData: !phone ? false : true });
        setErrors({ identifierData: !identifier ? false : true });
        if (firstName) {
          nameLen = firstName.length;
        }
        if (nameLen && nameLen <= charLen && nameLen > 0) {
          setNameErrorMsj("Atleast 3 characters is required");
        } else if (errors.nameData) {
          setNameErrorMsj("Name is required");
        }

        if (phone) {
          phoneLen = phone.length;
        }
        if (phoneLen && phoneLen <= charLen && phoneLen > 0) {
          setPhoneErrorMsj("Atleast 10 characters is required");
        } else if (errors.phoneData) {
          setPhoneErrorMsj("Phone is required");
        }
        if (addhar) {
          addharLen = addhar.length;
        }
        if (addharLen && addharLen <= charLen && addharLen > 0) {
          setAddharErrorMsj("Atleast 12 characters is required");
        } else if (errors.phoneData) {
          setAddharErrorMsj("Addhar is required");
        }

        if (identifier) {
          idenLen = identifier.length;
        }
        if (idenLen && idenLen < charLen && idenLen > 0) {
          setIdenErrorMsj("Atleast 3 characters is required");
        } else if (errors.identifierData) {
          setIdenErrorMsj("Identifier is required");
        }

        return false;
      }
    }
  };

  const isValueChanged = (charLen, event, name, eventName) => {
    if (
      (name === "gender" && eventName === "press") ||
      (name === "lvd" && eventName === "press")
    ) {
      if (
        (phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen)
      ) {
        return true;
      } else {
        return false;
      }
    } else if (name === "lastvisit" && eventName === "press") {
      if (
        (phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen)
      ) {
        return true;
      } else {
        return false;
      }
    } else if (name === "range" && eventName === "press") {
      if (
        age != "" &&
        ((addhar && addhar.length) > charLen ||
          (phone && phone.length) > charLen ||
          (firstName && firstName.length > charLen) ||
          (identifier && identifier.length > charLen))
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  var isValueEntered = (event, name, eventName) => {
    var charLen = 2;
    if (event.key === isEnter) {
      return isEnteredPressed(charLen, event, name, eventName);
    }
    if (eventName === "clicked") {
      return isSearchClicked(charLen, event, name, eventName);
    }
    if (eventName === "press" && event.key != isEnter) {
      return isValueChanged(charLen, event, name, eventName);
    }
  };

  var multiFilter = (products, filters, isExactLvd, isApproxLvd) => {
    return products.filter((product) => {
      return Object.entries(filters).every(([filterProperty, filterValues]) => {
        switch (Object.prototype.toString.call(product[filterProperty])) {
          case "[object Object]":
            return Object.entries(filterValues).every(
              ([extFilterProperty, extFilterValue]) => {
                return (
                  new Map(Object.entries(product[filterProperty])).get(
                    extFilterProperty
                  ) === extFilterValue
                );
              }
            );
          case "[object Array]":
            return product[filterProperty].some((productValue) => {
              return filterValues.includes(productValue);
            });
          default:
            if (filterProperty === "lvd") {
              if (filterValues.length > 0) {
                var searchTokens = filterValues[0].split(" ");
                var searchString = product[filterProperty];
                var searchRegex = new RegExp(searchTokens.join("|"), "g");
                var numOfMatches = searchString.match(searchRegex);
                if (numOfMatches != null) {
                  return true;
                } else if (isApproxLvd) {
                  var searchvals = searchTokens[0].split("-");
                  var newdatestring =
                    searchvals[1] + "-" + searchvals[0] + "-" + searchvals[2];
                  var comparesearchvals = searchString.split("-");
                  var comparevalues =
                    comparesearchvals[1] +
                    "-" +
                    comparesearchvals[0] +
                    "-" +
                    comparesearchvals[2];
                  if (new Date(newdatestring) < new Date(comparevalues)) {
                    return true;
                  } else {
                    return false;
                  }
                }
              }
            } else if (filterProperty === "identifier") {
              var searchTokens = filterValues[0].split(" ");
              var searchString = product[filterProperty];
              var searchRegex = new RegExp(searchTokens.join("|"), "g");
              var numOfMatches = searchString.match(searchRegex);
              if (numOfMatches != null) {
                return true;
              } else {
                return false;
              }
            } else if (filterProperty != "name") {
              return filterValues.includes(product[filterProperty]);
            } else {
              var searchTokens = filterValues[0].split(" ");
              var searchString = product[filterProperty];
              var searchRegex = new RegExp(searchTokens.join("|"), "g");
              var numOfMatches = searchString.match(searchRegex);
              if (numOfMatches != null) {
                return true;
              } else {
                return false;
              }
            }
        }
      });
    });
  };

  function lvdApproxCal(lvdValueApprox, paramLvd) {
    let date = new Date();
    let month = "";

    if (lvdValueApprox === "LM") {
      month = new Date().getMonth();
      let formatprevOneMonth = new Date(date.setMonth(month - 1));
      paramLvd =
        "&lastvisitapprox=" +
        new Date(formatprevOneMonth)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
    } else if (lvdValueApprox === "L6M") {
      month = new Date().getMonth();
      let formatprev6Month = new Date(date.setMonth(month - 6));
      paramLvd =
        "&lastvisitapprox=" +
        new Date(formatprev6Month)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
    } else if (lvdValueApprox === "LY") {
      month = new Date().getMonth();
      let formatprev6Month = new Date(date.setMonth(month - 12));
      paramLvd =
        "&lastvisitapprox=" +
        new Date(formatprev6Month)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
    }
    return paramLvd;
  }

  var filters = {};
  function checkData(
    param,
    firstNameVal,
    phoneVal,
    identifierVal,
    ageVal,
    ageRange,
    lvd,
    lvdValueApprox
  ) {
    var paramLvd = "";
    paramLvd = lvdApproxCal(lvdValueApprox, paramLvd);
    if (firstNameVal) {
      if (firstNameVal && ageVal) {
        param = firstNameVal + "&agerange=" + ageRange + "&age=" + ageVal;
      } else if (firstNameVal && lvdValueApprox) {
        param = firstNameVal + paramLvd;
      } else if (firstNameVal && lvd) {
        param = firstNameVal + "&lastvisitexact=" + lvd;
      } else {
        param = firstNameVal;
      }
    }
    if (phoneVal) {
      if (phoneVal && ageVal) {
        param = phoneVal + "&agerange=" + ageRange + "&age=" + ageVal;
      } else if (phoneVal && lvdValueApprox) {
        param = phoneVal + +paramLvd;
      } else if (phoneVal && lvd) {
        param = phoneVal + "&lastvisitapprox=" + lvd;
      } else {
        param = phoneVal;
      }
    }
    if (firstNameVal && phoneVal) {
      if (phoneVal && ageVal) {
        param = phoneVal + "&agerange=" + ageRange + "&age=" + ageVal;
      } else if (phoneVal && lvdValueApprox) {
        param = phoneVal + paramLvd;
      } else if (phoneVal && lvd) {
        param = phoneVal + "&lastvisitapprox=" + lvd;
      } else {
        param = phoneVal;
      }
    }
    if (identifierVal) {
      if (identifierVal && ageVal) {
        param = identifierVal + "&agerange=" + ageRange + "&age=" + ageVal;
      } else if (identifierVal && lvdValueApprox) {
        param = identifierVal + paramLvd;
      } else if (identifierVal && lvd) {
        param = identifierVal + "&lastvisitapprox=" + lvd;
      } else {
        param = identifierVal;
      }
    }

    return param;
  }

  const searchOnKey = (event, name, eventName) => {
    var searchValue = event.target.value;

    if (name === "firstName") {
      setfirstName(searchValue);
    }
    if (name === "phone") {
      setphone(searchValue);
    }
    if (name === "addhar") {
      setaddhar(searchValue);
    }
    if (name === "identifier") {
      setidentifier(searchValue);
    }

    if (firstName) {
      var firstNameValue = firstName.toUpperCase();
    }
    let phoneValue = phone;
    let addharValue = addhar;
    let identifierValue = identifier;

    if (isValueEntered(event, name, eventName)) {
      setIdenErrorMsj("");
      setNameErrorMsj("");
      setPhoneErrorMsj("");
      setAddharErrorMsj("");
      setErrors({
        addharData: true,
        phoneData: true,
        nameData: true,
        identifierData: true,
      });
      setLoading(true);
      setapihit(false);

      let searchDataAlready = searchData;

      let isDataAlready = false;
      let alreadystoredata = [];
      if (searchDataAlready.length > 0 && isDataPresent === true) {
        isDataAlready = true;
      }

      if (isDataAlready) {
        if (firstName) {
          filters["name"] = [firstName.toUpperCase()];
        }
        if (phone) {
          filters["phone"] = [phone];
        }
        if (identifier) {
          filters["identifier"] = [identifier];
        }
        let filterOutput = multiFilter(searchDataAlready, filters);
        if (filterOutput.length > 0) {
          alreadystoredata = filterOutput;
        }
        if (alreadystoredata.length > 0) {
          setsearchData(alreadystoredata);
          setisDataPresent(true);
          setLoading(false);
        } else {
          let param = firstNameValue;
          param = checkData(
            param,
            firstNameValue,
            addharValue,
            phoneValue,
            identifierValue
          );
          if (firstNameValue || phoneValue || identifierValue || addharValue) {
            setnameData(false);
            setphoneData(false);
            setaddharData(false);

            getHispAPI(`/patient_search?name=${param}`)
              .then((response) => {
                setapihit(true);
                var phoneNo = "";
                var mpiId = "";
                var addharNo = "";
                var searchdatanew = [];
                var visitdate = "";
                setsearchData([]);
                var storedata = [];
                for (let i = 0; i < response.data.length; i++) {
                  var addressrarr = [];
                  searchdatanew.push(response.data);
                  let identifierid = searchdatanew[0][i]["identifier"];
                  let nameval = searchdatanew[0][i]["name"].toUpperCase();
                  let genval = searchdatanew[0][i]["gender"];
                  let ageval = searchdatanew[0][i]["age"];
                  if (searchdatanew[0][i]["address"]) {
                    let addr1 = searchdatanew[0][i]["address"]["Address1"];
                    let addr2 = searchdatanew[0][i]["address"]["Address2"];
                    let district =
                      searchdatanew[0][i]["address"]["City Village"];
                    let country = searchdatanew[0][i]["address"]["Country"];
                    let pincode = searchdatanew[0][i]["address"]["Postal Code"];
                    let statecode =
                      searchdatanew[0][i]["address"]["State Province"];
                    // let addr = ho_no + " " + district + " - " + statecode + " " + country + " " + pincode
                    let addr = district + " - " + statecode;
                    if (addr !== "undefined - undefined") {
                      addressrarr.push(addr);
                    }
                  }
                  if (searchdatanew[0][i]["person_attributes"]) {
                    phoneNo =
                      searchdatanew[0][i]["person_attributes"]["Phone Number*"];
                    mpiId = searchdatanew[0][i]["person_attributes"]["MPI ID"];
                    addharNo =
                      searchdatanew[0][i]["person_attributes"]["Aadhar*"];
                  }
                  let id = i;

                  storedata.push(
                    createData(
                      mpiId,
                      identifierid,
                      nameval,
                      phoneNo,
                      genval,
                      ageval,
                      addressrarr[0],
                      visitdate,
                      "",
                      addharNo,
                      id
                    )
                  );
                }
                try {
                  if (storedata.length > 0) {
                    let filterOutput = [];
                    setsearchData([]);

                    if (genderValue) {
                      filters["gender"] = [genderValue.toUpperCase()];
                    }
                    if (name === "gender") {
                      filters["gender"] = [event.target.value.toUpperCase()];
                    }
                    if (firstNameValue) {
                      filters["name"] = [firstNameValue];
                    }
                    if (phoneValue) {
                      filters["phone"] = [phoneValue];
                    }
                    filterOutput = multiFilter(storedata, filters);

                    if (filterOutput.length > 0) {
                      storedata = filterOutput;
                      setsearchData(storedata);
                      setLoading(false);
                      setapihit(false);
                      setisDataPresent(true);
                    } else {
                      // setsearchData(storedata);
                      setsearchData([]);
                      setLoading(false);
                      setapihit(true);
                      setisDataPresent(false);
                    }
                  } else {
                    setisDataPresent(false);
                    setLoading(false);
                    setapihit(true);
                  }
                } catch (e) {
                  setLoading(false);
                  setapihit(true);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            setnameData(true);
            setphoneData(true);
            setLoading(false);
          }
        }
      } else {
        let param = firstNameValue;
        param = checkData(
          param,
          firstNameValue,
          phoneValue,
          addharValue,
          identifierValue
        );
        if (firstNameValue || phoneValue || identifierValue || addharValue) {
          setnameData(false);
          setphoneData(false);

          getHispAPI(`/patient_search?name=${param}`)
            .then((response) => {
              setapihit(true);
              var phoneNo = "";
              var mpiId = "";
              var addharNo = "";
              var searchdatanew = [];
              var visitdate = "";
              setsearchData([]);
              searchdatanew = searchData;
              var storedata = [];

              for (let i = 0; i < response.data.length; i++) {
                var addressrarr = [];
                searchdatanew.push(response.data);
                let identifierid = searchdatanew[0][i]["identifier"];
                let nameval = searchdatanew[0][i]["name"].toUpperCase();
                let genval = searchdatanew[0][i]["gender"];
                let ageval = searchdatanew[0][i]["age"];
                if (searchdatanew[0][i]["address"]) {
                  let addr1 = searchdatanew[0][i]["address"]["Address1"];
                  let addr2 = searchdatanew[0][i]["address"]["Address2"];
                  let district = searchdatanew[0][i]["address"]["City Village"];
                  let country = searchdatanew[0][i]["address"]["Country"];
                  let pincode = searchdatanew[0][i]["address"]["Postal Code"];
                  let statecode =
                    searchdatanew[0][i]["address"]["State Province"];
                  // let addr = ho_no + " " + district + " - " + statecode + " " + country + " " + pincode
                  let addr = district + " - " + statecode;
                  if (addr !== "undefined - undefined") {
                    addressrarr.push(addr);
                  }
                }
                if (searchdatanew[0][i]["person_attributes"]) {
                  phoneNo =
                    searchdatanew[0][i]["person_attributes"]["Phone Number*"];
                  mpiId = searchdatanew[0][i]["person_attributes"]["MPI ID"];
                  addharNo =
                    searchdatanew[0][i]["person_attributes"]["Aadhar*"];
                }
                if (searchdatanew[0][i]["visit_date"] != undefined) {
                  visitdate = searchdatanew[0][i]["visit_date"];
                } else {
                  visitdate = "N-A";
                }
                let id = i;

                storedata.push(
                  createData(
                    mpiId,
                    identifierid,
                    nameval,
                    phoneNo,
                    genval,
                    ageval,
                    addressrarr[0],
                    visitdate,
                    addharNo,
                    "",
                    id
                  )
                );
              }
              try {
                if (storedata.length > 0) {
                  let filterOutput = [];
                  setsearchData([]);

                  if (genderValue) {
                    filters["gender"] = [genderValue.toUpperCase()];
                  }
                  if (name === "gender") {
                    filters["gender"] = [event.target.value.toUpperCase()];
                  }
                  if (firstNameValue) {
                    filters["name"] = [firstNameValue];
                  }
                  if (phoneValue) {
                    filters["phone"] = [phoneValue];
                  }
                  if (addharValue) {
                    filters["addhar"] = [addharValue];
                  }

                  filterOutput = multiFilter(storedata, filters);

                  if (filterOutput.length > 0) {
                    storedata = filterOutput;
                    setsearchData(storedata);
                    setLoading(false);
                    setapihit(false);
                    setisDataPresent(true);
                  } else {
                    // setsearchData(storedata);
                    setsearchData([]);
                    setLoading(false);
                    setapihit(true);
                    setisDataPresent(false);
                  }
                } else {
                  setisDataPresent(false);
                  setLoading(false);
                  setapihit(true);
                }
              } catch (e) {
                setLoading(false);
                setapihit(true);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setnameData(true);
          setphoneData(true);
          setLoading(false);
        }
      }
    }
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const resetOnKey = (event, name, eventName) => {
    setgenderValue("");
    setfirstName("");
    setphone("");
    setage("");
    setaddhar("");
    setidentifier("");
    setsearchData([]);
    setisDataPresent(false);
    setIdenErrorMsj("");
    setNameErrorMsj("");
    setPhoneErrorMsj("");
    setAddharErrorMsj("");
    setLoading(false);
    setErrors({
      addharData: true,
      phoneData: true,
      nameData: true,
      identifierData: true,
    });
    document.getElementById("searchForm").reset();
  };

  return (
    <>
      <Paper className={classes.paper}>
        <form noValidate id="searchForm">
          <GridContainer>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                error={
                  !errors.phoneData &&
                  !errors.nameData &&
                  !errors.identifierData
                }
                helperText={
                  (!errors.phoneData &&
                    !errors.nameData &&
                    !errors.identifierData &&
                    NameErrorMsj) ||
                  (errors.nameData && NameErrorMsj)
                }
                name="firstName"
                variant="outlined"
                margin="dense"
                required
                fullWidth
                type="text"
                id="firstName"
                label="Name"
                autoFocus
                onKeyUp={(e) => searchOnKey(e, "firstName", "press")}
                className={classes.field}
              />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                error={
                  !errors.phoneData &&
                  !errors.nameData &&
                  !errors.addharData &&
                  !errors.identifierData
                }
                helperText={
                  (!errors.phoneData &&
                    !errors.nameData &&
                    !errors.addharData &&
                    !errors.identifierData &&
                    AddharErrorMsj) ||
                  (errors.addharData && AddharErrorMsj)
                }
                variant="outlined"
                required
                fullWidth
                margin="dense"
                id="addhar"
                label="Addhar"
                name="addhar"
                autoComplete="addhar"
                onKeyUp={(e) => searchOnKey(e, "addhar", "press")}
                value={classes.addhar}
                type="number"
                className={classes.field}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 12);
                }}
              />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                error={
                  !errors.phoneData &&
                  !errors.nameData &&
                  !errors.identifierData
                }
                helperText={
                  (!errors.phoneData &&
                    !errors.nameData &&
                    !errors.identifierData &&
                    PhoneErrorMsj) ||
                  (errors.phoneData && PhoneErrorMsj)
                }
                variant="outlined"
                required
                fullWidth
                margin="dense"
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                onKeyUp={(e) => searchOnKey(e, "phone", "press")}
                value={classes.phone}
                type="number"
                className={classes.field}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 12);
                }}
              />
            </GridItem>

            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                error={
                  !errors.phoneData &&
                  !errors.nameData &&
                  !errors.identifierData
                }
                helperText={
                  (!errors.phoneData &&
                    !errors.nameData &&
                    !errors.identifierData &&
                    IdenErrorMsj) ||
                  (errors.identifierData && IdenErrorMsj)
                }
                variant="outlined"
                fullWidth
                margin="dense"
                required
                id="identifier"
                label="Patient Id"
                name="identifier"
                autoComplete="lname"
                onKeyUp={(e) => searchOnKey(e, "identifier", "press")}
                value={classes.identifier}
                className={classes.field}
              />
            </GridItem>

            <GridItem item xs={12} sm={6} md={3}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.field}
                margin="dense"
              ></FormControl>
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => searchOnKey(e, { searchDetails }, "clicked")}
                className={clsx(classes.button, classes.field)}
              >
                Search
              </Button>
              <Button
                variant="contained"
                onClick={(e) => resetOnKey(e, { searchDetails }, "clicked")}
                className={classes.field}
              >
                Reset
              </Button>
            </GridItem>
          </GridContainer>
        </form>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}

        {apihit && (
          <Typography variant="overline" display="block" gutterBottom>
            No Results Found
          </Typography>
        )}
      </Paper>
      {isDataPresent && (
        <Paper className={classes.paper} style={{ height: "50vh" }}>
          <DataGrid
            rowHeight={40}
            wrap="wrap"
            rows={searchData}
            columns={columns}
            pageSize={10}
            density="standard"
          />
        </Paper>
      )}
    </>
  );
}
