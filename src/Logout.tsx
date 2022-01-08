import * as React from "react";
import { LoggedInUser } from "./apiGateway";

interface LogoutButtonProps {
  user: LoggedInUser;
}

const LogoutButton = ({ user }: LogoutButtonProps) =>
  user ? (
    <button onClick={() => window.location.assign("/logout")}>Log out</button>
  ) : (
    <React.Fragment />
  );

export default LogoutButton;
