import axios from "axios";

window.axios = axios;

const BASE_URL = "http://localhost:4003/timeboxes"

const AxiosTimeBoxApi = {
    getAllTimeBoxes: async function () {
        const res = await axios.get(BASE_URL)
        const timeboxes = res.data;
        return timeboxes;
    },
    addTimeBox: async function (timeBoxToAdd) {
        const res = await axios.post(BASE_URL, timeBoxToAdd)
        const addedTimeBox = res.data;    
        return addedTimeBox;
    },
    replaceTimeBox: async function (timeBoxToReplace) {
        if (!timeBoxToReplace.id) {
            throw new Error("TimeBos has to have an id to be updated")
        }
        const res = await axios.put(`${BASE_URL}/${timeBoxToReplace.id}`, timeBoxToReplace)
        const replacedTimeBox = res.data;       
        return replacedTimeBox;
    },
    removeTimeBox: async function (timeBoxToRemove) {
        if (!timeBoxToRemove.id) {
            throw new Error("TimeBos has to have an id to be updated")
        }
        await axios.delete(`${BASE_URL}/${timeBoxToRemove.id}`, timeBoxToRemove)

    }
}

export default AxiosTimeBoxApi;