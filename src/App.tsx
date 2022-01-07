import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Game from "./Game";
import "./App.css";
import { getIsError, getIsLoading } from "./reducers";
import Loading from "./Loading";
import Error from "./Error";
import * as actions from "./actions";
import Login from "./Login";
import Logout from "./Logout";
import User from "./User";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const isError = useSelector(getIsError);
  const { user, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    (async () => {
      if (user) {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
        });
        localStorage.setItem("accessToken", accessToken);
      } else {
        localStorage.removeItem("accessToken");
      }
    })();
  }, [user, getAccessTokenSilently]);

  React.useEffect(() => {
    dispatch(actions.startGame(user?.sub!));
  }, [dispatch, user]);

  return (
    <div className="App">
      <div>
        <a href="/.auth/login/Auth0">Login</a>
        <Login />
        <Logout />
        <User />
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error tryAgain={() => dispatch(actions.startGame(user?.sub!))} />
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
