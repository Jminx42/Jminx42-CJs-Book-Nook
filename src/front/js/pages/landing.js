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
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center image-background d-flex">
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center landing-background d-flex">
                    <div className="col-12 col-sm-6 col-md-6 p-lg-5 my-5 ">
                        <h1 className="display-3 fw-bold landing-text">Designed for Book Lovers</h1>
                        <h3 className="fw-normal landing-text mt-3 mb-3">Discover Your Next 5-Star Read</h3>
                        <div className="d-flex gap-3 justify-content-center lead fw-normal mt-5">
                            <button className="btn landing-button px-3 py-2 fs-4" href="/">
                                Start exploring

                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 p-lg-5 my-5">
                        <img src={CJBookNookLogo} height={300} alt="CJBookNookLogo" className="text-center" />
                    </div>

                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>
            </div>

            {/* <div className="text-center mt-5 mb-5">
                <p className="">Discover a world of books at CJ's Book Nook. Dive into captivating stories, explore new genres, and embark on literary adventures.</p>
            </div> */}
            <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 p-3 position-relative">
                        <h3 className="feature-title">Vast Book Collection</h3>
                        <p className="feature-description">Browse through our extensive collection of books, including bestsellers, classics, and hidden gems.</p>
                        <div className="divider"></div>
                    </div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 p-3 position-relative">
                        <h3 className="feature-title">Become a Reviewer</h3>
                        <p className="feature-description">Want to indulge in a world of literary delights? Embark on this journey to find your perfect read and share your review.</p>
                        <div className="divider"></div>
                    </div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 p-3">
                        <h3 className="feature-title">Reviews by NYT</h3>
                        <p className="feature-description">Uncover the expertise and discernment of NYT's esteemed reviewers, and let their analysis guide your next read.</p>
                    </div>
                </div>
            </div>

            <div className="container mt-5 mb-5">

                Editor's Pick!
            </div>






            <Footer />
        </div>
    )
};