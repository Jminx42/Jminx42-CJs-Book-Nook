import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Landing } from "./pages/landing";
import { Explore } from "./pages/explore";
import { Profile } from "./pages/profile";
import { BookPage } from "./pages/bookPage";
import { Register } from "./pages/register";
import { Login } from "./pages/login.js";
import { Support } from "./pages/support.js";
import { GooglePreview } from "./pages/googlePreview.js";
import { Checkout } from "./pages/checkout";
import { ConfirmDetails } from "./pages/confirmDetails";
import { OrderSummary } from "./pages/orderSummary";
import { LegalNotice } from "./pages/legalNotice";
import { DataProtection } from "./pages/dataProtection";
import { PersonalInformation } from "./pages/personalInformation";
import { Wishlist } from "./pages/wishlist";
import { ProfileReviews } from "./pages/profileReviews";
import { ProfileSupport } from "./pages/profileSupport";
import { PurchaseHistory } from "./pages/purchaseHistory";
import { Success } from "./pages/success";
import { StripeCheckout } from "./pages/stripeCheckout";

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
                        <Route element={<Explore />} path="/explore" />
                        <Route element={<Landing />} path="/" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<PersonalInformation />} path="/personalInformation" />
                        <Route element={<Wishlist />} path="/wishlist" />
                        <Route element={<ProfileReviews />} path="/profileReviews" />
                        <Route element={<PurchaseHistory />} path="/purchaseHistory" />
                        <Route element={<ProfileSupport />} path="/profileSupport" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Support />} path="/support" />
                        <Route element={<LegalNotice />} path="/legalNotice" />
                        <Route element={<DataProtection />} path="/dataProtection" />
                        <Route element={<StripeCheckout />} path="/stripeCheckout" />
                        <Route element={<GooglePreview />} path="/googlePreview/:theisbn" />
                        <Route element={<Checkout />} path="/checkout" />
                        <Route element={<ConfirmDetails />} path="/confirmDetails" />
                        <Route element={<OrderSummary />} path="/orderSummary" />
                        <Route element={<Success />} path="/success" />
                        <Route element={<BookPage />} path="/book/:theisbn" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>

                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
