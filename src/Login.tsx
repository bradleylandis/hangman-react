import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return isAuthenticated ? (
    <React.Fragment />
  ) : (
    <div>
      <button onClick={loginWithRedirect}>Log in</button>
      <button onClick={() => window.location.assign("/login")}>Log in</button>
    </div>
  );
}

export default LoginButton;
