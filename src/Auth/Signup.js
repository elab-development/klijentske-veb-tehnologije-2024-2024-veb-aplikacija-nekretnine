import React from "react";
import styles from "./Signup.module.css";
import logo from "../Images/FooterIMGS/logo2.png";

const Signup = ({ setToggleRegistration }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoTitleBox}>
        <img src={logo} alt=""></img>
      </div>
      <div className={styles.inputBox}>
        <input type="username" placeholder="Username"></input>
        <input type="email" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
      </div>
      <button>Continue</button>
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
