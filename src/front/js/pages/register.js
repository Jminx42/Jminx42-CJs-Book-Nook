import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogoSmall.png";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFull_name] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {

    }, [])

    const registerUser = async () => {
        const opts = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                full_name: full_name
            })
        };
        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/create/user', opts)
            if (resp.status !== 200) {
                const data = await resp.json()
                alert(data.error);//show another kind of message instead of the alert
                return false;
            } else {
                alert("Your registration was successfull")
                navigate("/login")
                sessionStorage.removeItem("token");
                return true
            };


        }
        catch (error) {
            console.error("There has been an error registering")
        }

    }
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        if (!isChecked) {
            alert('Please check the box to proceed.');
            return;
        } else {
            registerUser();
        }

    }
    return (

        <div>
            <div className="container md-w-50 bg-light">
                <div className="d-flex flex-column my-5 align-items-center">
                    {/* add validation form from bootstrap?? */}
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <form>
                        <div className="col-md-6 my-2">
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                                aria-label="Email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required />
                        </div>

                        <div className="col-md-6 my-2">
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required />
                        </div>

                        <div className="col-md-6 my-2">
                            <input
                                type="text"
                                className="form-control"
                                id="inputFullname"
                                placeholder="Full name"
                                aria-label="Full name"
                                value={full_name}
                                onChange={(e) => { setFull_name(e.target.value) }}
                                required />
                        </div>

                        <div className="form-check col-md-6">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                required
                            />
                            <label className="form-check-label py-0" htmlFor="gridCheck">
                                I declare that I have read and accept the
                                <sup>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        terms and conditions of sale and the privacy policy
                                    </button>
                                </sup>
                                from CJ's Book Nook.
                            </label>
                        </div>
                        <div className="col-md-6 ms-auto">
                            <button type="submit" className="btn btn-primary" onClick={handleRegisterSubmit}>Register!</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* modal for terms and conditions */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="exampleModalLabel">Terms and Conditions of Sale for CJ's Book Nook:</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>General Information:</h5>
                            <ol>
                                <li>CJ's Book Nook operates as an online bookshop and provides a platform for users to purchase books.</li>
                                <li>By accessing or using our website, you agree to be bound by these terms and conditions.</li>
                            </ol>


                            <h5>Product Information: </h5>
                            a. CJ's Book Nook endeavors to provide accurate information regarding book descriptions, prices, and availability.
                            b. We reserve the right to modify or discontinue any product without prior notice.
                            c. The images and illustrations on our website are for representation purposes and may not always reflect the exact appearance of the product.
                            <h5>Pricing and Payment:</h5>
                            a. All prices listed on CJ's Book Nook are in the applicable currency and inclusive of any applicable taxes.
                            b. We accept various payment methods, including credit cards, debit cards, and electronic funds transfer.
                            c. Payment is required at the time of placing the order.
                            <h5>Shipping and Delivery:</h5>
                            a. CJ's Book Nook offers shipping services to specified locations.
                            b. The estimated delivery time will be provided during the checkout process, and we will make reasonable efforts to meet the delivery timelines.
                            c. Any delays in delivery due to unforeseen circumstances or external factors are beyond our control, and we shall not be held liable for such delays.
                            <h5>Returns and Refunds:</h5>
                            a. We strive to ensure customer satisfaction. If you receive a damaged or incorrect book, please contact us within 7 days of delivery for assistance.
                            b. Refunds or replacements will be processed at our discretion, subject to verification of the issue.
                            <h5>Intellectual Property:</h5>
                            a. All content on the CJ's Book Nook website, including text, graphics, logos, and images, is protected by intellectual property laws.
                            b. You are not permitted to use, reproduce, or modify any of the content without our explicit consent.
                            <h5>Limitation of Liability:</h5>
                            a. CJ's Book Nook shall not be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our website or products.
                            b. We do not guarantee uninterrupted access to our website or the absence of any errors or viruses.
                            <h5>Governing Law:</h5>
                            a. These terms and conditions are governed by and construed in accordance with the laws of [Jurisdiction].
                            b. Any disputes arising from these terms and conditions shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].
                            <h4>Privacy Policy for CJ's Book Nook:</h4>
                            <h5>Information Collection:</h5>
                            a. CJ's Book Nook may collect personal information from users during the registration and checkout processes.
                            b. This information may include name, email address, shipping address, and payment details.
                            c. We may also collect non-personal information such as IP addresses, browser type, and operating system for statistical purposes.
                            <h5>Use of Information:</h5>
                            a. CJ's Book Nook uses the collected information to process orders, deliver products, and provide customer support.
                            b. We may also use the information to send promotional offers, newsletters, and updates with your consent.
                            c. Your personal information will not be sold, rented, or shared with third parties, except as necessary to fulfill your order or comply with legal requirements.
                            <h5>Security:</h5>
                            a. CJ's Book Nook employs industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.
                            b. We use secure socket layer (SSL) encryption technology for secure transmission of data.
                            <h5>Cookies:</h5>
                            a. Our website may use cookies to enhance the user experience and track usage patterns.
                            b. Cookies may be used for remembering user preferences, analyzing trends, and improving website functionality.
                            c. You have the option to disable cookies in your browser settings, but this may affect certain features of the website.
                            <h5>Third-Party Links:</h5>
                            a. CJ's Book Nook may contain links to third-party websites for your convenience.
                            b. We are not responsible for the privacy practices or content of these external websites. We encourage you to review their privacy policies.
                            <h5>Privacy of Children:</h5>
                            a. CJ's Book Nook is intended for users above the age of 13. We do not knowingly collect personal information from children.
                            b. If we become aware that personal information of a child has been collected, we will take steps to delete the information.
                            <h5>Changes to the Privacy Policy:</h5>
                            a. CJ's Book Nook reserves the right to update or modify the privacy policy at any time.
                            b. Any significant changes will be notified on our website. By continuing to use our services, you agree to the updated policy.
                            Please read the terms and conditions and privacy policy carefully before using CJ's Book Nook. By using our website, you acknowledge and agree to be bound by these policies.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};