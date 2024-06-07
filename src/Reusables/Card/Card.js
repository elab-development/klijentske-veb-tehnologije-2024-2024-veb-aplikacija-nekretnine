import React from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../Components/Features/userSlice";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);

  const isFavorite = favorites.some(
    (favoriteItem) => favoriteItem.id === item.id
  );

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(item));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        onClick={handleFavoriteClick}
        className={`${styles.icon} ${isFavorite ? styles.favorited : ""}`}
        icon={faHeart}
      />
      <img src={item.img} alt=""></img>
      <p>{item.price} $</p>
      <h3>{item.title}</h3>
    </div>
  );
};

export default Card;
