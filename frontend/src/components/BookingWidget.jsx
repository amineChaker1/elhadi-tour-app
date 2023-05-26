import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { useAddNewBookingMutation } from "../../app/apiSlice";
import { useSelector } from "react-redux";
const BookingWidget = ({ place }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const user = useSelector((state) => state.user);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const [addbooking] = useAddNewBookingMutation();
  const newBooking = {
    place: place?._id,
    user: user,
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
    navigate("/account/bookings");
  };
  return (
    <div id="book">
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">{place?.price} Da لليلة</div>
        <div className="border rounded-2xl mt-4">
          <div className="flex flex-col md:flex-row">
            <div className="py-3 px-4">
              <label>اختر يوم مجيئك</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>اختر يوم رحيلك</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>عدد الأفراد القادمين</label>
            <input
              type="number"
              className="border-2 w-36 sm:w-56 md:w-full border-myGold rounded-2xl m-2 p-1"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>

          <div className="py-3 px-4 border-t">
            <label>اسمك الكامل</label>
            <input
              type="text"
              className="border-2 w-36 sm:w-56 md:w-full border-myGold rounded-2xl m-2 p-1  px-3"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />{" "}
            <br />
            <label>رقم هاتفك</label>
            <input
              type="tel"
              className="border-2 w-36 sm:w-56 md:w-full border-myGold rounded-2xl m-2 p-1 px-3"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        </div>
        <button
          onClick={bookThisPlace}
          className="bg-myGold p-2 w-full text-white rounded-2xl mt-4"
        >
          احجز هذا المنزل
          {numberOfNights > 0 && (
            <span> {numberOfNights * place.price} DA </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
