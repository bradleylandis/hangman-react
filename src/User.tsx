import * as React from "react";
import { LoggedInUser } from "./api";

interface ProfileProps {
  user: LoggedInUser;
}

const Profile = ({ user }: ProfileProps) =>
  user ? <div>Hello {user.userDetails}</div> : <React.Fragment />;
export default Profile;
