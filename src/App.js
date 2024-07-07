import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Pages/Home/Home";
import Properties from "./Components/Pages/Properties/Properties";
import Footer from "./Components/Footer/Footer";
import Contact from "./Components/Pages/Contact/Contact";
import Auth from "./Auth/Auth";
import Favorites from "./Components/Pages/Favorites/Favorites";
import { useDispatch } from "react-redux";
import { auth } from "./Firebase";
import { login } from "./Components/Features/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bookings from "./Components/Pages/Bookings/Bookings";
import Property from "./Components/Pages/Properties/Property";
import AuthModule from "./Reusables/AuthModule/AuthModule";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authModule, setAuthModule] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
            photoURL: auth.currentUser.photoURL,
          })
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties">
          <Route index element={<Properties setAuthModule={setAuthModule} />} />
          <Route
            path=":propertyId"
            element={<Property setAuthModule={setAuthModule} />}
          />
        </Route>
        <Route path="/bookings" element={<Bookings />} />
        <Route
          path="/favorites"
          element={<Favorites setAuthModule={setAuthModule} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ToastContainer position="bottom-left" />
      <Footer />
      {authModule && <AuthModule setAuthModule={setAuthModule} />}
    </div>
  );
}

export default App;
