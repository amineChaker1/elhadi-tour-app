import React, { useState } from "react";
import { useGetPlacesQuery } from "../../app/apiSlice";
import { Link } from "react-router-dom";

const ListingSection = () => {
  const { data } = useGetPlacesQuery();
  console.log(data);
  const [places, setPlaces] = useState(data);
  return (
    <div>
      hello
      {data?.map((place) => (
        <Link
          to={"/account/places/" + place._id}
          className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
        >
          <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
            <img src={place.photos[0]} alt="" />
          </div>
          <div className="grow-0 shrink">
            <h2 className="text-xl">{place.title}</h2>
            <p className="text-sm mt-2">{place.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListingSection;
