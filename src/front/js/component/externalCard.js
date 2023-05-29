import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
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

        <div className="card mx-2" style={{ width: "18rem" }}>
            <img src={item.book_image} className="card-img-top" alt="..." />
            <div className="card-body" style={{ height: "250px", position: "relative" }}>

                <h5 className="card-text text-start">Title: {item.title}</h5>
                <p className="card-text text-start">Author: {item.author}</p>
                <p className="card-text text-start">Price: {item.price}</p>

                <div className="d-flex justify-content-evenly" style={{ position: "absolute", bottom: "10px", right: "5px", width: "100%" }}>
                    <button className="btn btn-white" onClick={() => {
                        // actions.setFavorites(item.name)
                        // toggleHeart()
                    }}>
                        {/* <FontAwesomeIcon icon={heartIcon} /> */}
                    </button>
                    <Link to={`/book/${item.amazon_product_url
                        }`}>
                        <button className="btn btn-primary">Read More</button>
                    </Link>
                </div>

            </div>
        </div>
    )
        ;
}

export default ExternalCard