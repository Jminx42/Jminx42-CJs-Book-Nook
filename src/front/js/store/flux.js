const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user: { wishlist: [], review: [], cart: [], support: [], paymentMethod: [] },
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
			bookFormats: []


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
					setStore({ user: { wishlist: [], review: [], transaction: [], cart: [], support: [], paymentMethod: [] } })
					sessionStorage.removeItem("token")
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("wishlist");
				sessionStorage.removeItem("checkout");
				console.log("Logging out");
				setStore({ user: { wishlist: [], review: [], transaction: [], cart: [], support: [], paymentMethod: [] } });
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

				const response = await fetch(process.env.BACKEND_URL + 'api/edit-review', {
					method: "PUT",
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "application/json"
					},

					body: JSON.stringify({ "book_id": book_id, "review": review, "rating": rating })
				});

				if (response.ok) {
					const data = await response.json();
					const reviewData = data.review;
					await getActions().validate_user();
					// alert("Review updated successfully");
					console.log(reviewData); // Access the returned review data as needed


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

			postCheckout: async (book_format_id) => {
				const defaultUnit = 1;
				console.log("###########################")
				console.log(book_format_id)
				const opts = {
					method: 'POST',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "book_id": getStore().book.id, "unit": defaultUnit, "book_format_id": parseInt(book_format_id) })
				};
				console.log(getStore().book.id)


				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/checkout', opts);
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
					console.error(`Error during fetch: ${process.env.BACKEND_URL}api/checkout`, error);
				}
			},

			postPaymentMethod: async (card_type, card_number, card_name, cvc, expiry_date) => {
				const opts = {
					method: 'POST',
					headers: {
						Authorization: "Bearer " + sessionStorage.getItem("token"),
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ "card_type": card_type, "card_number": card_number, "card_name": card_name, "cvc": cvc, "expiry_date": expiry_date })
				};

				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/user/payment-method', opts);
					if (resp.status !== 200) {
						const data = await resp.json();
						const errorMessage = data.error || "Something went wrong";
						alert(errorMessage);
						return false;
					} else {
						await getActions().validate_user();
						alert("Your card was added successfully");
						return true;
					}
				} catch (error) {
					console.error(`Error during fetch: ${process.env.BACKEND_URL}api/user/payment-method`, error);
				}
			},

			getBookFormats: async () => {
				console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
				const response = await fetch(process.env.BACKEND_URL + 'api/bookformat');
				const data = await response.json();
				setStore({ bookFormats: data.book_formats })
				console.log(getStore().bookFormats)
			},


		}
	};
};

export default getState;
