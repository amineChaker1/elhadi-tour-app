import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetBookingMutation } from "../../app/apiSlice";
import { Link } from "react-router-dom";
import PlaceImg from "./PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";

import BookingDates from "./BookingDates";
const BookingSection = () => {
  const [bookings, setBookings] = useState([]);
  const [getBooking] = useGetBookingMutation();
  const user = useSelector((state) => state.user);

  const bookedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
  useEffect(() => {
    getBooking(bookedUser).then((res) => {
      setBookings(res.data);
    });
  }, [bookings]);

  return (
    <div>
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <Link
            to={`/account/bookings/${booking._id}`}
            className="flex gap-4 my-5 bg-gray-200 rounded-2xl overflow-hidden"
          >
            <div className="w-48">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-3 pr-3 w-48 grow">
              <h2 className="text-xl">{booking.place.title}</h2>
              <div className="text-xl">
                <BookingDates
                  booking={booking}
                  className="mb-2 mt-4 text-gray-500"
                />
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="text-2xl">{booking.price} دينار</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BookingSection;
