import * as React from "react";
import Game from "./Game";
import "./App.css";
import Loading from "./Loading";
import Error from "./Error";
import Login from "./Login";
import Logout from "./Logout";
import User from "./User";
import { getUser } from "./api";
import type { LoggedInUser } from "./api";
import * as api from "./api";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [user, setUser] = React.useState<LoggedInUser>(null);
  const [currentWord, setCurrentWord] = React.useState<string>();
  const [id, setId] = React.useState<string>();

  const startGame = React.useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const { currentWord, id } = await api.startGame({
        maxCorpusCount: 1,
        maxDictionaryCount: 1,
        maxLength: 1,
        minDictionaryCount: 1,
        minLength: 1,
        selectedPartsOfSpeech: [],
      });
      setCurrentWord(currentWord);
      setId(id);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      await startGame();
      const u = await getUser();
      setUser(u);
    })();
  }, [startGame]);

  return (
    <div className="App">
      <div>
        <Login user={user} />
        <Logout user={user} />
        <User user={user} />
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error tryAgain={() => startGame()} />
        ) : (
          <Game
            id={id!}
            currentWord={currentWord!}
            startGame={() => startGame()}
            setCurrentWord={(word: string) => setCurrentWord(word)}
          />
        )}
      </div>
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
