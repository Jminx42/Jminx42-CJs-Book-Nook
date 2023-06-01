import React, { useEffect, useState } from "react";


export const GoogleBooksViewer = ({ isbn }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

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
        const viewer = new window.google.books.DefaultViewer(document.getElementById("viewerCanvas"));
        viewer.load("ISBN:" + isbn);
      } else {
        window.google.books.load({ language: "en" });
        window.google.books.setOnLoadCallback(() => {
          const viewer = new window.google.books.DefaultViewer(document.getElementById("viewerCanvas"));
          window.viewer = viewer;
          viewer.load("ISBN:" + isbn);
        });
      }
    }
  }, [loaded, isbn]);


  return (
    <div className="d-flex justify-content-end mt-4 mb-4">
      <div id="viewerCanvas" style={{ width: "800px", height: "500px" }}></div>

    </div>
  );
}

export default GoogleBooksViewer