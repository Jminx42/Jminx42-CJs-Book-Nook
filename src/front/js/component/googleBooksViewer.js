import React, { useEffect } from "react";


export const GoogleBooksViewer = ({ isbn }) => {

  useEffect(() => {

    const script = document.createElement("script");
    script.id = "preview" + isbn
    script.src = "https://www.google.com/books/jsapi.js";
    script.async = true;
    script.onload = () => {
      google.books.load({ "language": "en" });
      google.books.setOnLoadCallback(initialize);

    };
    document.body.appendChild(script);

    function initialize() {
      const viewer = new google.books.DefaultViewer(document.getElementById("viewerCanvas"));
      console.log(isbn)
      viewer.load("ISBN:" + isbn);

    }

  }, [isbn]);

  return (
    <div className="d-flex justify-content-end mt-4 mb-4">
      <div id="viewerCanvas" style={{ width: "800px", height: "500px" }}></div>

    </div>
  );
}

export default GoogleBooksViewer