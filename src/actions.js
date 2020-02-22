import TimeBoxApi from "./api/FetchTimeBoxesApi";
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
export const fetchAllTimeBoxesRemotely = accessToken => dispatch => {
  TimeBoxApi.getAllTimeBoxes(accessToken)
    .then(timeboxes => {
      dispatch(timeboxesLoad(timeboxes));
    })
    .catch(() => dispatch(errorSet()))
    .finally(() => dispatch(loadingIndicatorDisable()));
};
export const removeTimeBoxRemotely = (
  indexToRemove,
  accessToken,
  timebox
) => dispatch => {
  TimeBoxApi.removeTimeBox(timebox, accessToken).then(() =>
    dispatch(timeboxRemove(indexToRemove))
  );
};
export const addTimeBoxRemotely = (timebox, accessToken) => dispatch => {
  TimeBoxApi.addTimeBox(timebox, accessToken)
    .then(addedTimeBox => dispatch(timeboxAdd(addedTimeBox)))
    .catch(err => console.log(err));
};
export const replaceTimeBoxRemotely = (
  indexToUpdate,
  timeBoxToUpdate,
  accessToken
) => dispatch => {
  TimeBoxApi.replaceTimeBox(timeBoxToUpdate, accessToken).then(updatedTimebox =>
    dispatch(timeboxReplace(updatedTimebox, indexToUpdate))
  );
};
export const confirmChangesRemotely = (
  timeBoxToReplace,
  accessToken,
  editedTitle,
  editedTotalTimeInMinutes,
  editedId,
  editedIndex
) => dispatch => {
  TimeBoxApi.replaceTimeBox(timeBoxToReplace, accessToken).then(() =>
    dispatch(
      confirmChangesPath(
        editedTitle,
        editedTotalTimeInMinutes,
        editedId,
        editedIndex
      )
    )
  );
};
