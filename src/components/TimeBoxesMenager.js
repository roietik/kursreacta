import React, { useEffect, useContext, useReducer } from "react";
import TimeBoxApi from "../api/FetchTimeBoxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

import TimeBoxList from "./TimeBoxList";
import TimeBoxEditor from "./TimeBoxEditor";
import TimeBoxCreator from "./TimeBoxCreator";
import CurrentTimeBox from "./CurrentTimeBox";
import TimeBox from "./TimeBox";

import "../sass/TimeBoxesMenager.scss";

function timeboxesReducer(state, action) {
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
        editor: { index: indexToUpdate, ...timeboxToEdit },
        isEditorEditable: true
      };
    }
    case "CONFIRM_CHANGES": {
      const { obj } = action;

      const titleToUpdate = obj.title;
      const totalTimeInMinutesToUpdate = obj.totalTimeInMinutes;
      const indexToUpdate = obj.index;

      const timeboxes = state.timeboxes.map((timebox, index) =>
        index === indexToUpdate
          ? {
              id: timebox.id,
              title: titleToUpdate === "" ? timebox.title : titleToUpdate,
              totalTimeInMinutes:
                totalTimeInMinutesToUpdate === ""
                  ? timebox.totalTimeInMinutes
                  : totalTimeInMinutesToUpdate
            }
          : timebox
      );
      return {
        timeboxes,
        isEdit: false,
        isEditable: false,
        editor: { index: "", id: "", title: "", totalTimeInMinutes: "" }
      };
    }
    case "LOADING_INDICATOR_DISABLE":
      return { ...state, isLoading: false };
    case "ERROR_SET":
      const { error } = action;
      return { ...state, error };

    default:
      return state;
  }
}

