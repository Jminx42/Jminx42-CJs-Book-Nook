import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";

import { Context } from "../store/appContext";
import { InputProfilePic } from "../component/inputProfilePic";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState("");
	const [editClicked, setEditClicked] = useState(false);


	const getOneUser = async () => {
		const resp = await fetch(process.env.BACKEND_URL + 'api/user/', {
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token")
			}
		});
		const data = await resp.json();
		if (resp.status === 200) {
			setUser(data.user);
		}
	};

	useEffect(() => {
		getOneUser();
	}, []);

	const handleSave = async (user) => {
		setEditClicked(false);

		const response = await fetch(process.env.BACKEND_URL + 'api/user/update', {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ user })
		});
		if (response.ok) {
			await actions.getOneUser();
			alert("Profile successfully updated");
		} else {
			alert("uh-oh, something went wrong!")
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
								id="email"
								aria-describedby="email"
								value={user.email}
								onChange={(e) => setUser({ ...user, email: e.target.value })}
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
					</div>
				</div>
			</div>
		</div>
	);
};
