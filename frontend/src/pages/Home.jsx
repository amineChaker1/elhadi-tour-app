import React from "react";
import Header from "../components/Header";
import { useGetPlacesQuery } from "../../app/apiSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useGetPlacesQuery();
  if (isLoading) {
    return <div>is Loading</div>;
  }
  return (
    <div>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {data?.length > 0 &&
          data?.map((place) => (
            <Link to={"/place/" + place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={`http://localhost:4321/uploads/${place.photos?.[0]}`}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.title}</h2>
              <h3 className="text-sm text-gray-500">{place.address}</h3>
              <div className="mt-1">
                <span className="font-bold">{place.price} Da</span> per night
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
