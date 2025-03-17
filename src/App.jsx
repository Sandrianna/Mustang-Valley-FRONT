import { Routes, Route } from "react-router";
import { useLogIn } from "./hooks/useLogIn.js";
import { HomePage } from "./pages/HomePage.jsx";
import { Home } from "./components/Home.jsx";
import { Gallery } from "./pages/Gallery.jsx";
import { Profile } from "./pages/Profile.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Login } from "./pages/Login.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { showSnackbar } from "./store/snackbarSlice.ts";

const RedirectUser = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const profile = useSelector((state) => state.profile.profile);
  useEffect(() => {
    if (!user) {
      navigate("/login");
      if (!profile) {
        dispatch(showSnackbar("Вы не вошли в профиль!"));
      }
    }
  }, [user, profile]);

  return children;
};

export function App() {
  useLogIn();

  return (
    <>
      <Home />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/gallery"
          element={
            <RedirectUser>
              <Gallery />
            </RedirectUser>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <RedirectUser>
              <Profile />
            </RedirectUser>
          }
        />
      </Routes>
    </>
  );
}
