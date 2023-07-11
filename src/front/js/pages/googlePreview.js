import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { GoogleBooksViewer } from "../component/googleBooksViewer";
import { Footer } from "../component/footer";

export const GooglePreview = () => {
    const params = useParams();
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h1 className="text-center">Where Magic Happens!</h1>
                <div className="row d-flex justify-content-center">
                    <GoogleBooksViewer isbn={params.theisbn} />
                </div>
            </div>
            <Footer />
        </div>
    );
}