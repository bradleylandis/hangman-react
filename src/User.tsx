import * as React from "react";
import { LoggedInUser } from "./apiGateway";

interface ProfileProps {
  user: LoggedInUser;
}

const Profile = ({ user }: ProfileProps) =>
  user ? <div>Hello {user.userDetails}</div> : <React.Fragment />;
export default Profile;
