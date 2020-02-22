import React, { useEffect, useContext } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useDispatch, useSelector } from "react-redux";

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
  fetchAllTimeBoxesRemotely,
  addTimeBoxRemotely,
  replaceTimeBoxRemotely,
  removeTimeBoxRemotely,
  confirmChangesRemotely,
  disableEditorAction,
  activeTimer,
  isTimerStart,
  startTimerAction,
  stopAction,
  getEditFromCurrent
} from "../../src/actions";

import "../sass/TimeBoxesMenager.scss";

let intervalId = null;

function TimeBoxesMenager() {
  const dispatch = useDispatch();
  const { accessToken } = useContext(AuthenticationContext);
  const state = useSelector(state => state);
  useEffect(() => {
    dispatch(fetchAllTimeBoxesRemotely(accessToken));
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

  const removeTimeBox = indexToRemove => {
    const timebox = state.timeboxes[indexToRemove];
    dispatch(removeTimeBoxRemotely(indexToRemove, accessToken, timebox));
  };

  const addTimeBox = timebox => {
    dispatch(addTimeBoxRemotely(timebox, accessToken));
  };

  const editTimeBox = (indexToUpdate, timeBoxToUpdate) => {
    dispatch(
      replaceTimeBoxRemotely(indexToUpdate, timeBoxToUpdate, accessToken)
    );
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

    dispatch(
      confirmChangesRemotely(
        timeBoxToReplace,
        accessToken,
        editedTitle,
        editedTotalTimeInMinutes,
        editedId,
        editedIndex
      )
    );
    disableEditor();
  };

  const disableEditor = () => {
    dispatch(disableEditorAction());
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

export default TimeBoxesMenager;
