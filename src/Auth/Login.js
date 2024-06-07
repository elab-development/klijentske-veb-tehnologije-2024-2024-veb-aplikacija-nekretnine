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
