import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css";
import "../../styles/home.css";

export const Review = ({ item }) => {
    const { store, actions } = useContext(Context);
    const [editClicked, setEditClicked] = useState(false);
    const [editReview, setEditReview] = useState({
        rating: item.rating,
        review: item.review
    });

    useEffect(() => {
        actions.clearError();
        actions.clearAlert();
    }, []);




    return (
        <div className="container">
            {
                store.alert && store.alert !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <div>
                                {store.alert}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            {
                store.errorMsg && store.errorMsg !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <div>
                                {store.errorMsg}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            <div className="row">
                <div className="col-sm-4 col-md-3 col-lg-3">
                    <Link to={`/book/${item.book_id.isbn}`}>
                        <img src={item.book_id.book_cover} className="card-img-top" alt="..." />
                    </Link>
                </div>
                <div className="col-sm-6 col-md-9 col-lg-9">
                    <h4 className="text-start">{item.book_id.title}</h4>
                    <h5 className="text-start">by {item.book_id.author}</h5>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="text-start mb-0">Posted on {item.created_at}</p>
                        {!editClicked ?
                            <button className="btn custom-button" onClick={() => setEditClicked(true)}>Edit</button>
                            :
                            <button className="btn custom-button" onClick={() => {
                                setEditClicked(false)
                                actions.editReview(item.book_id, editReview.review, editReview.rating)

                            }}>Save</button>}
                    </div>

                    <div className="d-flex align-items-center"> {/* Wrap label and input in a flex container */}
                        <label className="text-start mb-1">Rating:&nbsp; </label>
                        {!editClicked ? (
                            <p className="mb-1"> {item.rating}</p>
                        ) : (
                            <input
                                className="form-control p-0 mb-1"
                                id="rating"
                                aria-describedby="rating"
                                defaultValue={editReview.rating}
                                onChange={(e) => setEditReview({ ...editReview, rating: e.target.value })}
                            />
                        )}
                    </div>
                    <div className="d-flex align-items-center"> {/* Wrap label and input in a flex container */}
                        <label className="text-start mb-1">Review:&nbsp;</label>
                        {!editClicked ? (
                            <p className="mb-1">{item.review}</p>
                        ) : (
                            <input
                                className="form-control p-0 mb-1"
                                id="review"
                                aria-describedby="review"
                                defaultValue={editReview.review}
                                onChange={(e) => setEditReview({ ...editReview, review: e.target.value })}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
