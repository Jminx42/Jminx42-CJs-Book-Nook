
import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/home.css";
import CartCard from "./cartCard";



export const HomeCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showCartModal, setShowCartModal] = useState(false);

    const handleAddToWishlist = () => {
        if (sessionStorage.getItem("token") && store.user) {
            actions.postWishlist(item.id);
        } else {
            actions.createAlertMsg("Please log in to add to your wishlist.");
            navigate("/login");

        }
    };

    //yes this function is repeated... need to think a bit longer about how to handle it better
    const handleAddToCart = () => {
        if (sessionStorage.getItem("token") && store.user) {
            setShowCartModal(true);
        } else {
            actions.createAlertMsg("Please log in to add to your cart.");
            navigate("/login");

        }
    };



    return (
        <div className="card d-flex flex-column m-2 p-0" style={{ width: "18rem" }}>

            <div className="card-body-custom flex-grow-1">
                {item.book_cover == null || item.book_cover == "" ? (

                    <div className="image-container" style={{ height: "320px", overflow: "hidden" }}>
                        <Link to={`/book/${item.isbn}`}>
                            <img src={item.book_cover_b} className="card-img-top w-100 h-100" alt="Book Cover" />
                        </Link>
                        <button
                            type="button"
                            className="btn position-absolute top-0 start-0 bg-blue border-0 text-white dark-button rounded-circle mt-2 ms-2"
                            onClick={handleAddToWishlist}
                            style={{ zIndex: 1 }}
                        >
                            {store.user.wishlist.some((wishlistItem) => wishlistItem.book_id.id === item.id) ? (
                                <i className="fas fa-heart"></i>
                            ) : (
                                <i className="far fa-heart"></i>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="image-container" style={{ height: "320px", overflow: "hidden", position: "relative" }}>
                        <Link to={`/book/${item.isbn}`}>
                            <img src={item.book_cover} className="card-img-top w-100 h-100" alt="Book Cover" />
                        </Link>
                        <button
                            type="button"
                            className="btn position-absolute top-0 start-0 bg-blue border-0 text-white dark-button rounded-circle mt-2 ms-2"
                            onClick={handleAddToWishlist}
                            style={{ zIndex: 1 }}
                        >
                            {store.user.wishlist.some((wishlistItem) => wishlistItem.book_id.id === item.id) ? (
                                <i className="fas fa-heart"></i>
                            ) : (
                                <i className="far fa-heart"></i>
                            )}
                        </button>
                    </div>
                )}


                <div className="card-body">
                    <Link to={`/book/${item.isbn}`} className="link-like">
                        <div className="row  d-flex flex-grow-1">
                            <h5 className="card-title">{item.title}</h5>
                        </div>
                        <div className="row align-items-end">

                            <p className="card-text">{item.author}</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="card-footer bg-white border-0 d-flex justify-content-center">

                <button type="button"
                    className="btn text-white dark-button"
                    onClick={handleAddToCart}
                >
                    Quick Add <i className="bi bi-cart"></i>
                </button>
                {
                    showCartModal &&
                    <CartCard item={item} setShowModal={setShowCartModal} />
                }

            </div>
        </div>
    );
};

