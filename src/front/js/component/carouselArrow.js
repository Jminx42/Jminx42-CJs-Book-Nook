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
            style={{ ...style, display: "block", color: "#0c6e68", font: "30px" }}
            onClick={onClick}
        />
    );
}

export default CarouselArrow