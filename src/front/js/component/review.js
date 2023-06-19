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
        actions.getOneBook(item.book_id.isbn)

    }, [editReview])

    const handleEditReview = async () => {
        await actions.getOneBook(item.book_id.isbn)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4 col-md-3 col-lg-3">
                    <Link to={`/book/${item.book_id.isbn}`}>
                        <img src={item.book_id.book_cover} className="card-img-top" alt="..." />
                    </Link>
                </div>
                <div className="col-sm-6 col-md-9 col-lg-9">
                    <h4 className="text-start">{item.book_id.title}</h4>
                    <h5 className="text-start">by {item.book_id.author}</h5>
                    <p className="text-start mb-0">Posted on {item.created_at}</p>
                    {!editClicked ?
                        <button className="btn btn-primary" onClick={() => setEditClicked(true)}>Edit</button>
                        :
                        <button className="btn btn-secondary" onClick={() => {
                            setEditClicked(false)
                            actions.editReview(item.book_id, editReview.review, editReview.rating)
                            handleEditReview()
                        }}>Save</button>}

                    <p className="text-start mb-0">Rating: </p>
                    {!editClicked ? (
                        <p>{item.rating}</p>
                    ) : (
                        <input
                            className="form-control"
                            id="rating"
                            aria-describedby="rating"
                            value={editReview.rating}
                            onChange={(e) => setEditReview({ ...editReview, rating: e.target.value })}
                        />
                    )}

                    <p className="text-start">Review: </p>
                    {!editClicked ? (
                        <p>{item.review}</p>
                    ) : (
                        <input
                            className="form-control"
                            id="rating"
                            aria-describedby="rating"
                            value={editReview.review}
                            onChange={(e) => setEditReview({ ...editReview, review: e.target.value })}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Review;
