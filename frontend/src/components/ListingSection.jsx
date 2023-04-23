import React, { useEffect, useState } from "react";
import { useGetPlacesQuery } from "../../app/apiSlice";
import { Link } from "react-router-dom";

const ListingSection = () => {
  const { data, isLoading } = useGetPlacesQuery();

  return (
    <div>
      {data?.map((place) => (
        <Link
          to={"/account/place/edit/" + place._id}
          className="flex cursor-pointer gap-4 my-5 bg-gray-100 p-4 rounded-2xl"
        >
          <div className="flex w-32 h-32 bg-gray-300 ">
            <img
              className="h-full w-full"
              src={`http://localhost:4321/uploads/${place.photos[0]}`}
              alt=""
            />
          </div>
          <div className="">
            <h2 className="text-xl">{place.title}</h2>
            <p className="text-sm mt-2">{place.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListingSection;
