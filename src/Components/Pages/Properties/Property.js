import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Property.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faDoorOpen, faShower } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToBookings, removeFromBookings } from "../../Features/userSlice";

const Property = ({ setAuthModule }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.user.bookings);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();

  if (!item) {
    return <div>Loading...</div>;
  }

  const isBooked = bookings.some((bookingItem) => bookingItem.id === item.id);

  const handleRemoveBooking = () => {
    dispatch(removeFromBookings(item));
    setEndDate(false);
    setStartDate(false);
    navigate("/bookings");
  };

  const handleDateSelection = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleModalClose = () => {
    setShowDatePicker(false);
    setStartDate(null);
    setEndDate(null);
  };

  const handleDone = () => {
    if (startDate && endDate) {
      toast.success(
        `Uspešna rezervacija od ${startDate.toLocaleDateString()} do ${endDate.toLocaleDateString()}`
      );
      dispatch(addToBookings(item));
      setShowDatePicker(false);
    } else {
      toast.error("Molimo vas izaberite datume.");
    }
  };

  const handleBookingClick = () => {
    if (user) {
      setShowDatePicker(true);
    } else {
      setAuthModule(true);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="bottom-left" />

      <img src={item.img} alt="Property" />
      <div className={styles.lBox}>
        <div className={styles.titlePriceBox}>
          <h2>{item.title}</h2>
          <span style={{ color: "#2c4dcd", fontSize: "23px" }}>
            {item.price} $
          </span>
        </div>
        <div className={styles.roomsBox}>
          <div className={styles.iconTextBox}>
            <FontAwesomeIcon className={styles.icon} icon={faShower} />
            <h6>{item.bathroom} Kupatilo/a</h6>
          </div>

          <div className={styles.iconTextBox}>
            <FontAwesomeIcon className={styles.icon} icon={faCar} />
            <h6>Parking</h6>
          </div>

          <div className={styles.iconTextBox}>
            <FontAwesomeIcon className={styles.icon} icon={faDoorOpen} />
            <h6>{item.bathroom} Sobe/a</h6>
          </div>
        </div>
        <p>{item.description}</p>
        {isBooked ? (
          <button onClick={handleRemoveBooking}>Ukloni</button>
        ) : (
          <button onClick={handleBookingClick}>Rezervisi</button>
        )}
        {startDate && endDate && (
          <div className={styles.dateSelection}>
            <p>
              Izabrani Datum: {startDate.toLocaleDateString()} -{" "}
              {endDate.toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {showDatePicker && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <DatePicker
              selected={startDate}
              onChange={handleDateSelection}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              minDate={today}
            />
            <div className={styles.btnBox}>
              <button className={styles.closeBtn} onClick={handleModalClose}>
                Zatvori
              </button>

              <button className={styles.closeBtn} onClick={handleDone}>
                Izaberi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;
