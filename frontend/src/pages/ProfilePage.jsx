import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout } from "../../app/userSlice";
import PlacesSection from "../components/PlacesSection";
import BookingSection from "../components/BookingSection";

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
      classes += " bg-myGold rounded-full text-white";
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
        {import.meta.env.VITE_ADMIN_EMAIL === user.email && (
          <Link className={insertClass("places")} to={"/account/places"}>
            {" "}
            My Accomendations{" "}
          </Link>
        )}
      </nav>

      {subpage === "places" && <PlacesSection />}
      {subpage === "profile" && (
        <div className="text-center mt-16 max-w-lg mx-auto">
          {user?.name
            ? `Logged in as ${user?.name} (${user?.email})`
            : "You Are Not Logged In"}{" "}
          <br />
          <button
            onClick={handleClick}
            className="bg-myGold p-2 w-full text-white rounded-2xl bg-myGold text-white p-2 rounded-xl max-w-sm mt-5"
          >
            {user?.name ? "Logout" : "Login"}
          </button>
        </div>
      )}
      {subpage === "bookings" && <BookingSection />}
    </div>
  );
};

export default ProfilePage;
