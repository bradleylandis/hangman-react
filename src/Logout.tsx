import * as React from "react";
import { GetUserResponse } from "./api";

interface LogoutButtonProps {
  user: GetUserResponse;
}

const LogoutButton = ({ user }: LogoutButtonProps) =>
  user?.clientPrincipal ? (
    <button onClick={() => window.location.assign("/logout")}>Log out</button>
  ) : (
    <React.Fragment />
  );

export default LogoutButton;
