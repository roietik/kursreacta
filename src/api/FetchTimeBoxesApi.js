const BASE_URL = "http://localhost:4000/timeboxes"

const FetchTimeBoxApi = {
    getAllTimeBoxes: async function () {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        const timeboxes = await res.json();
         return timeboxes;
    },
    addTimeBox: async function (timeBoxToAdd) {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(timeBoxToAdd)
        });
        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        const addedTimeBox = await res.json();       
        return addedTimeBox;
    },
    replaceTimeBox: async function (timeBoxToReplace) {
        if (!timeBoxToReplace.id) {
            throw new Error("TimeBos has to have an id to be updated")
        }
        const res = await fetch(`${BASE_URL}/${timeBoxToReplace.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(timeBoxToReplace)
        });
        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        const replacedTimeBox = await res.json();       
        return replacedTimeBox;
    },
    removeTimeBox: async function (timeBoxToRemove) {
        if (!timeBoxToRemove.id) {
            throw new Error("TimeBos has to have an id to be updated")
        }
        const res = await fetch(`${BASE_URL}/${timeBoxToRemove.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }        
        });
        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        const removedTimeBox = await res.json();       
        return removedTimeBox;
    }
}

export default FetchTimeBoxApi;