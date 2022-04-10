import "./History.css"

export const History = (props) => {
  const { examName, numberOfCorrect, totalRecords, totalTime, totalPoint } = props.history;
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  return (
    <div className="history-container">
      <div className="exam-name">{examName}</div>
      <div className="result-container">
          <div className="row">
              <div className="col-4">
                <p className=""><span>Correct:</span>{numberOfCorrect}/{totalRecords}</p>
              </div>
              <div className="col-5">
                <p className=""><span>Time:</span>{minutes} min {seconds < 10 ? `0${seconds}` : seconds} sec</p>
              </div>
              <div className="col-3">
                <p className=""><span>Scores:</span>{totalPoint}</p>
              </div>
          </div>
      </div>
    </div>
  );
};
