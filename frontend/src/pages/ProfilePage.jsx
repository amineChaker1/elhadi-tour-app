import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const { subpage } = useParams();
  const insertClass = () => {
    console.log("");
  };
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className="py-2 px-6 bg-primary rounded-full text-white">
          {" "}
          My Profile{" "}
        </Link>
        <Link className="py-2 px-6" to={"/account/bookings"}>
          {" "}
          My Bookings{" "}
        </Link>
        <Link className="py-2 px-6" to={"/account/bookings"}>
          {" "}
          My Accomendations{" "}
        </Link>
      </nav>
    </div>
  );
};

export default ProfilePage;
