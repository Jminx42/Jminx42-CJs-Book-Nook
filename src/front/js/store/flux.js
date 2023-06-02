const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {},
			books: [],
			book: {},
			externalBooks: [],
			search: "",
			oneGoogleBook: {},
			nytReview: {},
			wishlist: [],
			checkout: [],
		},
		actions: {
			handleSearch: (word) => {
				setStore({ search: word })
			},
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
				sessionStorage.removeItem("wishlist");
				sessionStorage.removeItem("checkout");
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

			getBooks: async () => {
				const resp = await fetch(process.env.BACKEND_URL + 'api/book')
				const data = await resp.json()
				if (resp.status !== 200) {
					alert(data.error)
				} else {
					setStore({ books: data.books })
				}
			},

			getGoogleBooks: async (search_text) => {
				const resp = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + search_text + '&key=AIzaSyAhG7q0MvYbiWzXeuSBlhqNATkUVSKhFq0')
				const data = await resp.json()
				if (resp.status !== 200) {
					alert(data.error)
				} else {
					setStore({ externalBooks: data })
				}
			},

			getOneGoogleBook: async (isbn) => {
				const resp = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=AIzaSyAhG7q0MvYbiWzXeuSBlhqNATkUVSKhFq0')
				const data = await resp.json()
				if (resp.status !== 200) {
					alert(data.error)
				} else {
					setStore({ oneGoogleBook: data.items[0].volumeInfo })
				}
			},

			getNYTBooks: async () => {
				const resp = await fetch('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=emRJGQrXQ32EXbl6ThvjL8JdJcoicGWf')
				console.log("response", resp)
				const data = await resp.json()
				console.log("data", data)
				if (resp.status !== 200) {
					alert(data.error)
				} else {
					let externalBooks = []
					for (let x in data.results.lists) {
						//console.log(data.results.lists[x])
						externalBooks = externalBooks.concat(data.results.lists[x].books)
					}
					const uniqueBooks = externalBooks.filter(
						(book, index, self) => index === self.findIndex((b) => b.primary_isbn13 === book.primary_isbn13)
					);
					// filtering the duplicates with "uniqueBooks"
					//console.log(uniqueBooks);
					setStore({ externalBooks: uniqueBooks });

				}
			},
			getNYTReview: async (isbn13) => {
				const resp = await fetch('https://api.nytimes.com/svc/books/v3/reviews.json?isbn=' + isbn13 + '&api-key=emRJGQrXQ32EXbl6ThvjL8JdJcoicGWf')
				console.log("response", resp)
				const data = await resp.json()
				console.log("data", data)
				if (resp.status !== 200) {
					alert(data.error)
				} else {
					setStore({ nytReview: data.results[0] });
				}
			},

			getOneBook: async (id) => {
				const response = await fetch(process.env.BACKEND_URL + 'api/book/' + id);
				const data = await response.json();
				setStore({ book: data.book })

			},

			setWishlist: (primary_isbn13, cover, title, author) => {
				const wish = getStore().wishlist;

				const newItem = { primary_isbn13, cover, title, author };
				console.log(newItem);
				const updatedWishlist = [...wish];
				const existingItemIndex = updatedWishlist.findIndex(item => item.primary_isbn13 === primary_isbn13);

				if (existingItemIndex === -1) {
					updatedWishlist.push(newItem);
				} else {
					updatedWishlist[existingItemIndex] = newItem;
				}

				setStore({ wishlist: updatedWishlist });
				sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

			},

			setCheckout: (primary_isbn13, cover, title, author, price) => {
				const cart = getStore().checkout;
				const newCart = { primary_isbn13, cover, title, author, price };

				const updatedCart = [...cart];
				const existingCartIndex = updatedCart.findIndex(item => item.primary_isbn13 === primary_isbn13);

				if (existingCartIndex === -1) {
					updatedCart.push(newCart);
				} else {
					updatedCart[existingCartIndex] = newCart;
				}

				setStore({ checkout: updatedCart });
				sessionStorage.setItem("checkout", JSON.stringify(updatedCart));

			}


		}
	};
};

export default getState;
