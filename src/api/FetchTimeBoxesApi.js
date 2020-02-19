const BASE_URL = "http://localhost:4004/timeboxes";

const FetchTimeBoxApi = {
  getAllTimeBoxes: async function(accessToken) {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const timeboxes = await res.json();
    return timeboxes;
  },
  addTimeBox: async function(timeBoxToAdd, accessToken) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(timeBoxToAdd)
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const addedTimeBox = await res.json();
    return addedTimeBox;
  },
  replaceTimeBox: async function(timeBoxToReplace, accessToken) {
    if (!timeBoxToReplace.id) {
      throw new Error("TimeBos has to have an id to be updated");
    }
    const res = await fetch(`${BASE_URL}/${timeBoxToReplace.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(timeBoxToReplace)
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const replacedTimeBox = await res.json();
    return replacedTimeBox;
  },
  removeTimeBox: async function(timeBoxToRemove, accessToken) {
    if (!timeBoxToRemove.id) {
      throw new Error("TimeBos has to have an id to be updated");
    }
    const res = await fetch(`${BASE_URL}/${timeBoxToRemove.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const removedTimeBox = await res.json();
    return removedTimeBox;
  }
};

export default FetchTimeBoxApi;
