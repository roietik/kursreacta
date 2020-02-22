// import axios from 'axios';
import uuid from "uuid";

function wait(ms = 1000) {
  return new Promise(res => setTimeout(res, ms));
}

const timeboxes = [
  {
    id: "11e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "fake",
    totalTimeInMinutes: 25
  },
  {
    id: "22e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "TimeBox02567",
    totalTimeInMinutes: 5
  },
  {
    id: "33e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "TimeBox09563",
    totalTimeInMinutes: 55
  },
  {
    id: "44e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "TimeBox035255",
    totalTimeInMinutes: 44
  },
  {
    id: "55e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "TimeBox02567",
    totalTimeInMinutes: 5
  },
  {
    id: "66e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "TimeBox0963",
    totalTimeInMinutes: 2
  },
  {
    id: "77e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "TimeBox03566",
    totalTimeInMinutes: 9
  },
  {
    id: "88e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "TimeBox02567",
    totalTimeInMinutes: 5
  },
  {
    id: "99e1abf9-cbcc-4738-a59d-00d6ba875aca",
    title: "TimeBox09563",
    totalTimeInMinutes: 3
  }
];

function findIndexById(id) {
  const res = timeboxes.findIndex(timebox => timebox.id === id);

  if (res < 0) {
    throw Error("TimeBox o podanym ID nie istnieje");
  }
  return res;
}

const FakeTimeBoxApi = {
  getAllTimeBoxes: async function() {
    await wait(1000);
    console.log("GET");
    console.table(timeboxes);
    return [...timeboxes];
  },
  addTimeBox: async function(timeBoxToAdd) {
    await wait(1000);
    const addedTimeBox = { ...timeBoxToAdd, id: uuid.v4() };
    timeboxes.push(addedTimeBox);
    console.log("POST");
    console.table(timeboxes);
    return addedTimeBox;
  },
  replaceTimeBox: async function(timeBoxToReplace) {
    await wait(1000);
    if (!timeBoxToReplace.id) {
      throw new Error("Can not replaced TimeBox without an ID");
    }
    const index = findIndexById(timeBoxToReplace.id);
    const replacedTimeBox = { ...timeBoxToReplace };
    timeboxes[index] = replacedTimeBox;
    console.log("PUT");
    console.table(timeboxes);
    return replacedTimeBox;
  },
  removeTimeBox: async function(timeBoxToRemove) {
    await wait(1000);
    if (!timeBoxToRemove.id) {
      throw new Error("Can not remove TimeBox without an ID");
    }
    const index = findIndexById(timeBoxToRemove.id);
    timeboxes.splice(index, 1);
    console.log("DELETE");
    console.table(timeboxes);
  }
};

export default FakeTimeBoxApi;
