
import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/home.css";



export const HomeCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const price = item.weeks_on_list ? store.price : "Free";

    const [loggedIn, setLoggedIn] = useState(true);
    const modal = useRef();

    useEffect(() => {
        actions.setPrice(item.weeks_on_list);
        console.log(store.user.wishlist)

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

                    className="btn me-2 text-white custom-button"

                    onClick={(e) => {
                        sessionStorage.getItem("token") && loggedIn
                            ?
                            actions.postWishlist(item.id)
                            :
                            setLoggedIn(false)
                        // this is request that the user login
                        // e.target.setAttribute("data-bs-toggle", "modal") 
                        // e.target.setAttribute("data-bs-target", "#exampleModal")
                    }

                    }
                >
                    {store.user.wishlist.some((wishlistItem) => wishlistItem.book_id.id === item.id) ? (
                        <i className="fas fa-heart"></i>
                    ) : (

                        <i className="far fa-heart"></i>
                    )}
                </button>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn text-white custom-button"

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

