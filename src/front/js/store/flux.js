const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			users: {},
		},
		actions: {
			get_all_users: async () => {
				const resp = await fetch(process.env.BACKEND_URL + '/api/user')
				const data = await resp.json()
				setStore({ users: data })
				console.log("users received from api: ", getStore().users)
			},
			validate_register: (email) => {
				console.log(getStore().users.email)
				const userEmail = getStore().users.email

			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded")
				if (token && token !== "" && token !== undefined) setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logging out");
				setStore({ token: "" });
			},

			register: async (email, password) => {
				const opts = {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password,
						token: token,
					})
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/user', opts)
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}
					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					console.log("here is your token " + data.access_token)
					setStore({ token: data.access_token })
					return true;
				}
				catch (error) {
					console.error("There has been an error logging in")
				}

			},

			register: async (email, password, full_name) => {
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
					const resp = await fetch(process.env.BACKEND_URL + '/api/user', opts)
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}

					return true;
				}
				catch (error) {
					console.error("There has been an error registering")
				}

			},
		}
	};
};

export default getState;