function TimeBoxesMenager() {
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

  const [state, dispatch] = useReducer(timeboxesReducer, initialState);
  const { accessToken } = useContext(AuthenticationContext);

  useEffect(() => {
    TimeBoxApi.getAllTimeBoxes(accessToken)
      .then(timeboxes => dispatch({ type: "TIMEBOXES_LOAD", timeboxes }))
      .catch(() => dispatch({ type: "ERROR_SET" }))
      .finally(() => dispatch({ type: "LOADING_INDICATOR_DISABLE" }));
  }, [accessToken]);

  const addTimeBox = timebox => {
    TimeBoxApi.addTimeBox(timebox, accessToken)
      .then(addedTimeBox =>
        dispatch({ type: "TIMEBOX_ADD", timebox: addedTimeBox })
      )
      .catch(err => console.log(err));
  };

  const editTimeBox = (indexToUpdate, timeBoxToUpdate) => {
    TimeBoxApi.replaceTimeBox(
      timeBoxToUpdate,
      accessToken
    ).then(updatedTimebox =>
      dispatch({ type: "TIMEBOX_REPLACE", updatedTimebox, indexToUpdate })
    );
  };

  const removeTimeBox = indexToRemove => {
    TimeBoxApi.removeTimeBox(
      state.timeboxes[indexToRemove],
      accessToken
    ).then(() => dispatch({ type: "TIMEBOX_REMOVE", indexToRemove }));
  };

  const startTimer = () => {
    this.intervalId = window.setInterval(() => {
      dispatch(prevState => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1
      }));
    }, 100);
  };

  const stopTimer = () => {
    window.clearInterval(this.intervalId);
  };

  const disableEditor = () => {
    dispatch({
      isEditorEditable: false,
      editor: { index: "", id: "", title: "", totalTimeInMinutes: "" }
    });
  };

  const confirmChanges = obj => {
    console.log("confirmChanges:", obj);

    const Update = state.timeboxes.map((timebox, index) =>
      index === obj.index
        ? {
            id: timebox.id,
            title: obj.title === "" ? timebox.title : obj.title,
            totalTimeInMinutes:
              obj.totalTimeInMinutes === ""
                ? timebox.totalTimeInMinutes
                : obj.totalTimeInMinutes
          }
        : timebox
    );

    console.log("Update from confirmChanges: ", Update[obj.index]);

    TimeBoxApi.replaceTimeBox(Update[obj.index], accessToken).then(() =>
      dispatch({ type: "CONFIRM_CHANGES", obj })
    );
    disableEditor();
  };

  const onEdit = () => dispatch({ isEditable: true });

  const handleStart = indexToUpdate => {
    dispatch(prevState => {
      const isTimerStart = prevState.timeboxes.map((arg, index) =>
        index === indexToUpdate ? true : false
      );

      return { isTimerStart: isTimerStart, isRunning: true };
    });
    startTimer(indexToUpdate);
  };

  const handleStop = () => {
    dispatch({
      pausesCount: 0,
      isRunning: false,
      isPaused: false,
      elapsedTimeInSeconds: 0
    });
    stopTimer();
  };

  const togglePause = () => {
    dispatch(prevState => {
      const isPaused = !prevState.isPaused;
      if (isPaused) {
        stopTimer();
      } else {
        startTimer();
      }
      return {
        isPaused,
        pausesCount: isPaused
          ? prevState.pausesCount + 1
          : prevState.pausesCount
      };
    });
  };

  const handleActivTimer = indexToUpdate => {
    dispatch(prevState => {
      const timebox = prevState.timeboxes.map(
        (timebox, index) =>
          index === indexToUpdate && {
            id: timebox.id,
            title: timebox.title,
            totalTimeInMinutes: timebox.totalTimeInMinutes
          }
      );

      return {
        current: { index: indexToUpdate, ...timebox[indexToUpdate] },
        isCurrentEditable: true
      };
    });
  };

  const {
    pausesCount,
    isPaused,
    isRunning,
    elapsedTimeInSeconds,
    isEditorEditable,
    isLoading,
    isError
  } = state;

  return (
    <div className="TimeBoxesMenager container">
      <div className="content">
        <TimeBoxList>
          {state.timeboxes.map((timebox, i) => {
            const timeBoxProps = {
              id: timebox.id,
              index: i,
              title: timebox.title,
              totalTimeInMinutes: timebox.totalTimeInMinutes,
              removeTimeBox: () => removeTimeBox(i),
              editTimeBox: () =>
                editTimeBox(i, {
                  ...timebox,
                  id: timebox.id,
                  title: timebox.title,
                  totalTimeInMinutes: timebox.totalTimeInMinutes
                }),
              handleActivTimer: () => handleActivTimer(i)
            };

            return (
              <React.Fragment key={timebox.id}>
                {isLoading ? (
                  <h2 key={timebox.id}>Loading...</h2>
                ) : (
                  <TimeBox key={timebox.id} timeBoxProps={timeBoxProps} />
                )}
                {isError && <h2>Nie udało się połączyć</h2>}
              </React.Fragment>
            );
          })}
        </TimeBoxList>
      </div>
      <div className="sidebar">
        <TimeBoxCreator addTimeBox={addTimeBox} />
        <TimeBoxEditor
          index={state.editor.index}
          title={state.editor.title}
          totalTimeInMinutes={state.editor.totalTimeInMinutes}
          isEditorEditable={isEditorEditable}
          confirmChanges={confirmChanges}
        />
        <CurrentTimeBox
          //   id={state.current.id}
          //   index={state.current.index}
          //   title={state.current.title}
          //   totalTimeInMinutes={state.current.totalTimeInMinutes}
          isCurrentEditable={state.isCurrentEditable}
          elapsedTimeInSeconds={elapsedTimeInSeconds}
          pausesCount={pausesCount}
          isPaused={isPaused}
          isRunning={isRunning}
          handleStart={() => handleStart(state.current.indext)}
          handleStop={handleStop}
          togglePause={togglePause}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
// TimeBoxesMenager.contextType = AuthenticationContext;

export default TimeBoxesMenager;
