const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: { wishlist: [] },

			books: [],
			book: {},
			// externalBooks: [],
			search: "",
			// oneGoogleBook: {},
			nytReview: {},
			checkout: [],
			price: null,

			bookPrice: null,

			loading: true,
			errorMsg: '',


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
					setStore({ user: { wishlist: [] } })
					sessionStorage.removeItem("token")
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("wishlist");
				sessionStorage.removeItem("checkout");
				console.log("Logging out");
				setStore({ user: { wishlist: [] } });
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
					const resp = await fetch(process.env.BACKEND_URL + 'api/user/login', opts);

					if (resp.status !== 200) {
						const data = await resp.json();
						setStore({ errorMsg: data.error });
						return false;
					}

					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					console.log("here is your token " + data.access_token)
					getActions().validate_user();
					return true;
				} catch (error) {
					setStore({ errorMsg: "An error occurred during login." });
					console.error("There has been an error logging in:", error);
					return false;
				}
			},


			getBooks: async () => {
				const resp = await fetch(process.env.BACKEND_URL + 'api/book')
				const data = await resp.json()
				if (resp.status !== 200) {
					alert(data.error)
				} else {
					setStore({ books: data.books })
					console.log("sdjbhbdsfhsdbhbsh")
					console.log(getStore().books)
				}
			},

			getOneBook: async (isbn) => {
				const response = await fetch(process.env.BACKEND_URL + 'api/book/' + isbn);
				const data = await response.json();
				console.log(data)
				setStore({ book: data.book })
				console.log(getStore().book)

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

			// getOneBook: async (isbn) => {
			// 	await getActions().getBooks()
			// 	console.log(getStore().books)
			// 	const store = getStore();
			// 	if (store.books) {
			// 		const filteredBooks = await store.books.filter((book) => book === isbn);
			// 		setStore({ book: filteredBooks });
			// 		console.log(store.book);
			// 	} else {
			// 		console.log("Store books array is not available.");
			// 	}

			// },
			// getOneGoogleBook: async (isbn) => {
			// 	try {
			// 		setStore({ oneGoogleBook: {}, loading: true });
			// 		const resp = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=AIzaSyAhG7q0MvYbiWzXeuSBlhqNATkUVSKhFq0');
			// 		if (!resp.ok) {
			// 			throw new Error('Error fetching book data');
			// 		}
			// 		const data = await resp.json();
			// 		const bookData = data.items[0].volumeInfo;
			// 		setStore({ oneGoogleBook: bookData, loading: false });
			// 	} catch (error) {
			// 		console.error(error);
			// 		setStore({ oneGoogleBook: {}, loading: false });

			// 	}
			// },

			// getNYTBooks: async () => {
			// 	const resp = await fetch('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=emRJGQrXQ32EXbl6ThvjL8JdJcoicGWf')

			// 	const data = await resp.json()

			// 	if (resp.status !== 200) {
			// 		alert(data.error)
			// 	} else {
			// 		let externalBooks = []
			// 		for (let x in data.results.lists) {
			// 			//console.log(data.results.lists[x])
			// 			externalBooks = externalBooks.concat(data.results.lists[x].books)
			// 		}
			// 		const uniqueBooks = externalBooks.filter(
			// 			(book, index, self) => index === self.findIndex((b) => b.primary_isbn13 === book.primary_isbn13)
			// 		);
			// 		// filtering the duplicates with "uniqueBooks"
			// 		//console.log(uniqueBooks);
			// 		setStore({ externalBooks: uniqueBooks });

			// 	}
			// },
			getNYTReview: async (isbn13) => {
				const resp = await fetch('https://api.nytimes.com/svc/books/v3/reviews.json?isbn=' + isbn13 + '&api-key=emRJGQrXQ32EXbl6ThvjL8JdJcoicGWf')


				const data = await resp.json()

				if (resp.status !== 200) {
					alert(data.error)
				} else {
					setStore({ nytReview: data.results[0] });
				}
			},


			setWishlist: (user_id, book_id) => {
				const wish = getStore().user.wishlist;
				const newItem = { user_id, book_id };
				console.log(newItem);
				const updatedWishlist = [...wish];
				const existingItemIndex = updatedWishlist.findIndex(item => item.id === book_id);
				if (existingItemIndex === -1) {
					updatedWishlist.push(newItem);
				} else {
					updatedWishlist[existingItemIndex] = newItem;
				}


				setStore({ wishlist: updatedWishlist });
				sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
			},


			postWishlist: async (book_id) => {
				const opts = {
					method: 'POST',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "book_id": book_id })
				};

				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/wishlist', opts);
					if (resp.status !== 200) {
						const data = await resp.json();
						const errorMessage = data.error || "Something went wrong";
						alert(errorMessage); // Display error message using toast
						return false;
					} else {
						await getActions().validate_user();
						alert("Your wishlist was updated successfully"); // Display success message using toast
						return true;
					}
				} catch (error) {
					console.error(`Error during fetch: ${process.env.BACKEND_URL}api/wishlist`, error);
				}
			},

			// setWishlist: (user_id, book_id) => {
			// 	const wish = getStore().user.wishlist;


			// 	const existingItemIndex = wish.findIndex(item => item.id === book_id);

			// 	if (existingItemIndex === -1) {
			// 		wish.push(newItem);
			// 	} else {
			// 		updatedWishlist[existingItemIndex] = newItem;
			// 	}

			// 	setStore({ wishlist: updatedWishlist });
			// 	sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

			// },

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

			},

			setPrice: (weeks_on_list) => {
				let price = null;
				if (weeks_on_list <= 10) {
					price = 18.99;
				} else if (weeks_on_list > 11 && weeks_on_list <= 30) {
					price = 16.99;
				} else if (weeks_on_list > 31 && weeks_on_list <= 60) {
					price = 14.99;
				} else {
					price = 12.99;
				}
				setStore({ price });
			},
			setBookPrice: (publishedDate) => {

				if (!publishedDate) {
					console.error('Invalid published date');
					return;
				}

				const year = new Date(publishedDate).getFullYear();
				console.log(year);
				let bookPrice = 0;

				if (year >= 2023) {
					bookPrice = 18.99;
				} else if (year >= 2020) {
					bookPrice = 16.99;
				} else if (year >= 2015) {
					bookPrice = 14.99;
				} else {
					bookPrice = 12.99;
				}

				setStore({ bookPrice });
			},

			// getGoogleBooks: async (search_text) => {
			// 	const resp = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + search_text + '&key=AIzaSyAhG7q0MvYbiWzXeuSBlhqNATkUVSKhFq0')
			// 	const data = await resp.json()
			// 	if (resp.status !== 200) {
			// 		alert(data.error)
			// 	} else {
			// 		setStore({ externalBooks: data })
			// 	}
			// },

			// getOneGoogleBook: async (isbn) => {
			// 	const resp = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=AIzaSyAhG7q0MvYbiWzXeuSBlhqNATkUVSKhFq0')
			// 	const data = await resp.json()
			// 	if (resp.status !== 200) {
			// 		alert(data.error)
			// 	} else {
			// 		setStore({ oneGoogleBook: data.items[0].volumeInfo })
			// 	}
			// },
			// getOneGoogleBook: async (isbn) => {
			// 	try {
			// 		setStore({ oneGoogleBook: {}, loading: true });
			// 		const resp = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=AIzaSyAhG7q0MvYbiWzXeuSBlhqNATkUVSKhFq0');
			// 		if (!resp.ok) {
			// 			throw new Error('Error fetching book data');
			// 		}
			// 		const data = await resp.json();
			// 		const bookData = data.items[0].volumeInfo;
			// 		setStore({ oneGoogleBook: bookData, loading: false });
			// 	} catch (error) {
			// 		console.error(error);
			// 		setStore({ oneGoogleBook: {}, loading: false });

			// 	}
			// },

			// getNYTBooks: async () => {
			// 	const resp = await fetch('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=emRJGQrXQ32EXbl6ThvjL8JdJcoicGWf')

			// 	const data = await resp.json()

			// 	if (resp.status !== 200) {
			// 		alert(data.error)
			// 	} else {
			// 		let externalBooks = []
			// 		for (let x in data.results.lists) {
			// 			//console.log(data.results.lists[x])
			// 			externalBooks = externalBooks.concat(data.results.lists[x].books)
			// 		}
			// 		const uniqueBooks = externalBooks.filter(
			// 			(book, index, self) => index === self.findIndex((b) => b.primary_isbn13 === book.primary_isbn13)
			// 		);
			// 		// filtering the duplicates with "uniqueBooks"
			// 		//console.log(uniqueBooks);
			// 		setStore({ externalBooks: uniqueBooks });

			// 	}
			// },

		}
	};
};

export default getState;
