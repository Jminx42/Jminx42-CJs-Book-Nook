const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user: { wishlist: [], review: [], transaction: [] },
			books: [],
			book: { reviews: [] },
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
					setStore({ user: { wishlist: [], review: [], transaction: [] } })
					sessionStorage.removeItem("token")
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("wishlist");
				sessionStorage.removeItem("checkout");
				console.log("Logging out");
				setStore({ user: { wishlist: [], review: [], transaction: [] } });
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
					// console.log(getStore().books)
				}
			},

			emptyBook: () => {
				setStore({ book: { reviews: [] } })
			},

			getOneBook: async (isbn) => {
				const response = await fetch(process.env.BACKEND_URL + 'api/book/' + isbn);
				const data = await response.json();
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

			getNYTReview: async (isbn13) => {
				const resp = await fetch('https://api.nytimes.com/svc/books/v3/reviews.json?isbn=' + isbn13 + '&api-key=emRJGQrXQ32EXbl6ThvjL8JdJcoicGWf')


				const data = await resp.json()

				if (resp.status !== 200) {
					alert(data.error)
				} else {
					setStore({ nytReview: data.results[0] });
				}
			},

			editReview: async (book_id, review, rating) => {
				const response = await fetch(process.env.BACKEND_URL + 'api/review', {
					method: "PUT",
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "application/json"
					},

					body: JSON.stringify({ "book_id": book_id.id, "review": review, "rating": rating })
				});

				if (response.ok) {
					const data = await response.json();
					const reviewData = data.review;
					await actions.validate_user();
					alert("Review updated successfully");
					console.log(reviewData); // Access the returned review data as needed
					await getActions().getOneBook(getStore().book.isbn)

				} else {
					const data = await response.json();
					alert(data.error);
				}
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

			postCheckout: async (book_id, unit, book_format_id) => {

				const opts = {
					method: 'POST',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "book_id": book_id, "unit": unit, "book_format_id": book_format_id })
				};

				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/transaction', opts);
					if (resp.status !== 200) {
						const data = await resp.json();
						const errorMessage = data.error || "Something went wrong";
						alert(errorMessage); // Display error message using toast
						return false;
					} else {
						await getActions().validate_user();
						alert("Your cart was updated successfully"); // Display success message using toast
						return true;
					}
				} catch (error) {
					console.error(`Error during fetch: ${process.env.BACKEND_URL}api/transaction`, error);
				}
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

		}
	};
};

export default getState;
