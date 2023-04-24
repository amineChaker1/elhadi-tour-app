import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../app/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserMutation] = useLoginUserMutation();
  const loginUser = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const res = await loginUserMutation(user);
    if (res.error) return console.log("error", res.error);
    console.log(res.data);
    localStorage.setItem("user", res.data.name);
    dispatch(setUser(res.data));
    navigate("/");
  };
  return (
    <section class="bg-white ">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-myGold">
          Bienvenue de retour !
        </h2>
        <p class="mb-8 lg:mb-16  text-center  sm:text-xl">
          Ravi de vous revoir, connectez-vous à votre compte et si vous êtes
          nouveau ici,{" "}
          <Link to="/register" className=" underline font-semibold">
            {" "}
            Inscrivez-Vous.
          </Link>
        </p>
        <form action="#" onSubmit={loginUser} class="space-y-8">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Votre email
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
              Votre Mot De Pass
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
            Se Connecter
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
