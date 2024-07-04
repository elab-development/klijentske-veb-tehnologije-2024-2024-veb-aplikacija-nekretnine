import React from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../Components/Features/userSlice";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);

  const isFavorite = favorites.some(
    (favoriteItem) => favoriteItem.id === item.id
  );

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent event propagation to avoid navigation

    if (isFavorite) {
      dispatch(removeFromFavorites(item));
      toast.error(`${item.title} removed from favorites!`);
    } else {
      dispatch(addToFavorites(item));
      toast.success(`${item.title} added to favorites!`);
    }
  };

  const handleCardClick = () => {
    // Navigate to property details page and pass item object as state
    navigate(`/properties/${item.id}`, { state: { item } });
  };

  return (
    <div onClick={handleCardClick} className={styles.container}>
      <FontAwesomeIcon
        onClick={handleFavoriteClick}
        className={`${styles.icon} ${isFavorite ? styles.favorited : ""}`}
        icon={faHeart}
      />
      <img src={item.img} alt="" />
      <p>{item.price} $</p>
      <h3>{item.title}</h3>
    </div>
  );
};

export default Card;
