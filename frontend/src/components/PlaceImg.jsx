import React from "react";
const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      style={{ height: "100%" }}
      className={className}
      src={`https://elhadi.onrender.com/uploads/${place.photos[index]}`}
      alt=""
    />
  );
};

export default PlaceImg;
