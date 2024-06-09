import React from "react";
import styles from "./Location.module.css";

const Location = () => {
  return (
    <div>
      <div className={styles.locationTextBox}>
        <iframe
          title="lokacija"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.033718156673!2d20.454050176238045!3d44.80050147107083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70061aa4239d%3A0xf2c4d897d3f807b4!2z0KDQtdGB0LDQstGB0LrQsCA5OCwg0JHQtdC-0LPRgNCw0LQgMTEwMDA!5e0!3m2!1ssr!2srs!4v1717925108109!5m2!1ssr!2srs"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
