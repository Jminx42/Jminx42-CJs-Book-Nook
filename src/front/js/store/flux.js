const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
		},
		actions: {
			validate_user: async () => {
				const resp = await fetch(process.env.BACKEND_URL + 'api/user/validate', {
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token")
					}
				})
				const data = await resp.json()
				if (resp.status == 200) {
					setStore({ user: data.user })
				} else {
					setStore({ user: null })
					sessionStorage.removeItem("token")
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logging out");
				setStore({ user: null });
			},

			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password,
					})
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/user/login', opts)
					if (resp.status !== 200) {
						const data = await resp.json()
						alert(data.error);
						return false;
					}
					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					console.log("here is your token " + data.access_token)
					getActions().validate_user()
					return true;
				}
				catch (error) {
					console.error("There has been an error logging in")
				}

			},


		}
	};
};

export default getState;
