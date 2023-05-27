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
    let classes = "py-1 px-2 sm:py-2 sm:px-6";
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
          <span className="hidden md:block"> بروفايل الشخصي</span>{" "}
          <span>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 md:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </span>
        </Link>
        <Link className={insertClass("bookings")} to={"/account/bookings"}>
          {" "}
          <span className="hidden md:block"> الأماكن التي حجزتها</span>{" "}
          <span>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 md:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </svg>
          </span>
        </Link>
        {import.meta.env.VITE_ADMIN_EMAIL === user.email && (
          <Link className={insertClass("places")} to={"/account/places"}>
            {" "}
            أدمين{" "}
          </Link>
        )}
      </nav>

      {subpage === "places" && <PlacesSection />}
      {subpage === "profile" && (
        <div className="text-center mt-16 max-w-lg mx-auto">
          {user?.name
            ? `${user?.name} (${user?.email}) أنت مسجل في الحساب `
            : "You Are Not Logged In"}{" "}
          <br />
          <button
            onClick={handleClick}
            className="bg-myGold p-2 w-full text-white rounded-2xl bg-myGold text-white p-2 rounded-xl max-w-sm mt-5"
          >
            {user?.name ? "تسجيل الخروج" : "تسجيل الدخول"}
          </button>
        </div>
      )}
      {subpage === "bookings" && <BookingSection />}
    </div>
  );
};

export default ProfilePage;
