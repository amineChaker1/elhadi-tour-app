import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBookingMutation } from "../../app/apiSlice";
import { useSelector } from "react-redux";
import AddressLink from "./AddressLink";
import BookingDates from "./BookingDates";
import PlaceGallery from "./PlaceGallery";

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
    return <div>is loading</div>;
  }
  return (
    <div>
      <div className="my-8">
        <h1 className="text-3xl">{booking?.place?.title}</h1>
        <AddressLink className="my-2 block">
          {booking?.place?.address}
        </AddressLink>
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-4">Your booking information:</h2>
            <BookingDates booking={booking} />
          </div>
          <div className="bg-primary p-6 text-white rounded-2xl">
            <div>Total price</div>
            <div className="text-3xl">{booking?.price}DA</div>
          </div>
        </div>
        <PlaceGallery place={booking?.place} />
      </div>
    </div>
  );
};

export default SingleBooking;
