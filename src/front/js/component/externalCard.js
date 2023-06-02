import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/externalCard.css";
import "../../styles/home.css";

export const ExternalCard = ({ item }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="card d-flex flex-column m-2 p-0" style={{ width: "18rem" }}>
            <Link to={`/book/${item.primary_isbn13}`} className="card-body-custom flex-grow-1">
                <div className="image-container" style={{ height: "320px", overflow: "hidden" }}>
                    <img src={item.book_image} className="card-img-top w-100 h-100" alt="Book Cover" />
                </div>
                <div className="card-body text-start">

                    <div className="row">
                        <h5 className="card-title">{item.title}</h5>
                    </div>
                    <div className="row">
                        <p className="card-text">{item.author}</p>
                    </div>
                    <div className="row">
                        <p className="card-text">
                            <span className="fw-bold">Price: </span>
                            {item.price}
                        </p>
                    </div>

                </div>
            </Link>
            <div className="card-footer d-flex justify-content-end">

                <button
                    type="button"
                    className="btn me-2 text-white card-custom-button"
                    onClick={() =>
                        actions.setWishlist(item.primary_isbn13, item.book_image, item.title, item.author)
                    }
                >
                    {store.wishlist.some((wishlistItem) => wishlistItem.primary_isbn13 === item.primary_isbn13) ? (
                        <i className="fas fa-heart"></i>
                    ) : (
                        <i className="far fa-heart"></i>
                    )}
                </button>
                <button
                    type="button"
                    className="btn text-white card-custom-button"
                    onClick={() =>
                        actions.setCheckout(item.primary_isbn13, item.book_image, item.title, item.author, item.price)
                    }
                >
                    {store.checkout.some((checkoutItem) => checkoutItem.primary_isbn13 === item.primary_isbn13) ? (
                        <i className="bi bi-cart-fill"></i>
                    ) : (
                        <i className="bi bi-cart"></i>
                    )}
                </button>

            </div>
        </div>
    );
};

