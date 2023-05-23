import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";

import { Context } from "../store/appContext";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState("");

	// const getOneUser = async () => {
	// 	try {
	// 		const resp = await fetch(process.env.BACKEND_URL + 'api/user/' + store.user.id, {
	// 			headers: {
	// 				Authorization: "Bearer " + sessionStorage.getItem("token")
	// 			}
	// 		})
	// 		if (resp.status !== 200) {
	// 			const data = await resp.json()
	// 			alert(data.error);
	// 			return false;
	// 		}
	// 		const data = await resp.json();
	// 		setUser(data.user)
	// 		return true;
	// 	}
	// 	catch (error) {
	// 		console.error("There has been an error loading the profile page")
	// 	}
	// }

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

	return (
		<div>
			<Navbar />
			<div className="container">
				<h1>My Profile</h1>



			</div>
		</div>
	);
};
