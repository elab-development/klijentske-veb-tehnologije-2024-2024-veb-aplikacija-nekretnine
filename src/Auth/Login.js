import React from "react";
import styles from "./Login.module.css";
import logo from "../Images/FooterIMGS/logo2.png";

const Login = ({ setToggleRegistration }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoTitleBox}>
        <img src={logo} alt=""></img>
      </div>
      <div className={styles.inputBox}>
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
      </div>
      <button>Continue</button>
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
