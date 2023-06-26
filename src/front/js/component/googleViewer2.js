import React, { useEffect, useState, useRef } from "react";
// Not using this one
export const GoogleViewer2 = ({ isbn }) => {
    const [loaded, setLoaded] = useState(false);
    const canvasRef = useRef();
    const [alert, setAlert] = useState("");

    useEffect(() => {
        function alertNotFound() {
            setAlert("Could not embed the book!");
        }

        const scriptTag = document.createElement("script");
        scriptTag.src = "https://www.google.com/books/jsapi.js";
        scriptTag.addEventListener("load", () => setLoaded(true));
        scriptTag.id = "google-script";
        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    useEffect(() => {
        if (loaded) {
            if (window.viewer) {
                const viewer = new window.google.books.DefaultViewer(canvasRef.current);
                viewer.load("ISBN:" + isbn, alertNotFound());
            } else {
                window.google.books.load();
                window.google.books.setOnLoadCallback(() => {
                    const viewer = new window.google.books.DefaultViewer(canvasRef.current);
                    window.viewer = viewer;
                    viewer.load("ISBN:" + isbn, alertNotFound());
                });
            }
        }
    }, [loaded, isbn]);

    return (
        <div>
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
            {loaded ? (
                <div>
                    <div ref={canvasRef} id="viewerCanvas"></div>
                </div>
            ) : (
                "Script not loaded"
            )}
        </div>
    );
};

export default GoogleViewer2;