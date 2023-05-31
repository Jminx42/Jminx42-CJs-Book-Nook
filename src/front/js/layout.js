import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";


import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { Book } from "./pages/book";
import { Register } from "./pages/register";
import { Login } from "./pages/login.js";
import { Wishlist } from "./pages/wishlist.js";



import injectContext from "./store/appContext";


import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <div>no backend</div>;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>

                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Profile />} path="/profile" />

                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Wishlist />} path="/wishlist" />


                        <Route element={<Book />} path="/book/:theisbn" />

                        {/* <Route element={<Book />} path="/book/:theid" /> */}

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>

                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
