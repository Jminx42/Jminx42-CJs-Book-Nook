import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";


export const Wishlist = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            Welcome to your wishlist
            This is your first book: {sessionStorage.getItem("wishlist")}
        </div>
    );
}