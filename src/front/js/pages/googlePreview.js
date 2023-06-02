import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { GoogleBooksViewer } from "../component/googleBooksViewer";
import { Card } from "../component/card";

export const GooglePreview = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);


    return (
        <div>
            <Navbar />
            <div className="container mt-4">

                <h1>Welcome to Preview</h1>
                <div className="row d-flex justify-content-center">
                    <GoogleBooksViewer isbn={params.theisbn} />
                </div>



            </div>
        </div>
    );
}