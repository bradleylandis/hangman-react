import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated ? (
    <div>
      <button
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        Log out
      </button>
      <button onClick={() => window.location.assign("/logout")}>Log out</button>
    </div>
  ) : (
    <React.Fragment />
  );
}

export default LogoutButton;
