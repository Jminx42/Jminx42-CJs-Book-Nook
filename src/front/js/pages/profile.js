import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";

import { Context } from "../store/appContext";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState("");
	const [editClicked, setEditClicked] = useState(false);
	const [files, setFiles] = useState(null);

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


	const uploadImage = evt => {
		evt.preventDefault();
		// we are about to send this to the backend.
		console.log("These are the files", files);
		let body = new FormData();
		body.append("profile_image", files[0]);
		const options = {
			body,
			method: "POST",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token")
			},
		};
		// you need to have the user_id in the localStorage

		fetch(`${process.env.BACKEND_URL}api/user/image`, options)
			.then(resp => resp.json())
			.then(data => console.log("Success!!!!", data))
			.catch(error => console.error("ERRORRRRRR!!!", error));
	};

	useEffect(() => {
		getOneUser();
	}, []);

	const handleSave = async () => {
		setEditClicked(false);

		const response = await fetch(process.env.BACKEND_URL + 'api/user/' + store.user.id, {
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
							<h3>Image Upload</h3>
							<form onSubmit={uploadImage}>
								<input
									type="file"
									accept="image/jpeg, image/png, image/jpg"
									onChange={e => setFiles(e.target.files)}
								/>
								<button>Upload</button>
							</form>
						</div>
					)}

					<div className="card-body" style={{ height: "250px", position: "relative" }}>
						<label className="card-text text-start">Name: </label>
						{!editClicked ? (
							<span> {user.full_name}</span>
						) : (
							<input
								className="form-control"
								id="full_name"
								aria-describedby="full_name"
								value={user.full_name}
								onChange={(e) => setUser({ ...user, full_name: e.target.value })}
							/>
						)}
						<label className="card-text text-start">Email: </label>
						{!editClicked ? (
							<span> {user.email}</span>
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
