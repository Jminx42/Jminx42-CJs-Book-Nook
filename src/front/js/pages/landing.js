import React, { useState, useEffect, useContext } from "react";
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/cjbooknookwhitesmall.png";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import Slider from "react-slick";
//npm install react-slick
//npm install slick-carousel --save
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { Footer } from "../component/footer";
import { LandingCard } from "../component/landingCard";




// npm install -D tailwindcss postcss autoprefixer

export const Landing = () => {
    const { store, actions } = useContext(Context);
    const filteredBooks = store.books.filter((book) => book.average_rating > 4).slice(0, 10);

    const settings = {
        dots: true,

        infinite: true,

        slidesToShow: 5,
        slidesToScroll: 2,
        draggable: true,
        autoplay: true,
        speed: 2500,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    className: "center",
                    centerMode: true,
                    centerPadding: "60px",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    swipeToSlide: true,
                    className: "center",
                    centerMode: true,
                    centerPadding: "60px",
                }
            }
        ]
    };



    return (

        <div>
            <div className="position-relative overflow-hidden p-3 p-md-5 p-lg-5 text-center image-background d-flex">
                <div className="position-relative overflow-hidden p-3 p-md-5 p-lg-5 m-md-3 text-center landing-background d-flex">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 my-5 p-2">
                        <h1 className="display-3 fw-bold landing-text ">Designed for Book Lovers</h1>
                        <h3 className="fs-4 px-2 landing-text mt-3 mb-3">Discover Your Next 5-Star Read</h3>
                        <div className="d-flex gap-3 justify-content-center lead fw-normal pt-5 mt-xl-5">
                            <Link to={`/`}>
                                <button className="btn landing-button px-3 py-2 fs-4 mb-xl-5">
                                    Start Exploring
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 my-auto">
                        <img src={CJBookNookLogo} alt="CJBookNookLogo" className="text-center img-responsive" />
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
                <div className="row mt-5 mb-5">
                    <h3 className="feature-title">Editor's Pick!</h3>
                </div>

                <Slider {...settings}>
                    {filteredBooks.map((book) => (
                        <div key={book.id}>
                            <LandingCard item={book} />
                        </div>
                    ))}
                </Slider>

            </div>
            {/* This will only show when you are logged in and you have more than two books in wishlist!! It still need work! */}
            <div className="container mt-5 mb-5">
                <div className="row mt-5 mb-5">
                    <h3 className="feature-title">Recommended for you</h3>
                </div>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-5 justify-content-center mt-3">
                    {store.user.wishlist.length > 2 ? (
                        <>
                            {store.user.wishlist.map((wishlistItem) => {
                                const userGenres = wishlistItem.book_id.genre?.filter((genre) => genre !== null);
                                console.log(userGenres);
                                const filteredBooks = store.books
                                    .filter((book) =>
                                        book.average_rating > 4 &&
                                        book.genre &&
                                        userGenres?.some((userGenre) => book.genre.includes(userGenre))
                                    )
                                    .slice(0, 10);
                                console.log(filteredBooks)
                                return filteredBooks.map((book) => (
                                    <LandingCard key={book.id} item={book} />
                                ));
                            })}
                        </>
                    ) : (
                        <p>Add books to your wishlist first!</p>
                    )}






                </div>
            </div>






            <Footer />
        </div>
    )
};