import React, { useEffect, useState, useRef } from "react";
// Not using this one
export const GoogleViewer2 = ({ isbn }) => {
    const [loaded, setLoaded] = useState(false);
    const canvasRef = useRef();

    useEffect(() => {
        function alertNotFound() {
            alert("Could not embed the book!");
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