import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated ? (
    <button
      onClick={() => {
        logout({ returnTo: window.location.origin });
      }}
    >
      Log out
    </button>
  ) : (
    <React.Fragment />
  );
}

export default LogoutButton;
