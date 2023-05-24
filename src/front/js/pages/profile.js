import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";

import { Context } from "../store/appContext";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState("");
	const [editClicked, setEditClicked] = useState(false);
	// const [selectedFile, setSelectedFile] = useState(null);

	const getOneUser = async () => {
		const resp = await fetch(process.env.BACKEND_URL + 'api/user/', {
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token")
			}
		})
		const data = await resp.json()
		if (resp.status == 200) {
			setUser(data.user)
		}
	}

	// const handleFileChange = (event) => {
	// 	const file = event.target.files[0];
	// 	setSelectedFile(file);
	// };

	// const handleUpload = () => {
	// 	if (file) {
	// 		// Perform any additional validation or checks on the file if needed

	// 		// Create a FileReader instance to read the file
	// 		const reader = new FileReader();

	// 		// Set up a callback function to be executed when the file is loaded
	// 		reader.onload = () => {
	// 			const uploadedImage = reader.result; // Get the uploaded image data

	// 			// Do something with the uploaded image data
	// 			// e.g., send it to a server, update state, etc.
	// 			sessionStorage.setItem("profile_image", uploadedImage);
	// 		};


	// 		// Read the file as a data URL
	// 		reader.readAsDataURL(file);
	// 	}

	// };

	useEffect(() => {
		getOneUser()
	}, []);



	const handleSave = async () => {
		setEditClicked(false);

		const response = await fetch(process.env.BACKEND_URL + 'api/user/' + store.user.id, {
			method: "PUT",
			headers: {
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ "user": user })
		})
		if (response.ok) {
			await actions.getOneUser();
			alert("Profile successfully updated"); // I hate git
		}
	}

	return (
		<div>
			<Navbar />
			<div className="container">
				<h1>My Profile</h1>
				<div className="card mx-2" style={{ width: "18rem" }}>
					{!editClicked ?
						<img src={user.profile_picture} className="card-img-top" alt="profile picture" />
						:
						<div>
							<h3>Image Upload</h3>
							{/* <input type="file" onChange={handleFileChange} />
							<button onClick={handleUpload}>Upload</button> */}
						</div>}
					{/* {uploadedImage && <img src={uploadedImage} alt="Uploaded" />} */}
					<div className="card-body" style={{ height: "250px", position: "relative" }}>

						<label className="card-text text-start">Name: </label>
						{!editClicked ?
							<span> {user.full_name}</span>
							:
							<input
								className="form-control"
								id="full_name"
								aria-describedby="full_name"
								value={user.full_name}
								onChange={(e) => setUser({ ...user, full_name: e.target.value })} />}
						<label className="card-text text-start">Email: </label>
						{!editClicked ?
							<span> {user.email}</span>
							:
							<input
								className="form-control"
								id="email"
								aria-describedby="email"
								value={user.email}
								onChange={(e) => setUser({ ...user, email: e.target.value })} />}
						{!editClicked ?
							<button className="btn btn-primary mt-3" onClick={() => setEditClicked(true)}>Edit</button>
							:
							<button className="btn btn-primary mt-3" onClick={handleSave}>Save</button>}


					</div>
				</div>




			</div>
			<div className="col">
				<h2>Payment Method: </h2>
				{/* <label className="card-text text-start">{user.payment_method}</label> */}
			</div>
		</div>
	);
};
