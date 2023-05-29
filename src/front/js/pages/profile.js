import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { InputProfilePic } from "../component/inputProfilePic";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState(store.user);
	const [editClicked, setEditClicked] = useState(false);


	useEffect(() => {
		setUser(store.user)

	}, [store.user]);

	const handleSave = async () => {
		setEditClicked(false);

		const response = await fetch(process.env.BACKEND_URL + 'api/user/update', {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		});
		if (response.ok) {
			await actions.validate_user()
			alert("Profile successfully updated");
		} else {
			const data = await response.json()
			alert(data.error)
		}
	};

	return (
		<div>
			<Navbar />
			<div className="container">
				<h1>My Profile</h1>
				<div className="card mx-2" style={{ width: "18rem" }}>
					{!editClicked ? (
						<img
							src={user.profile_picture}
							className="card-img-top"
							id="profile-picture"
							alt="profile picture"
						/>
					) : (
						<div>
							<InputProfilePic />
						</div>
					)}

					<div className="card-body" style={{ height: "300px", position: "relative" }}>
						<label className="card-text text-start">Email: </label>
						<p> {user.email}</p>

						<label className="card-text text-start">Name: </label>
						{!editClicked ? (
							<p> {user.full_name}</p>
						) : (
							<input
								className="form-control"
								id="full_name"
								aria-describedby="full_name"
								value={user.full_name}
								onChange={(e) => setUser({ ...user, full_name: e.target.value })}
							/>
						)}


						<label className="card-text text-start">Password: </label>
						{!editClicked ? (
							<p>###############</p>
						) : (
							<input
								className="form-control"
								id="password"
								aria-describedby="password"
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
							/>
						)}
						{!editClicked ? (
							<button className="btn btn-primary mt-3" onClick={() => setEditClicked(true)}>
								Edit
							</button>
						) : (
							<button className="btn btn-primary mt-3" onClick={handleSave}>
								Save
							</button>

						)}
						<Link to="/profile" >
							<button className="btn btn-primary mt-3">
								Close
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
