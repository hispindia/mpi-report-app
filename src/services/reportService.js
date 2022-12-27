import { getAPI } from '.'

export class AllDistrictList {

    /**
     * returns all Locations with a paging and fields specified.
     * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
     */

    static getAllDistricLists = async () => {
        const districUrl = '/onlineappointment/locations?location_type_id=3'
        let result = (await getAPI(districUrl))?.data
        return result?.sessionLocation
    }
    static getAllDistricHospitalsLists = async (id) => {
        const hospitalUrl = '/onlineappointment/hospitals?country_id=1&state_id=2&district_id=' + id
        let result = (await getAPI(hospitalUrl))?.data
        return result?.sessionLocation
    }
}

export class AllReportChartData {
    static totalRegistrationCount = [];
    static totalMaleCount = [];
    static totalFeMaleCount = [];
    static totalHospitalName = [];

    /**
     * returns all Locations with a paging and fields specified.
     * @param {object} fields what fields should be returned. If none is chosen, uuid and display are sent
     */

    static getAllReportChartData = async (fromDate, toDate, districName, selectedHospitalName, setloader) => {
        console.log('.......', districName, selectedHospitalName)
        //----------------------for cleadr state--------------------------------
        this.totalRegistrationCount = [];
        this.totalMaleCount = [];
        this.totalFeMaleCount = [];
        this.totalHospitalName = [];

        // ---------------------for ctotal state----------------------------------
        const fromTime = ' 00:00:00'
        const toTime = ' 23:59:59'
        try {

            const districUrl = '/report/mpi-report?fromDate=' + fromDate + fromTime + '&toDate=' + toDate + toTime
            const result = (await getAPI(districUrl))?.data?.districtHospitalDetails

            // const result = [
            //     {
            //         "districtName": "Shimla",
            //         "hospitalDetails": [
            //             {
            //                 "hospitalName": "Shimla Hospital",
            //                 "femaleRegistrationCount": 5,
            //                 "malePatientRegistrationCount": 1,
            //                 "totalRegistrationCount": 6
            //             },
            //             {
            //                 "hospitalName": "Deendyal Upadhyay Zonal Hospital",
            //                 "femaleRegistrationCount": 2,
            //                 "malePatientRegistrationCount": 3,
            //                 "totalRegistrationCount": 5
            //             },
            //             {
            //                 "hospitalName": "Tenzin Hospital",
            //                 "femaleRegistrationCount": 1,
            //                 "malePatientRegistrationCount": 1,
            //                 "totalRegistrationCount": 2
            //             }
            //         ]
            //     },
            //     {
            //         "districtName": "Solan",
            //         "hospitalDetails": [
            //             {
            //                 "hospitalName": "RH Solan",
            //                 "femaleRegistrationCount": 0,
            //                 "malePatientRegistrationCount": 0,
            //                 "totalRegistrationCount": 0
            //             }
            //         ]
            //     },
            //     {
            //         "districtName": "Chamba",
            //         "hospitalDetails": [
            //             {
            //                 "hospitalName": "Pt.Jawaharlal Nehru Govt Medical College and Hospital",
            //                 "femaleRegistrationCount": 0,
            //                 "malePatientRegistrationCount": 0,
            //                 "totalRegistrationCount": 0
            //             }
            //         ]
            //     },
            //     {
            //         "districtName": "Hamirpur",
            //         "hospitalDetails": [
            //             {
            //                 "hospitalName": "Dr. Radhakrishanan Govt Medical College and Hospital",
            //                 "femaleRegistrationCount": 0,
            //                 "malePatientRegistrationCount": 0,
            //                 "totalRegistrationCount": 0
            //             }
            //         ]
            //     },
            //     {
            //         "districtName": "Bilaspur",
            //         "hospitalDetails": [
            //             {
            //                 "hospitalName": "RH Bilaspur",
            //                 "femaleRegistrationCount": 1,
            //                 "malePatientRegistrationCount": 1,
            //                 "totalRegistrationCount": 2
            //             }
            //         ]
            //     }
            // ]


            if (districName !== 'ALL District' && selectedHospitalName === '-1') {
                for (const dist of result) {
                    if (dist.districtName === districName) {
                        for (const subDist of dist?.hospitalDetails) {
                            if (subDist?.totalRegistrationCount) {
                                this.totalHospitalName.push(subDist?.hospitalName)
                                this.totalFeMaleCount.push(subDist?.femaleRegistrationCount)
                                this.totalMaleCount.push(subDist?.malePatientRegistrationCount)
                                this.totalRegistrationCount.push(subDist?.totalRegistrationCount)
                            }
                        }
                    }
                }
            } else if (districName === 'ALL District' && selectedHospitalName === '-1') {
                for (const dist of result) {
                    for (const subDist of dist?.hospitalDetails) {
                        if (subDist?.totalRegistrationCount) {
                            this.totalHospitalName.push(subDist?.hospitalName)
                            this.totalFeMaleCount.push(subDist?.femaleRegistrationCount)
                            this.totalMaleCount.push(subDist?.malePatientRegistrationCount)
                            this.totalRegistrationCount.push(subDist?.totalRegistrationCount)
                        }
                    }
                }

            } if ((districName !== 'ALL District') && (selectedHospitalName !== 'ALL Facilities') && (selectedHospitalName !== '-1')) {
                for (const dist of result) {
                    for (const subDist of dist?.hospitalDetails) {
                        if ((dist.districtName === districName) && (subDist?.hospitalName === selectedHospitalName)) {
                            this.totalHospitalName.push(subDist?.hospitalName)
                            this.totalFeMaleCount.push(subDist?.femaleRegistrationCount)
                            this.totalMaleCount.push(subDist?.malePatientRegistrationCount)
                            this.totalRegistrationCount.push(subDist?.totalRegistrationCount)
                        }
                    }
                }
            }
            else if ((districName !== 'ALL District') && (selectedHospitalName === 'ALL Facilities')) {
                for (const dist of result) {
                    if (dist.districtName === districName) {
                        for (const subDist of dist?.hospitalDetails) {
                            if (subDist?.totalRegistrationCount) {
                                this.totalHospitalName.push(subDist?.hospitalName)
                                this.totalFeMaleCount.push(subDist?.femaleRegistrationCount)
                                this.totalMaleCount.push(subDist?.malePatientRegistrationCount)
                                this.totalRegistrationCount.push(subDist?.totalRegistrationCount)
                            }
                        }
                    }
                }
            } else if ((districName === 'ALL District') && (selectedHospitalName === 'ALL Facilities')) {
                for (const dist of result) {
                    for (const subDist of dist?.hospitalDetails) {
                        if (subDist?.totalRegistrationCount) {
                            this.totalHospitalName.push(subDist?.hospitalName)
                            this.totalFeMaleCount.push(subDist?.femaleRegistrationCount)
                            this.totalMaleCount.push(subDist?.malePatientRegistrationCount)
                            this.totalRegistrationCount.push(subDist?.totalRegistrationCount)
                        }
                    }
                }
            }

            setloader(false)
            return { totalRegistrationCount: this.totalRegistrationCount, totalMaleCount: this.totalMaleCount, totalFeMaleCount: this.totalFeMaleCount, totalHospitalName: this.totalHospitalName }

        } catch (error) {
            console.log('error>>>', error)
            setloader(false)

        }

    }
}