import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBookingMutation } from "../../app/apiSlice";
import { useSelector } from "react-redux";
import AddressLink from "./AddressLink";
import BookingDates from "./BookingDates";
import PlaceGallery from "./PlaceGallery";
import loading from "../assets/loading.gif";
const SingleBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [getBooking] = useGetBookingMutation();
  const user = useSelector((state) => state.user);

  const bookedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
  useEffect(() => {
    getBooking(bookedUser).then((res) => {
      const foundBooking = res.data.find(({ _id }) => _id === id);

      setBooking(foundBooking);
    });
  }, [booking]);
  if (!booking) {
    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <img src={loading} className="w-28 h-28 md:w-36 md:h-36 " alt="" />
        <p className="mb-36 mt-2 font-bold">
          يتم تجهيز منزلكم يرجى الانتظار....
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="my-8">
        <h1 className="text-3xl">{booking?.place?.title}</h1>
        <AddressLink className="my-2 block">
          {booking?.place?.address}
        </AddressLink>
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
          <div className="bg-myGold p-6 text-white rounded-2xl">
            <div>الثمن الكلي</div>
            <div className="text-3xl">{booking?.price}DA</div>
          </div>
          <div>
            <h2 className="text-base md:text-2xl mb-4">معلومات عن الحجز</h2>
            <BookingDates booking={booking} />
          </div>
        </div>
        <PlaceGallery place={booking?.place} />
      </div>
      <div className="sticky bottom-10 z-50">
        <div className="flex justify-evenly md:px-36">
          <a
            href="tel:+213775258404"
            className="bg-myGold flex hover:text-black cursor-pointer items-center gap-1 border-2 border-gray-600 py-2 px-4 rounded-2xl"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </div>
            <div>اتصل بنا</div>
          </a>
          <a
            href="tel:+213775258404"
            className="bg-white flex hover:text-black cursor-pointer items-center gap-1 border-2 border-gray-600 py-2 px-4 rounded-2xl"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                />
              </svg>
            </div>
            <div>تأكيد الحجز</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleBooking;
