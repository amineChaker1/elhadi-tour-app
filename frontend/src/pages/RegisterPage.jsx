import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../../app/apiSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registerUserMut] = useAddUserMutation();
  const registerUser = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    console.log(newUser);
    const res = await registerUserMut(newUser);
    if (res.error) return console.log("error", res.error);

    navigate("/");
  };
  return (
    <section class="bg-white ">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-myGold">
          ! مرحبا بك
        </h2>
        <p class="mb-6 lg:mb-8   text-center  sm:text-xl">
          سعيد برؤيتك هنا ، قم بإنشاء حساب إذا كنت جديدًا هنا ، و إذا استخدمت
          منصتنا من قبل،{" "}
          <Link to="/login" className="font-bold underline ">
            {" "}
            قم بتسجيل الدخول
          </Link>
        </p>
        <form onSubmit={registerUser} class="space-y-6">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              اسمك
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              class="shadow-sm outline-secondary  text-gray-900 text-sm rounded-lg  block w-full p-2.5 border-2 border-myGold focus:ring-myGold focus:border-myGold  placeholder-myGold dark:shadow-sm-light"
              placeholder="utilisateur"
              required
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              بريدك الالكتروني
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              class="shadow-sm outline-secondary  text-gray-900 text-sm rounded-lg  block w-full p-2.5 border-2 border-myGold focus:ring-myGold focus:border-myGold  placeholder-myGold dark:shadow-sm-light"
              placeholder="utlisateur@gmail.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              كلمة السر
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              class="block p-3 w-full text-sm text-gray-900  rounded-lg outline-secondary shadow-sm border-2 border-myGold focus:ring-myGold focus:border-myGold  placeholder-myGold dark:shadow-sm-light"
              placeholder="mot de pass"
              required
            />
          </div>

          <button
            type="submit"
            class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg bg-myGold  hover:bg-myGold focus:ring-4 focus:outline-none focus:ring-myGold dark:bg-myGold dark:hover:bg-myGold dark:focus:ring-myGold"
          >
            انشاء حساب
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
