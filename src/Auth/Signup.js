import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import logo from "../Images/FooterIMGS/logo2.png";
import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Components/Features/userSlice";

const Signup = ({ setToggleRegistration }) => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((store) => store.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        login({
          uid: auth.currentUser.uid,
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
        })
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoTitleBox}>
        <img src={logo} alt=""></img>
      </div>
      <div className={styles.inputBox}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          placeholder="Username"
        ></input>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        ></input>
      </div>
      <button onClick={signUp}>Continue</button>
      <p>
        Already have an account?{" "}
        <span
          onClick={() => setToggleRegistration(true)}
          className={styles.span}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Signup;
