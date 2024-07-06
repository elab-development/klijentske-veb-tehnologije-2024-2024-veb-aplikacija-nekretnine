import React from "react";
import styles from "./Bookings.module.css";
import { useSelector } from "react-redux";
import Card from "../../../Reusables/Card/Card";

const Bookings = () => {
  const bookings = useSelector((state) => state.user.bookings);

  return (
    <div className={styles.container}>
      <h2>Vaše rezervacije</h2>
      <div className={styles.cardsContainer}>
        {bookings.length > 0 ? (
          bookings.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p>Još uvek nemate rezervacija.</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
