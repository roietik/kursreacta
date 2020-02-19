import React, { useEffect, useContext, useReducer } from "react";
import TimeBoxApi from "../api/FetchTimeBoxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

import TimeBoxList from "./TimeBoxList";
import TimeBoxEditor from "./TimeBoxEditor";
import TimeBoxCreator from "./TimeBoxCreator";
import CurrentTimeBox from "./CurrentTimeBox";
import TimeBox from "./TimeBox";
import {
  timeboxesReducer,
  getAllTimeBoxesFromState,
  areTimeBoxesLoading,
  getAllTimeBoxesLoadingError,
  getTimeBoxById,
  getCurrentlyEditedTimeBox
} from "../../src/reducers";
import {
  timeboxesLoad,
  errorSet,
  loadingIndicatorDisable,
  timeboxAdd,
  timeboxReplace,
  timeboxRemove,
  confirmChangesPath
} from "../../src/actions";

import "../sass/TimeBoxesMenager.scss";

function TimeBoxesMenager() {
  const [state, dispatch] = useReducer(
    timeboxesReducer,
    undefined,
    timeboxesReducer
  );
  const { accessToken } = useContext(AuthenticationContext);

  console.log("getCurrentlyEditedTimeBox: ", getCurrentlyEditedTimeBox(state));
  console.log("getTimeBoxById: ", getTimeBoxById(state, 2));

  useEffect(() => {
    TimeBoxApi.getAllTimeBoxes(accessToken)
      .then(timeboxes => dispatch(timeboxesLoad(timeboxes)))
      .catch(() => dispatch(errorSet()))
      .finally(() => dispatch(loadingIndicatorDisable()));
  }, [accessToken]);

  const addTimeBox = timebox => {
    TimeBoxApi.addTimeBox(timebox, accessToken)
      .then(addedTimeBox => dispatch(timeboxAdd(addedTimeBox)))
      .catch(err => console.log(err));
  };

  const editTimeBox = (indexToUpdate, timeBoxToUpdate) => {
    TimeBoxApi.replaceTimeBox(
      timeBoxToUpdate,
      accessToken
    ).then(updatedTimebox =>
      dispatch(timeboxReplace(updatedTimebox, indexToUpdate))
    );
  };

  const removeTimeBox = indexToRemove => {
    TimeBoxApi.removeTimeBox(
      state.timeboxes[indexToRemove],
      accessToken
    ).then(() => dispatch(timeboxRemove(indexToRemove)));
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
    TimeBoxApi.replaceTimeBox(Update[obj.index], accessToken).then(() =>
      dispatch(confirmChangesPath(obj))
    );
    disableEditor();
  };

  const onEdit = () => dispatch({ isEditable: true });

  const handleStart = indexToUpdate => {
    dispatch(prevState => {
      const isTimerStart = prevState.timeboxes.map((_, index) =>
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
    const timebox = state.timeboxes.map(
      (timebox, index) =>
        index === indexToUpdate && {
          id: timebox.id,
          title: timebox.title,
          totalTimeInMinutes: timebox.totalTimeInMinutes
        }
    );
    console.log("send to current", timebox[indexToUpdate]);

    const currentTimeBox = timebox[indexToUpdate];

    dispatch({ type: "SEND_TO_CURRENT", currentTimeBox });
  };

  const {
    pausesCount,
    isPaused,
    isRunning,
    elapsedTimeInSeconds,
    isEditorEditable
  } = state;

  return (
    <div className="TimeBoxesMenager container">
      <div className="content">
        <TimeBoxList>
          {getAllTimeBoxesFromState(state).map((timebox, i) => {
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
                {areTimeBoxesLoading(state) ? (
                  <h2 key={timebox.id}>Loading...</h2>
                ) : (
                  <TimeBox
                    key={timebox.id}
                    timeBoxProps={timeBoxProps}
                    handleActivTimer={() => handleActivTimer(i)}
                  />
                )}
                {getAllTimeBoxesLoadingError(state) && (
                  <h2>Nie udało się połączyć</h2>
                )}
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
