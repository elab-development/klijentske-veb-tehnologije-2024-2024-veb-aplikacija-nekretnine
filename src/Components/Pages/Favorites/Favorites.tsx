import React, { Component } from "react";
import { connect } from "react-redux";
import "./Favorites.css";
import Card from "../../../Reusables/Card/Card";
import PropertyHelper from "../../../Utils/PropertyHelper";
import { Property } from "../../../Utils/Property";

interface FavoritesProps {
  favorites: Property[];
  setAuthModule: (module: string) => void;
}

class Favorites extends Component<FavoritesProps> {
  render() {
    const { favorites, setAuthModule } = this.props;

    return (
      <div className="container">
        <h2>Vaše omiljene nekretnine</h2>
        <div className="cardsContainer">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <Card
                key={item.id}
                item={{
                  ...item,
                  formattedPrice: PropertyHelper.formatPrice(item.price),
                  formattedAddress: PropertyHelper.formatAddress(item.address),
                }}
                setAuthModule={setAuthModule}
              />
            ))
          ) : (
            <p>Još uvek nemate omiljenih nekretnina.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  favorites: state.user.favorites,
});

export default connect(mapStateToProps)(Favorites);
