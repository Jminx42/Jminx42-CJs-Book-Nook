import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import { Card } from "../component/card";
import { Review } from "../component/review";

import { TransactionCard } from "../component/transactionCard";

import { Context } from "../store/appContext";
import { InputProfilePic } from "../component/inputProfilePic";
import { SupportCard } from "../component/supportCard";


export const PersonalInformation = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.user);
    const [editClicked, setEditClicked] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState('personal')


    useEffect(() => {
        setUser(store.user)

    }, [store.user]);

    const handleSave = async () => {
        setEditClicked(false);

        const response = await fetch(process.env.BACKEND_URL + 'api/user/update', {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            await actions.validate_user()
            setAlert("Profile successfully updated");
        } else {
            const data = await response.json()
            setError(data.error)
        }
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        getUserReviews()
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

        setActiveTab(params)
    }, []);

    const isMobile = windowWidth <= 768;

    useEffect(() => {
        getUserReviews();
    }, []);

    const getUserReviews = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "api/user_reviews", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews);
                console.log(data.reviews)
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="d-flex">
                {!isMobile ?
                    (<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '15rem' }}>

                        <p className="fs-4 legal-title">Profile</p>

                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto ">
                            <li className="nav-item">
                                <Link to={`/personalInformation`}>
                                    <button
                                        className="nav-link btn w-100 text-start"

                                    >
                                        <i className="fa-solid fa-user"></i> Personal Information
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/wishlist`}>
                                    <button
                                        className="nav-link btn w-100 text-start"
                                    >
                                        <i className="fa-solid fa-heart"></i> Wishlist
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/profileReviews`}>
                                    <button
                                        className="nav-link btn w-100 text-start"
                                    >
                                        <i className="fa-regular fa-keyboard"></i> My Reviews
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/personalInformation`}>
                                    <button
                                        className="nav-link btn w-100 text-start"
                                    >
                                        <i className="fa-regular fa-calendar-days"></i> Purchase History
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/personalInformation`}>
                                    <button
                                        className="nav-link btn w-100 text-start"
                                    >
                                        <i className="fa-solid fa-envelope"></i> Support
                                    </button>
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>) :
                    (
                        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: "3rem" }}>
                            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                                <li className="nav-item">
                                    <Link to={`/personalInformation`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Personal" data-bs-original-title="Personal">
                                            <i className="fa-solid fa-user"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/wishlist`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Reviews" data-bs-original-title="Reviews">
                                            <i className="fa-solid fa-heart"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/profileReviews`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Reviews" data-bs-original-title="Reviews">
                                            <i className="fa-regular fa-keyboard"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/personalInformation`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Purchase History" data-bs-original-title="Purchase History">
                                            <i className="fa-regular fa-calendar-days"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/personalInformation`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Support" data-bs-original-title="Support">
                                            <i className="fa-solid fa-envelope"></i>
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                {/* Creating the different tabs: */}
                <div className="flex-grow-1 m-0">
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
                    {
                        error && error !== ""
                            ?
                            <div className="container">
                                <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill"></i>
                                    <div>
                                        {error}
                                    </div>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                            :
                            null

                    }

                    {/* Adding content to each tab: */}
                    <div className={`tab-content ${isMobile ? 'mt-0' : 'profile-container'}`} >
                        <div className="" aria-labelledby="personal-tab">
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col-3">
                                        {!editClicked ? (
                                            !user.profile_picture
                                                ?
                                                <img
                                                    src="https://www.pngmart.com/files/10/User-Account-Person-PNG-Transparent-Image.png"
                                                    className="card-img-top"
                                                    alt="Profile Picture"
                                                    style={{ width: "200px" }} />
                                                :
                                                <img
                                                    src={user.profile_picture}
                                                    className="card-img-top"
                                                    id="profile-picture"
                                                    alt="Profile Picture"
                                                />
                                        ) : (
                                            <div>
                                                <InputProfilePic />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-9">
                                        <label className="">Email: </label>
                                        <p> {user.email}</p>

                                        <label className="text-start">Name: </label>
                                        {!editClicked ? (
                                            <p> {user.full_name}</p>
                                        ) : (
                                            <input
                                                className="form-control"
                                                id="full_name"
                                                aria-describedby="full_name"
                                                value={user.full_name}
                                                onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                                            />
                                        )}


                                        <label className="text-start">Password: </label>
                                        {!editClicked ? (
                                            <p>{user.password}***</p>
                                        ) : (
                                            <input
                                                className="form-control"
                                                id="password"
                                                aria-describedby="password"
                                                value={user.password || ""}
                                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            />
                                        )}

                                        <label className="text-start">Shipping Address: </label>
                                        {!editClicked ? (

                                            <p>{user.address}</p>
                                        ) : (
                                            <input
                                                className="form-control"
                                                id="address"
                                                aria-describedby="address"
                                                value={user.address || ""}
                                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                                            />
                                        )}

                                        <label className="text-start">Billing Address: </label>
                                        {!editClicked ? (

                                            <p>{user.billing_address}</p>
                                        ) : (
                                            <input
                                                className="form-control"
                                                id="billing_address"
                                                aria-describedby="billing_address"
                                                value={user.billing_address || ""}
                                                onChange={(e) => setUser({ ...user, billing_address: e.target.value })}
                                            />
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        {!editClicked ? (

                                            <button className="btn btn-secondary custom-button" onClick={() => setEditClicked(true)}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>

                                        ) : (
                                            <div className="d-flex">
                                                <button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
                                                    Save
                                                </button>
                                                <button className="btn btn-secondary " onClick={() => setEditClicked(false)}>
                                                    Close
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
