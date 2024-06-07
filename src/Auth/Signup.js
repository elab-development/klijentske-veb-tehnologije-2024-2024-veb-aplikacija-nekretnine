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

  const [usernameError, setUsernameError] = useState(false);
  const [usernameToLongError, setUsernameToLongError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailAlredyExistError, setEmailAlreadyExistError] = useState(false);
  const [passwordLengthErr, setPasswordLengthErr] = useState(false);

  const user = useSelector((store) => store.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const signUp = async () => {
    if (username.length < 6) {
      setUsernameError(true);
      return;
    } else if (username.length > 8) {
      setUsernameToLongError(true);
      return;
    } else {
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
        if (
          err.code === "auth/weak-password" ||
          err.code === "auth/missing-password"
        ) {
          setPasswordLengthErr(true);
        }
        console.log(err.message);
        if (
          err.code === "auth/invalid-email" ||
          err.code === "auth/missing-email"
        ) {
          setEmailError(true);
        } else if (err.code === "auth/email-already-in-use") {
          setEmailAlreadyExistError(true);
        }
        console.log(err);
      }
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoTitleBox}>
        <img src={logo} alt=""></img>
      </div>
      <div className={styles.inputBox}>
        <input
          className={
            usernameError || usernameToLongError
              ? styles.errorInput
              : styles.input
          }
          value={username}
          onChange={(e) => {
            setUsername(capitalizeFirstLetter(e.target.value));
            setUsernameError(false);
            setUsernameToLongError(false);
          }}
          type="text"
          placeholder="Username"
        ></input>
        {usernameToLongError && (
          <p className={styles.errorText}>
            Username should not be more than 8 characters.
          </p>
        )}
        {usernameError ? (
          <h6 className={styles.errorText}>
            Username should be at lest 6 characters.
          </h6>
        ) : (
          ""
        )}
        <input
          className={
            emailError || emailAlredyExistError
              ? styles.errorInput
              : styles.input
          }
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          type="text"
          placeholder="Email"
        ></input>
        {emailError ? (
          <h6 className={styles.errorText}>Email is not valid.</h6>
        ) : (
          ""
        )}
        {emailAlredyExistError ? (
          <h6 className={styles.errorText}>Email already exists.</h6>
        ) : (
          ""
        )}
        <input
          className={passwordLengthErr ? styles.errorInput : styles.input}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordLengthErr(false);
          }}
          type="password"
          placeholder="Password"
        ></input>
        {passwordLengthErr ? (
          <h6 className={styles.errorText}>
            Password should be at least 6 characters.
          </h6>
        ) : (
          ""
        )}
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
