import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

export const GoogleBooksViewer = ({ isbn }) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/books/jsapi.js";
    script.async = true;
    script.onload = () => {
      google.books.load({ "language": "en" });
      google.books.setOnLoadCallback(initialize);
    };
    document.head.appendChild(script);

    function initialize() {
      const viewer = new google.books.DefaultViewer(document.getElementById("viewerCanvas"));
      viewer.load("ISBN:" + isbn);
    }

  }, []);

  return (
    <div className="d-flex justify-content-end mt-4 mb-4">
      <div id="viewerCanvas" style={{ width: "800px", height: "500px" }}></div>
      <Helmet>
        <script type="text/javascript" src="https://www.google.com/books/jsapi.js" />
      </Helmet>
    </div>
  );
}

export default GoogleBooksViewer