import React, { useEffect, useState } from "react";
import {
  useAddPlaceImageMutation,
  useGetSinglePlaceQuery,
  useUpdateSinglePlaceMutation,
} from "../../app/apiSlice";
import { useParams } from "react-router-dom";

const SinglePlace = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSinglePlaceQuery(id);
  const query = useGetSinglePlaceQuery(id);
  useEffect(() => {
    query.refetch();
  }, [data]);
  const [addplacemut] = useAddPlaceImageMutation();
  const [update] = useUpdateSinglePlaceMutation();
  const [Newtitle, setNewTitle] = useState(data?.title);
  const [Newaddress, setNewAddress] = useState(data?.address);
  const [NewaddedPhotos, setNewAddedPhotos] = useState(data?.photos);
  const [NewphotoLink, setNewPhotoLink] = useState([]);
  const [Newdescription, setNewDescription] = useState(data?.description);
  const [Newperks, setNewPerks] = useState(data?.perks);
  const [NewextraInfo, setNewExtraInfo] = useState(data?.extraInfo);
  const [NewcheckIn, setNewCheckIn] = useState(data?.checkIn);
  const [NewcheckOut, setNewCheckOut] = useState(data?.checkOut);
  const [NewmaxGuests, setNewMaxGuests] = useState(data?.maxGuests);
  const [NewPrice, setNewPrice] = useState(data?.price);
  const updatedHouse = {
    updateId: id,
    title: Newtitle,
    address: Newaddress,
    photos: NewaddedPhotos,
    description: Newdescription,
    perks: Newperks,
    extraInfo: NewextraInfo,
    checkIn: NewcheckIn,
    checkOut: NewcheckOut,
    maxGuests: NewmaxGuests,
    price: NewPrice,
  };
  const handelCheckBoxClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setNewPerks([...Newperks, name]);
    } else {
      setNewPerks([...Newperks.filter((pushed) => pushed !== name)]);
    }
  };
  const uploadFromDevice = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("https://elhadi.onrender.com/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const upload = {
      link: NewphotoLink,
    };
    const res = await addplacemut(upload);
    console.log(res);
    const filename = res.data;
    console.log(filename);
    setNewAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setNewPhotoLink("");
  };

  const updateNewPlace = async (e) => {
    e.preventDefault();
    console.log(id);
    console.log(updatedHouse);
    const res = await update(updatedHouse);
    console.log(res);
  };
  return (
    <div>
      <div>
        <form onSubmit={updateNewPlace}>
          <h2 className="text-xl mt-4">Title</h2>
          <input
            type="text"
            value={Newtitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border my-1 py-2 px-3 rounded-2xl"
            placeholder="title"
          />
          <h2 className="text-xl mt-4">Address</h2>
          <input
            type="text"
            value={Newaddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full border my-1 py-2 px-3 rounded-2xl"
            placeholder="address"
          />
          <h2 className="text-xl mt-4">Photos</h2>
          <div className="flex gap-2">
            <input
              value={NewphotoLink}
              onChange={(e) => setNewPhotoLink(e.target.value)}
              type="text"
              className="w-full border my-1 py-2 px-3 rounded-2xl"
              placeholder="add using link"
            />
            <button
              onClick={addPhotoByLink}
              className="bg-myGold p-2 text-white"
            >
              {" "}
              Add Photo{" "}
            </button>
          </div>
          <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {NewaddedPhotos?.length > 0 &&
              NewaddedPhotos?.map((link) => (
                <div>
                  <img
                    className=""
                    src={`https://elhadi.onrender.com/uploads/${link}`}
                    alt=""
                  />
                </div>
              ))}
            <label className="flex cursor-pointer items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
              <input
                type="file"
                multiple
                className="hidden "
                onChange={(e) => uploadFromDevice(e)}
              />
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
                  d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                />
              </svg>
              Upload
            </label>
          </div>
          <h2 className="text-xl mt-4">Description</h2>
          <textarea
            value={Newdescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="description"
            className="w-full border my-1 py-2 px-3 rounded-2xl"
          ></textarea>
          <h2 className="text-xl mt-4">Perks</h2>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
              <input
                checked={Newperks?.includes("wifi")}
                name="wifi"
                onChange={(e) => handelCheckBoxClick(e)}
                type="checkbox"
              />
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
                  d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                />
              </svg>

              <span>Wifi </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
              <input
                checked={Newperks?.includes("parking")}
                name="parking"
                onChange={(e) => handelCheckBoxClick(e)}
                type="checkbox"
              />
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
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>

              <span>Free Parking </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
              <input
                checked={Newperks?.includes("tv")}
                name="tv"
                onChange={(e) => handelCheckBoxClick(e)}
                type="checkbox"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>

              <span>TV </span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
              <input
                checked={Newperks?.includes("pets")}
                name="pets"
                onChange={(e) => handelCheckBoxClick(e)}
                type="checkbox"
              />
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
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>

              <span>Pets </span>
            </label>
          </div>
          <h2 className="text-xl mt-4">House Rules</h2>
          <textarea
            value={NewextraInfo}
            onChange={(e) => setNewExtraInfo(e.target.value)}
            placeholder="house rules"
            className="w-full border my-1 py-2 px-3 rounded-2xl"
          ></textarea>
          <h2 className="text-xl mt-4">Timing & Guests</h2>
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                value={NewcheckIn}
                onChange={(e) => setNewCheckIn(e.target.value)}
                type="text"
                className="w-full border my-1 py-2 px-3 rounded-2xl"
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                value={NewcheckOut}
                onChange={(e) => setNewCheckOut(e.target.value)}
                type="text"
                className="w-full border my-1 py-2 px-3 rounded-2xl"
                placeholder="22:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max Guests</h3>
              <input
                value={NewmaxGuests}
                onChange={(e) => setNewMaxGuests(e.target.value)}
                type="text"
                className="w-full border my-1 py-2 px-3 rounded-2xl"
                placeholder="8"
              />
            </div>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price Per Night</h3>
            <input
              value={NewPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              type="text"
              className="w-full border my-1 py-2 px-3 rounded-2xl"
              placeholder="8"
            />
          </div>
          <button
            className="my-4 bg-myGold p-2 w-full text-white rounded-2xl"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SinglePlace;
