import * as React from "react";
import type { GetUserResponse } from "./api";

interface LoginButtonProps {
  user: GetUserResponse;
}

const LoginButton = ({ user }: LoginButtonProps) =>
  user?.clientPrincipal ? (
    <React.Fragment />
  ) : (
    <button onClick={() => window.location.assign("/login")}>Log in</button>
  );

export default LoginButton;
