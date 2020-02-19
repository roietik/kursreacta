export const timeboxesLoad = timeboxes => ({
  type: "TIMEBOXES_LOAD",
  timeboxes
});

export const errorSet = () => ({ type: "ERROR_SET" });
export const loadingIndicatorDisable = () => ({
  type: "LOADING_INDICATOR_DISABLE"
});
export const timeboxAdd = addedTimeBox => ({
  type: "TIMEBOX_ADD",
  timebox: addedTimeBox
});
export const timeboxReplace = (updatedTimebox, indexToUpdate) => ({
  type: "TIMEBOX_REPLACE",
  updatedTimebox,
  indexToUpdate
});
export const timeboxRemove = indexToRemove => ({
  type: "TIMEBOX_REMOVE",
  indexToRemove
});
export const confirmChangesPath = obj => ({ type: "CONFIRM_CHANGES", obj });
