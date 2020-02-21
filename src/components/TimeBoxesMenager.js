import React, { useEffect, useContext, useState } from "react";
import TimeBoxApi from "../api/FetchTimeBoxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { ReactReduxContext, connect } from "react-redux";

import TimeBoxList from "./TimeBoxList";
import TimeBoxEditor from "./TimeBoxEditor";
import TimeBoxCreator from "./TimeBoxCreator";
import CurrentTimeBox from "./CurrentTimeBox";
import TimeBox from "./TimeBox";
import {
  areTimeBoxesLoading,
  getAllTimeBoxesLoadingError
} from "../../src/reducers";

import {
  timeboxesLoad,
  errorSet,
  loadingIndicatorDisable,
  timeboxAdd,
  timeboxReplace,
  timeboxRemove,
  confirmChangesPath,
  disableEditorAction,
  activeTimer,
  isTimerStart,
  startTimerAction,
  stopAction,
  getEditFromCurrent
} from "../../src/actions";

import "../sass/TimeBoxesMenager.scss";

let intervalId = null;
function useForceUpdate() {
  // eslint-disable-next-line
  const [updateCounter, setUpdateCounter] = useState(0);
  function forceUpdate() {
    setUpdateCounter(prevCounter => prevCounter + 0.1);
  }
  return forceUpdate;
}
function TimeBoxesMenager(props) {
  // eslint-disable-next-line
  const { store } = useContext(ReactReduxContext);
  const forceUpdate = useForceUpdate();
  const state = store.getState();
  const dispatch = store.dispatch;
  useEffect(() => {
    const unsubscribe = store.subscribe(forceUpdate);
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const { accessToken } = useContext(AuthenticationContext);

  // eslint-disable-next-line
  useEffect(() => {
    TimeBoxApi.getAllTimeBoxes(accessToken)
      .then(timeboxes => {
        dispatch(timeboxesLoad(timeboxes));
        store.dispatch(timeboxesLoad(timeboxes));
      })
      .catch(() => dispatch(errorSet()))
      .finally(() => dispatch(loadingIndicatorDisable()));
    // eslint-disable-next-line
  }, []);

  const startTimer = () => {
    intervalId = window.setInterval(() => {
      dispatch(startTimerAction());
    }, 100);
  };

  const stopTimer = () => {
    window.clearInterval(intervalId);
  };

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

  const disableEditor = () => {
    dispatch(disableEditorAction());
  };

  const confirmChanges = (
    editedTitle,
    editedTotalTimeInMinutes,
    editedIndex
  ) => {
    const timeBoxToReplace = {
      title: editedTitle,
      totalTimeInMinutes: editedTotalTimeInMinutes,
      id: state.editor.id
    };

    const editedId = state.editor.id;

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
    disableEditor();
  };

  const onEdit = () => dispatch(getEditFromCurrent());

  const handleStart = indexToUpdate => {
    dispatch(isTimerStart(indexToUpdate));
    startTimer(indexToUpdate);
  };

  const handleStop = () => {
    dispatch(stopAction());
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

    const currentTimeBox = timebox[indexToUpdate];

    dispatch(activeTimer({ ...currentTimeBox, index: indexToUpdate }));
  };

  const {
    pausesCount,
    isPaused,
    isRunning,
    elapsedTimeInSeconds,
    isEditorEditable
  } = state;

  window.state = state;
  return (
    <div className="TimeBoxesMenager container">
      <div className="content">
        <div className="horizontal-scroll-wrapper squares">
          <div className="horizontal-container">
            <h3 className="horizontal-item">Title Here</h3>
            <p>
              Ultra orlen zangya baba commander garlic. Force great fusion power
              shinhan abo 17 tarble chi-chi 18 ha. Great ultra pai. Great earth
              pikkon supreme shinhan ginger pui. Cacao rasin froug freeza dende
              18 yajirobe son bido. Jeice world saiyan chaozu froug ha bio-broly
              corporation god. Spice gohan. Maron arqua majin energy saiyan dr.
              master ha dende namekian tenshinhan zarbon. Radar amond tail god
              puar gure dr. energy.
            </p>
          </div>
          <div className="horizontal-container">
            <h3 className="horizontal-item">Title Here</h3>
            <p>
              Ultra orlen zangya baba commander garlic. Force great fusion power
              shinhan abo 17 tarble chi-chi 18 ha. Great ultra pai. Great earth
              pikkon supreme shinhan ginger pui. Cacao rasin froug freeza dende
              18 yajirobe son bido. Jeice world saiyan chaozu froug ha bio-broly
              corporation god. Spice gohan. Maron arqua majin energy saiyan dr.
              master ha dende namekian tenshinhan zarbon. Radar amond tail god
              puar gure dr. energy.
            </p>
          </div>
          <div className="horizontal-container">
            <h3 className="horizontal-item">Title Here</h3>
            <p>
              Ultra orlen zangya baba commander garlic. Force great fusion power
              shinhan abo 17 tarble chi-chi 18 ha. Great ultra pai. Great earth
              pikkon supreme shinhan ginger pui. Cacao rasin froug freeza dende
              18 yajirobe son bido. Jeice world saiyan chaozu froug ha bio-broly
              corporation god. Spice gohan. Maron arqua majin energy saiyan dr.
              master ha dende namekian tenshinhan zarbon. Radar amond tail god
              puar gure dr. energy.
            </p>
          </div>
          <div className="horizontal-container">
            <h3 className="horizontal-item">Title Here</h3>
            <p>
              Ultra orlen zangya baba commander garlic. Force great fusion power
              shinhan abo 17 tarble chi-chi 18 ha. Great ultra pai. Great earth
              pikkon supreme shinhan ginger pui. Cacao rasin froug freeza dende
              18 yajirobe son bido. Jeice world saiyan chaozu froug ha bio-broly
              corporation god. Spice gohan. Maron arqua majin energy saiyan dr.
              master ha dende namekian tenshinhan zarbon. Radar amond tail god
              puar gure dr. energy.
            </p>
          </div>
          <div className="horizontal-container">
            <h3 className="horizontal-item">Title Here</h3>
            <p>
              Ultra orlen zangya baba commander garlic. Force great fusion power
              shinhan abo 17 tarble chi-chi 18 ha. Great ultra pai. Great earth
              pikkon supreme shinhan ginger pui. Cacao rasin froug freeza dende
              18 yajirobe son bido. Jeice world saiyan chaozu froug ha bio-broly
              corporation god. Spice gohan. Maron arqua majin energy saiyan dr.
              master ha dende namekian tenshinhan zarbon. Radar amond tail god
              puar gure dr. energy.
            </p>
          </div>
          <div className="horizontal-container">
            <h3 className="horizontal-item">Title Here</h3>
            <p>
              Ultra orlen zangya baba commander garlic. Force great fusion power
              shinhan abo 17 tarble chi-chi 18 ha. Great ultra pai. Great earth
              pikkon supreme shinhan ginger pui. Cacao rasin froug freeza dende
              18 yajirobe son bido. Jeice world saiyan chaozu froug ha bio-broly
              corporation god. Spice gohan. Maron arqua majin energy saiyan dr.
              master ha dende namekian tenshinhan zarbon. Radar amond tail god
              puar gure dr. energy.
            </p>
          </div>
          <div className="horizontal-container">
            <h3 className="horizontal-item">Title Here</h3>
            <p>
              Ultra orlen zangya baba commander garlic. Force great fusion power
              shinhan abo 17 tarble chi-chi 18 ha. Great ultra pai. Great earth
              pikkon supreme shinhan ginger pui. Cacao rasin froug freeza dende
              18 yajirobe son bido. Jeice world saiyan chaozu froug ha bio-broly
              corporation god. Spice gohan. Maron arqua majin energy saiyan dr.
              master ha dende namekian tenshinhan zarbon. Radar amond tail god
              puar gure dr. energy.
            </p>
          </div>
          <div className="horizontal-container">
            <h3 className="horizontal-item">Title Here</h3>
            <p>
              Ultra orlen zangya baba commander garlic. Force great fusion power
              shinhan abo 17 tarble chi-chi 18 ha. Great ultra pai. Great earth
              pikkon supreme shinhan ginger pui. Cacao rasin froug freeza dende
              18 yajirobe son bido. Jeice world saiyan chaozu froug ha bio-broly
              corporation god. Spice gohan. Maron arqua majin energy saiyan dr.
              master ha dende namekian tenshinhan zarbon. Radar amond tail god
              puar gure dr. energy.
            </p>
          </div>
        </div>
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
          id={state.editor.id}
          title={state.editor.title}
          totalTimeInMinutes={state.editor.totalTimeInMinutes}
          isEditorEditable={isEditorEditable}
          confirmChanges={confirmChanges}
        />
        <CurrentTimeBox
          id={state.current.id}
          index={state.current.index}
          title={state.current.title}
          totalTimeInMinutes={state.current.totalTimeInMinutes}
          isCurrentEditable={state.isCurrentEditable}
          elapsedTimeInSeconds={elapsedTimeInSeconds}
          pausesCount={pausesCount}
          isPaused={isPaused}
          isRunning={isRunning}
          handleStart={() => handleStart(state.current.index)}
          handleStop={handleStop}
          togglePause={togglePause}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
// TimeBoxesMenager.contextType = AuthenticationContext;
// export default TimeBoxesMenager;

// export default connect(mapStateToProps)(TimeBoxesMenager);

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("mapDispatchToProps", ownProps);
  const add = () => dispatch(timeboxAdd(ownProps.addedTimeBox));
  return { add };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeBoxesMenager);
