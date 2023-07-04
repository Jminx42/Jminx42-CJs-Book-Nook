import React, { useState, useEffect, useContext } from "react";
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/cjbooknookwhitesmall.png";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";

import { Footer } from "../component/footer";
import { HomeCard } from "../component/homeCard";

// npm install -D tailwindcss postcss autoprefixer

export const Landing = () => {

    return (
        <div>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center landing-background">
                <div className="col-md-6 p-lg-5 mx-auto my-5">
                    <h1 className="display-3 fw-bold text-white">CJs Book Nook</h1>
                    <h3 className="fw-normal text-white mb-3">Designed for Book Lovers</h3>
                    <div className="d-flex gap-3 justify-content-center lead fw-normal">
                        <a className="icon-link" href="#">
                            Learn more

                        </a>
                        <a className="icon-link" href="#">
                            Buy

                        </a>
                        <img src={CJBookNookLogo} height={200} alt="CJBookNookLogo" className="text-center" />
                    </div>
                </div>
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>
            <div className="container landing-background text-white">

                <h2 className="text-center">Explore, Immerse, and Discover Endless Pages of Delight at CJ's Book Nook</h2>
                <img src={CJBookNookLogo} height={200} alt="CJBookNookLogo" className="text-center" />
                <Link to="/">
                    <button className="btn link-like">Start Exploring</button>
                </Link>


            </div>
            <div className="text-center mt-5 mb-5">
                <p className="">Discover a world of books at CJ's Book Nook. Dive into captivating stories, explore new genres, and embark on literary adventures.</p>
            </div>
            <div className="container mt-5 mb-5">
                <div className="row d-flex">
                    <div className="col-4">
                        <i className="fas fa-book feature-icon"></i>
                        <h3 className="feature-title">Vast Book Collection</h3>
                        <p className="feature-description">Browse through our extensive collection of books, including bestsellers, classics, and hidden gems.</p>
                    </div>
                    <div className="col-4">
                        <i className="fa-regular fa-keyboard"></i>
                        <h3 className="feature-title">Become a Reviewer</h3>
                        <p className="feature-description">Find your perfect read and leave your own review.</p>
                    </div>
                    <div className="col-4">
                        <i className="fa-regular fa-newspaper"></i>
                        <h3 className="feature-title">Reviews by NYT</h3>
                        <p className="feature-description">Read the reviews from our team of passionate readers and literary experts.</p>
                    </div>
                </div>
            </div>






            <Footer />
        </div>
    )
};