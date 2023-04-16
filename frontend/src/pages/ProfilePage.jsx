import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <div>ProfilePage for {user.name} </div>;
};

export default ProfilePage;
