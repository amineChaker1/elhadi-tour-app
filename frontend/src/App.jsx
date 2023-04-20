import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/:subpage" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
