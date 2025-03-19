import { Routes, Route } from 'react-router';
import { useLogIn } from './hooks/useLogIn.ts';
import { HomePage } from './pages/HomePage.tsx';
import { Home } from './components/Home.tsx';
import { Gallery } from './pages/Gallery.tsx';
import { Profile } from './pages/Profile.tsx';
import { SignUp } from './pages/SignUp.tsx';
import { Login } from './pages/Login.tsx';
import { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { showSnackbar } from './store/snackbarSlice.ts';
import { LoginState, ProfileState } from './interfaces/index.ts';

const RedirectUser = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: LoginState) => state.login.user);
  const profile = useSelector((state: ProfileState) => state.profile.profileUser);
  useEffect(() => {
    if (!user) {
      navigate('/login');
      if (!profile) {
        dispatch(showSnackbar('Вы не вошли в профиль!'));
      }
    }
  }, [user, profile, navigate, dispatch]);

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
