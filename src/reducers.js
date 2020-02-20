const initialState = {
  timeboxes: [],
  isLoading: true,
  isError: null,
  editor: { index: "", id: "", title: "", totalTimeInMinutes: "" },
  current: { index: "", id: "", title: "", totalTimeInMinutes: 0 },
  isEditorEditable: false,
  isCurrentEditable: false,
  elapsedTimeInSeconds: 0,
  pausesCount: 0,
  isRunning: false,
  isPaused: false,
  isTimerStart: false
};

export function timeboxesReducer(state = initialState, action = {}) {
  //   if (typeof initialState === "undefined") {
  //     return initialState;
  //   }
  switch (action.type) {
    case "TIMEBOXES_LOAD":
      const { timeboxes } = action;
      return { ...state, timeboxes };
    case "TIMEBOX_ADD": {
      const { timebox } = action;
      const timeboxes = [...state.timeboxes, timebox];
      return { ...state, timeboxes };
    }
    case "TIMEBOX_REMOVE": {
      const { indexToRemove } = action;
      const timeboxes = state.timeboxes.filter(
        (_, index) => index !== indexToRemove
      );
      return { ...state, timeboxes };
    }
    case "TIMEBOX_REPLACE": {
      const { indexToUpdate, updatedTimebox } = action;
      const timeboxes = state.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? updatedTimebox : timebox
      );
      const timeboxToEdit = timeboxes[indexToUpdate];
      console.log("timeboxToEdit", timeboxToEdit);

      return {
        ...state,
        timeboxes,
        editor: { ...timeboxToEdit, index: indexToUpdate },
        isEditorEditable: true
      };
    }
    case "CONFIRM_CHANGES": {
      const {
        editedTitle,
        editedTotalTimeInMinutes,
        editedId,
        editedIndex
      } = action;

      console.log(editedId);

      const timeboxes = state.timeboxes.map((timebox, index) =>
        index === editedIndex
          ? {
              title: editedTitle === "" ? timebox.title : editedTitle,
              totalTimeInMinutes:
                editedTotalTimeInMinutes === ""
                  ? timebox.totalTimeInMinutes
                  : editedTotalTimeInMinutes,
              id: editedIndex
            }
          : timebox
      );
      return {
        ...state,
        timeboxes,
        isEdit: false,
        isEditable: false,
        editor: { title: "", totalTimeInMinutes: "", id: "", index: "" }
      };
    }
    case "SEND_TO_CURRENT": {
      const { currentTimeBox } = action;
      console.log("SEND_TO_CURRENT", currentTimeBox);
      //   return {
      //     current: { index: indexToUpdate, ...timebox[indexToUpdate] },
      //     isCurrentEditable: true
      //   };
      return "send";
    }
    case "LOADING_INDICATOR_DISABLE":
      return { ...state, isLoading: false };
    case "DISABLE_EDITOR": {
      return {
        ...state,
        isEditorEditable: false,
        editor: { index: "", id: "", title: "", totalTimeInMinutes: "" }
      };
    }
    case "ERROR_SET":
      const { error } = action;
      return { ...state, error };

    default:
      return state;
  }
}

// konwencja getValue areItems/isItem => true
// selektory

export const getAllTimeBoxesFromState = state => state.timeboxes;
export const areTimeBoxesLoading = state => state.isLoading;
export const getAllTimeBoxesLoadingError = state => state.isError;

// export const getTimeBoxById = (state, timeboxId) =>
//   state.timeboxes.find(timebox => timebox.id === timeboxId);
// export const getCurrentlyEditedTimeBox = state =>
//   getTimeBoxById(state, state.editor.id);
