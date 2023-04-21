import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout } from "../../app/userSlice";
import PlacesSection from "../components/PlacesSection";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logout());
    navigate("/");
  };
  const user = useSelector((state) => state.user);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  const insertClass = (type = null) => {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary rounded-full text-white";
    }
    return classes;
  };
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className={insertClass("profile")} to={"/account/profile"}>
          {" "}
          My Profile{" "}
        </Link>
        <Link className={insertClass("bookings")} to={"/account/bookings"}>
          {" "}
          My Bookings{" "}
        </Link>
        <Link className={insertClass("places")} to={"/account/places"}>
          {" "}
          My Accomendations{" "}
        </Link>
      </nav>
      {subpage === "places" && <PlacesSection />}
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          {user?.name
            ? `Logged in as ${user?.name} (${user?.email})`
            : "You Are Not Logged In"}{" "}
          <br />
          <button
            onClick={handleClick}
            className=" bg-primary text-white p-2 rounded-xl max-w-sm mt-2"
          >
            {user?.name ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
