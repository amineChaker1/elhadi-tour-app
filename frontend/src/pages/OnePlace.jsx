import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import { useGetSinglePlaceQuery } from "../../app/apiSlice";
const OnePlace = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSinglePlaceQuery(id);
  const query = useGetSinglePlaceQuery(id);

  useEffect(() => {
    query.refetch();
  }, [isLoading]);

  return (
    <div>
      <div className="mt-4  -mx-8 md:px-36 px-8 pt-8">
        <h1 className="text-3xl">{data?.title} </h1>
        <AddressLink>{data?.address}</AddressLink>
        <PlaceGallery place={data} />
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {data?.description}
            </div>
            Check-in: {data?.checkIn}
            <br />
            Check-out: {data?.checkOut}
            <br />
            Max number of guests: {data?.maxGuests}
          </div>
          <div>
            <BookingWidget place={data} />
          </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {data?.extraInfo}
          </div>
        </div>
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
            <div>Appeler</div>
          </a>
          <a
            href="#book"
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
            <div>Book</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OnePlace;
