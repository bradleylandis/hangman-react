import * as React from "react";
import Game from "./Game";
import "./App.css";
import Loading from "./Loading";
import Error from "./Error";
import Login from "./Login";
import Logout from "./Logout";
import User from "./User";
import { getUser } from "./apiGateway";
import type { LoggedInUser } from "./apiGateway";
import * as api from "./apiGateway";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [user, setUser] = React.useState<LoggedInUser>(null);
  const [currentWord, setCurrentWord] = React.useState("");
  const [id, setId] = React.useState("");

  const startGame = React.useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    const selectedPartsOfSpeech = [
      "noun",
      "verb",
      "adjective",
      "adverb",
      "conjunction",
      "verb-transitive",
    ];

    const defaultDifficultySettings = {
      minLength: 7,
      maxLength: 15,
      includePartsOfSpeech: selectedPartsOfSpeech,
      minCorpusCount: 10_000,
      maxCorpusCount: -1,
      minDictionaryCount: 1,
      maxDictionaryCount: -1,
      hasDictionaryDef: true,
    };

    try {
      const { currentWord, id } = await api.startGame(
        defaultDifficultySettings
      );
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
            id={id}
            currentWord={currentWord}
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
