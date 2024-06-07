import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import logo from "../Images/FooterIMGS/logo2.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const Login = ({ setToggleRegistration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordLengthErr, setPasswordLengthErr] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userCredentialError, setUserCredentialError] = useState(false);

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

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
      }
      if (err.code === "auth/invalid-credential") {
        setUserCredentialError(true);
      }

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
          className={
            emailError || userCredentialError ? styles.errorInput : styles.input
          }
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
            setUserCredentialError(false);
          }}
          type="text"
          placeholder="Email"
        ></input>
        {emailError ? (
          <h6 className={styles.errorText}>Email is not valid.</h6>
        ) : (
          ""
        )}
        <input
          className={
            passwordLengthErr || userCredentialError
              ? styles.errorInput
              : styles.input
          }
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordLengthErr(false);
            setUserCredentialError(false);
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
        {userCredentialError ? (
          <h6 className={styles.errorText}>Invalid credentials.</h6>
        ) : (
          ""
        )}
      </div>
      <button onClick={login}>Continue</button>
      <p>
        Don't have an account?{" "}
        <span
          onClick={() => setToggleRegistration(false)}
          className={styles.span}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
