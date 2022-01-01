import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? <div>Hello {user?.name}</div> : <React.Fragment />;
}

export default Profile;
