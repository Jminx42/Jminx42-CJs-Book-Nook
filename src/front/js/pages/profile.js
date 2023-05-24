import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";

import { Context } from "../store/appContext";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState("");

	const getOneUser = async () => {
		const resp = await fetch(process.env.BACKEND_URL + 'api/user/' + store.user.id, {
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token")
			}
		})
		const data = await resp.json()
		if (resp.status == 200) {
			setUser(data.user)
		}
	}

	// console.log(getOneUser())
	useEffect(() => {
		getOneUser()
	}, []);

	const handleEdit = async () => {
		e.preventDefault(); // the event.preventDefault() slows down the PUT fetch and allows the information to reach the GET fetch. It also allow us to see the results of the console.logs below (without it it's too quick and they disappear from the console!)
		console.log(editContact);
		console.log(params.theid);

		const response = await fetch(process.env.BACKEND_URL + 'api/user/' + store.user.id, {
			method: "PUT",
			headers: {
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			body: JSON.stringify(editContact)
		})
		if (response.ok) {
			await actions.getOneUser();
			alert("Profile successfully updated");
		}
	}

	return (
		<div>
			<Navbar />
			<div className="container">
				<h1>My Profile</h1>
				<div className="card mx-2" style={{ width: "18rem" }}>
					<img src={user.profile_picture} className="card-img-top" alt="..." />
					<div className="card-body" style={{ height: "250px", position: "relative" }}>

						<h5 className="card-text text-start">Name: {user.full_name}</h5>
						<p className="card-text text-start">Email: {user.email}</p>
						<button className="btn btn-primary" onClick={handleEdit}>Edit</button>

					</div>
				</div>




			</div>
		</div>
	);
};
