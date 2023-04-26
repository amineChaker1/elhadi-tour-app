import React from "react";
import loading from "../assets/oh_loader.gif";
import { useGetPlacesQuery } from "../../app/apiSlice";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
const Home = () => {
  const { data, isLoading } = useGetPlacesQuery();
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <img src={loading} className="" alt="" />
        <p>Loading Houses Please Wait....</p>
      </div>
    );
  }
  return (
    <div>
      <div className="grid mt-8 gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-3 ">
        {data.map((cerPlacce) => (
          <Link className="hover:text-myGold" to={"/place/" + cerPlacce._id}>
            <div className=" mb-2 px-4 rounded-2xl ">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={`https://elhadi.onrender.com/uploads/${cerPlacce.photos?.[0]}`}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={`https://elhadi.onrender.com/uploads/${cerPlacce.photos?.[1]}`}
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={`https://elhadi.onrender.com/uploads/${cerPlacce.photos?.[2]}`}
                    alt=""
                  />
                </Carousel.Item>
              </Carousel>
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <h2 className="font-bold">{cerPlacce.title}</h2>
                  <h3 className="text-sm text-gray-500">{cerPlacce.address}</h3>
                  <div className="mt-1">
                    <span className="font-bold">{cerPlacce.price} Da</span> per
                    night
                  </div>
                </div>
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
