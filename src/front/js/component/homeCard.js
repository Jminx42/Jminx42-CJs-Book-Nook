
import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/home.css";
import CartCard from "./cartCard";



export const HomeCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const price = item.weeks_on_list ? store.price : "Free";
    const navigate = useNavigate();
    const [showCartModal, setShowCartModal] = useState(false);
    const [alert, setAlert] = useState("");


    const handleAddToWishlist = () => {
        if (sessionStorage.getItem("token") && store.user) {
            actions.postWishlist(item.id);
        } else {
            setAlert("Please log in to add to your wishlist.");
            navigate("/login");

        }
    };

    //yes this function is repeated... need to think a bit longer about how to handle it better
    const handleAddToCart = () => {
        if (sessionStorage.getItem("token") && store.user) {
            setShowCartModal(true);
        } else {
            setAlert("Please log in to add to your cart.");
            navigate("/login");

        }
    };



    return (
        <div className="card d-flex flex-column m-2 p-0" style={{ width: "18rem" }}>
            {
                alert && alert !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <div>
                                {alert}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
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


                <div className="card-body">

                    <div className="row  d-flex flex-grow-1">
                        <h5 className="card-title">{item.title}</h5>
                    </div>
                    <div className="row align-items-end">

                        <p className="card-text">{item.author}</p>
                    </div>


                </div>
            </Link>
            <div className="card-footer d-flex justify-content-end">

                <button
                    type="button"
                    className="btn me-2 text-white dark-button"
                    onClick={handleAddToWishlist}
                >
                    {store.user.wishlist.some((wishlistItem) => wishlistItem.book_id.id === item.id) ? (
                        <i className="fas fa-heart"></i>
                    ) : (
                        <i className="far fa-heart"></i>
                    )}
                </button>



                <button type="button"
                    className="btn text-white dark-button"
                    onClick={handleAddToCart}
                >
                    <i className="bi bi-cart"></i>
                </button>
                {
                    showCartModal &&
                    <CartCard item={item} setShowModal={setShowCartModal} />
                }

            </div>
        </div>
    );
};

