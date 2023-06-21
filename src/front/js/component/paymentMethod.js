import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css"
import "../../styles/home.css";

export const PaymentMethod = () => {
    const { store, actions } = useContext(Context);



    return (

        <div className="card mx-2 border-0" style={{ width: "18rem" }}>

            <div className="card-body" >
                <h5 className="card-title">Saved Payment Method(s)</h5>
                <div>Card type:</div>
                <div>{ }</div>

                <div>Card Number:</div>
                <div>{ }</div>

                <div>CVC: </div>
                <div>{ }</div>

                <div>Card Name:</div>
                <div>{ }</div>

                <div>Expiry Date:</div>
                <div>{ }</div>
            </div>
        </div>
    );
}

