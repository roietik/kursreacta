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
        // eslint-disable-next-line
        editedId,
        editedIndex
      } = action;

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
    case "CURRENT_EDIT": {
      return {
        ...state,
        isEditable: false,
        editor: {
          index: state.current.index,
          id: state.current.id,
          title: state.current.title,
          totalTimeInMinutes: state.current.totalTimeInMinutes
        },
        isEditorEditable: true,
        isCurrentEditable: false
      };
    }
    case "ACTIVE_TIMER": {
      const { currentTimeBox } = action;

      return {
        ...state,
        current: { ...currentTimeBox },
        isCurrentEditable: true
      };
    }
    case "IS_TIMER_START": {
      const { indexToUpdate } = action;
      const isTimerStart = state.timeboxes.map((_, index) =>
        index === indexToUpdate ? true : false
      );

      return { ...state, isTimerStart: isTimerStart, isRunning: true };
    }
    case "START_ACTION": {
      const { time } = action;
      return {
        ...state,
        elapsedTimeInSeconds: time
      };
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
    case "STOP_ACTION": {
      return {
        ...state,
        pausesCount: 0,
        isRunning: false,
        isPaused: false,
        elapsedTimeInSeconds: 0
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

export const getAllTimeBoxesSelector = state => state.timeboxes;
export const areTimeBoxesLoading = state => state.isLoading;
export const getAllTimeBoxesLoadingError = state => state.isError;

// export const getTimeBoxById = (state, timeboxId) =>
//   state.timeboxes.find(timebox => timebox.id === timeboxId);
// export const getCurrentlyEditedTimeBox = state =>
//   getTimeBoxById(state, state.editor.id);
