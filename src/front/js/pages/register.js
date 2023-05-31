import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/register.css"

import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookLogoSmall.png";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFull_name] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

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

        <div className="Auth-form container p-5">
            {!isChecked &&
                <div class="alert alert-danger" role="alert">
                    Please check the box to proceed.
                </div>

            }
            {
                <div class="alert alert-primary" role="alert">
                    Your registration has been successfull!
                </div>
            }

            <div className="card p-5">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title text-center">Sign Up</h3>
                        <div className="text-center">
                            Already registered?{" "}
                            <Link to="/login">
                                <span className="link-primary">
                                    Login
                                </span>
                            </Link>
                        </div>
                        <div className="form-group mt-3">
                            <label>Full Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Jane Doe"
                                aria-label="Full name"
                                value={full_name}
                                onChange={(e) => { setFull_name(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                                aria-label="Email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="form-check col-md-6 mt-3">
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
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-secondary register-custom-button" onClick={handleRegisterSubmit}>
                                Submit
                            </button>
                        </div>

                    </div>
                </form>
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
                            <ol>
                                <li>CJ's Book Nook endeavors to provide accurate information regarding book descriptions, prices, and availability.</li>
                                <li>We reserve the right to modify or discontinue any product without prior notice.</li>
                                <li>The images and illustrations on our website are for representation purposes and may not always reflect the exact appearance of the product.</li>
                            </ol>

                            <h5>Pricing and Payment:</h5>
                            <ol>
                                <li>All prices listed on CJ's Book Nook are in the applicable currency and inclusive of any applicable taxes.</li>
                                <li>We accept various payment methods, including credit cards, debit cards, and electronic funds transfer.</li>
                                <li>Payment is required at the time of placing the order.</li>
                            </ol>

                            <h5>Shipping and Delivery:</h5>
                            <ol>
                                <li>CJ's Book Nook offers shipping services to specified locations.</li>
                                <li>The estimated delivery time will be provided during the checkout process, and we will make reasonable efforts to meet the delivery timelines.</li>
                                <li>Any delays in delivery due to unforeseen circumstances or external factors are beyond our control, and we shall not be held liable for such delays.</li>
                            </ol>

                            <h5>Returns and Refunds:</h5>
                            <ol>
                                <li>We strive to ensure customer satisfaction. If you receive a damaged or incorrect book, please contact us within 7 days of delivery for assistance.</li>
                                <li>Refunds or replacements will be processed at our discretion, subject to verification of the issue.</li>
                            </ol>

                            <h5>Intellectual Property:</h5>
                            <ol>
                                <li>All content on the CJ's Book Nook website, including text, graphics, logos, and images, is protected by intellectual property laws.</li>
                                <li>You are not permitted to use, reproduce, or modify any of the content without our explicit consent.</li>
                            </ol>

                            <h5>Limitation of Liability:</h5>
                            <ol>
                                <li>CJ's Book Nook shall not be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our website or products.</li>
                                <li>We do not guarantee uninterrupted access to our website or the absence of any errors or viruses.</li>
                            </ol>

                            <h5>Governing Law:</h5>
                            <ol>
                                <li>These terms and conditions are governed by and construed in accordance with the laws of [Jurisdiction].</li>
                                <li>Any disputes arising from these terms and conditions shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].</li>
                            </ol>

                            <h4>Privacy Policy for CJ's Book Nook:</h4>
                            <h5>Information Collection:</h5>
                            <ol>
                                <li>CJ's Book Nook may collect personal information from users during the registration and checkout processes.</li>
                                <li>This information may include name, email address, shipping address, and payment details.</li>
                                <li>We may also collect non-personal information such as IP addresses, browser type, and operating system for statistical purposes.</li>
                            </ol>

                            <h5>Use of Information:</h5>
                            <ol>
                                <li>CJ's Book Nook uses the collected information to process orders, deliver products, and provide customer support.</li>
                                <li>We may also use the information to send promotional offers, newsletters, and updates with your consent.</li>
                                <li>Your personal information will not be sold, rented, or shared with third parties, except as necessary to fulfill your order or comply with legal requirements.</li>
                            </ol>

                            <h5>Security:</h5>
                            <ol>
                                <li>CJ's Book Nook employs industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.</li>
                                <li>We use secure socket layer (SSL) encryption technology for secure transmission of data.</li>
                            </ol>

                            <h5>Cookies:</h5>
                            <ol>
                                <li>Our website may use cookies to enhance the user experience and track usage patterns.</li>
                                <li>Cookies may be used for remembering user preferences, analyzing trends, and improving website functionality.</li>
                                <li>You have the option to disable cookies in your browser settings, but this may affect certain features of the website.</li>
                            </ol>

                            <h5>Third-Party Links:</h5>
                            <ol>
                                <li>CJ's Book Nook may contain links to third-party websites for your convenience.</li>
                                <li>We are not responsible for the privacy practices or content of these external websites. We encourage you to review their privacy policies.</li>
                            </ol>

                            <h5>Privacy of Children:</h5>
                            <ol>
                                <li>CJ's Book Nook is intended for users above the age of 13. We do not knowingly collect personal information from children.</li>
                                <li>If we become aware that personal information of a child has been collected, we will take steps to delete the information.</li>
                            </ol>

                            <h5>Changes to the Privacy Policy:</h5>
                            <ol>
                                <li>CJ's Book Nook reserves the right to update or modify the privacy policy at any time.</li>
                                <li>Any significant changes will be notified on our website. By continuing to use our services, you agree to the updated policy.</li>
                            </ol>

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