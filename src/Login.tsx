import * as React from "react";
import type { LoggedInUser } from "./api";

interface LoginButtonProps {
  user: LoggedInUser;
}

const LoginButton = ({ user }: LoginButtonProps) =>
  user ? (
    <React.Fragment />
  ) : (
    <button onClick={() => window.location.assign("/login")}>Log in</button>
  );

export default LoginButton;
