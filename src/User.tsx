import * as React from "react";
import { GetUserResponse } from "./api";

interface ProfileProps {
  user: GetUserResponse;
}

const Profile = ({ user }: ProfileProps) =>
  user?.clientPrincipal ? (
    <div>Hello {user?.clientPrincipal?.userDetails}</div>
  ) : (
    <React.Fragment />
  );
export default Profile;
