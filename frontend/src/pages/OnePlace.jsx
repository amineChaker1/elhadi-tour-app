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
      <div className="sticky">
        <div className="flex justify-evenly">
          <h1>Appeler</h1>
          <h1>Message</h1>
        </div>
      </div>
    </div>
  );
};

export default OnePlace;
