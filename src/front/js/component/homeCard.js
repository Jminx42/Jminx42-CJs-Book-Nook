import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/homeCard.css";
import "../../styles/home.css";
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogo.png";

export const HomeCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const price = item.weeks_on_list ? store.price : "Free";

    useEffect(() => {
        actions.setPrice(item.weeks_on_list);
    }, [item.weeks_on_list]);

    return (
        <div className="card d-flex flex-column m-2 p-0" style={{ width: "18rem" }}>
            <Link to={`/book/${item.isbn}`} className="card-body-custom flex-grow-1">
                {item.book_cover == null || item.book_cover == ""
                    ?
                    <div className="image-container" style={{ height: "320px", overflow: "hidden" }}>
                        <img src={item.book_cover_b} className="card-img-top w-100 h-100" alt="Book Cover" />
                    </div>
                    :
                    <div className="image-container" style={{ height: "320px", overflow: "hidden" }}>
                        <img src={item.book_cover} className="card-img-top w-100 h-100" alt="Book Cover" />
                    </div>
                }

                <div className="card-body text-start">

                    <div className="row">
                        <h5 className="card-title">{item.title}</h5>
                    </div>
                    <div className="row">
                        <p className="card-text">{item.author}</p>
                    </div>


                </div>
            </Link>
            <div className="card-footer d-flex justify-content-end">

                <button
                    type="button"
                    className="btn me-2 text-white card-custom-button"
                    onClick={() =>
                        actions.setWishlist(item.isbn, item.book_cover, item.title, item.author)
                    }
                >
                    {store.wishlist.some((wishlistItem) => wishlistItem.isbn === item.isbn) ? (
                        <i className="fas fa-heart"></i>
                    ) : (
                        <i className="far fa-heart"></i>
                    )}
                </button>
                <button
                    type="button"
                    className="btn text-white card-custom-button"
                    onClick={() =>
                        actions.setCheckout(item.isbn, item.book_cover, item.title, item.author)
                    }
                >
                    {store.checkout.some((checkoutItem) => checkoutItem.isbn === item.isbn) ? (
                        <i className="bi bi-cart-fill"></i>
                    ) : (
                        <i className="bi bi-cart"></i>
                    )}
                </button>

            </div>
        </div>
    );
};

