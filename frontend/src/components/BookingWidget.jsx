import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useAddNewBookingMutation } from "../../app/apiSlice";
const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const [addbooking] = useAddNewBookingMutation();
  const newBooking = {
    place: place?.id,
    checkIn: checkIn,
    checkOut: checkOut,
    name: name,
    phone: phone,
    price: numberOfNights * place?.price,
  };
  console.log(newBooking);
  const bookThisPlace = async (e) => {
    e.preventDefault();
    const res = await addbooking(newBooking);
    console.log(res);
  };
  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: {place?.price} DA / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check in:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input
              type="number"
              className="border border-primary rounded-2xl m-2 p-1  "
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                className="border border-primary rounded-2xl m-2 p-1  px-3"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />{" "}
              <br />
              <label>Phone number:</label>
              <input
                type="tel"
                className="border border-primary rounded-2xl m-2 p-1 px-3"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button
          onClick={bookThisPlace}
          className="bg-primary p-2 w-full text-white rounded-2xl mt-4"
        >
          Book this place
          {numberOfNights > 0 && (
            <span> {numberOfNights * place.price} DA </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
