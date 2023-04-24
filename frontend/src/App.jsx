import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

import SinglePlace from "./components/SinglePlace";
import OnePlace from "./pages/OnePlace";
import SingleBooking from "./components/SingleBooking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/:subpage?" element={<ProfilePage />} />
        <Route path="/account/:subpage/:action" element={<ProfilePage />} />
        <Route path="/account/place/edit/:id" element={<SinglePlace />} />
        <Route path="place/:id" element={<OnePlace />} />
        <Route path="/account/bookings/:id" element={<SingleBooking />} />
      </Route>
    </Routes>
  );
}

export default App;
