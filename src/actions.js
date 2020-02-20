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
export const confirmChangesPath = (
  editedTitle,
  editedTotalTimeInMinutes,
  editedId,
  editedIndex
) => ({
  type: "CONFIRM_CHANGES",
  editedTitle,
  editedTotalTimeInMinutes,
  editedId,
  editedIndex
});
export const disableEditorAction = () => ({ type: "DISABLE_EDITOR" });
