import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"


import "../../styles/home.css";

export const CarouselArrow = ({ className, style, onClick }) => {
    const { store, actions } = useContext(Context);

    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        ><i className="fa-solid fa-arrow-right fs-2 bg-dark rounded-circle text-white"></i></div>
    );
}

export default CarouselArrow