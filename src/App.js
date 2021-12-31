import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Game from "./Game";
import "./App.css";
import { getIsError, getIsLoading } from "./reducers";
import Loading from "./Loading";
import Error from "./Error";
import * as actions from "./actions";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const isError = useSelector(getIsError);

  React.useEffect(() => {
    dispatch(actions.startGame());
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error tryAgain={() => dispatch(actions.startGame())} />
      ) : (
        <Game />
      )}
      <div>
        <a
          href="http://www.wordnik.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img alt="powered by wordnik" src="wordnik.png" />
        </a>
      </div>
    </div>
  );
};

export default App;
