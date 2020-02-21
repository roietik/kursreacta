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
export const activeTimer = currentTimeBox => ({
  type: "ACTIVE_TIMER",
  currentTimeBox
});
export const isTimerStart = indexToUpdate => ({
  type: "IS_TIMER_START",
  indexToUpdate
});
export const startTimerAction = () => ({
  type: "START_TIMER",
  time: "jsndvlkjdfnvksldjfnvkjs"
});
export const stopAction = () => ({ type: "STOP_ACTION" });
export const getEditFromCurrent = () => ({ type: "CURRENT_EDIT" });
