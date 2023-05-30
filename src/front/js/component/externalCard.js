import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/externalCard.css"
// import { library, config } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

// Add the required icons to the library
// library.add(regularHeart, solidHeart);

import "../../styles/home.css";

export const ExternalCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    // const [hearted, setHearted] = useState(false)
    // const heartIcon = hearted ? solidHeart : regularHeart;
    // const toggleHeart = () => {
    //     const newHearted = !hearted
    //     setHearted(newHearted);
    //     // if(store.favorites.includes(item.name)) {
    //     //     store.favorites.filter((oldFav) => oldFav !== item.name);
    //     // } else {
    //         actions.setFavorites(item.name, newHearted)
    //     // }
    // }


    // useEffect (() => {
    //     if(store.favorites.includes(item.name)) {
    //         setHearted(true)
    //     } else {
    //         setHearted (false)
    //     }
    // }, [store.favorites])



    return (

        <div className="card mx-2 mb-2 p-0" style={{ width: "18rem" }}>
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
                    <p className="card-text">Price: {item.price}</p>
                </div>


                {/* <div className="d-flex justify-content-evenly"> */}
                {/* Add your favorite/heart icon here */}
                {/* <button className="btn btn-white" >*/}
                {/* <FontAwesomeIcon icon={heartIcon} /> */}
                {/*</button> */}

                {/* </div> */}
            </div>
            <div className="card-footer">
                <Link to={`/book/${item.primary_isbn13}`}>
                    <button className="btn btn-secondary card-custom-button me-2">Read More</button>
                </Link>
                <button className="btn btn-secondary card-custom-button">Add to Wishlist</button>
            </div>
        </div>
    )
        ;
}

export default ExternalCard