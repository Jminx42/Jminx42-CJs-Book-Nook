"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Book, Review, Wishlist, Transaction, Support, PaymentMethod 
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route("/user", methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = [user.serialize() for user in users]

    return jsonify(serialized_users), 200  

@api.route("/user/<int:user_id>", methods=['GET'])
def get_one_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "No user found with this id"}), 400

    return jsonify(user.serialize()), 200 

@api.route("/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    body = request.json
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "No user found with this id"}), 400

    user.email = body["email"]
    user.password = body["password"]
    user.full_name = body["full_name"]

    db.session.commit()
    return jsonify("User updated"), 200

@api.route("/user", methods=["POST"])
def create_user():
    body = request.json
    new_user = User(
        email=body["email"],
        password=body["password"],
        full_name=body["full_name"],
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user": "created"}), 200

@api.route("/book", methods=['GET'])
def get_all_books():
    books = Book.query.all()
    serialized_books = [book.serialize() for book in books]

    return jsonify(serialized_books), 200  

@api.route("/book/<int:book_id>", methods=['GET'])
def get_one_book_by_id(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "No book found with this id"}), 400

    return jsonify(book.serialize()), 200 

@api.route("/review", methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    serialized_reviews = [review.serialize() for review in reviews]

    return jsonify(serialized_reviews), 200  

@api.route("/review/<int:review_id>", methods=['GET'])
def get_one_review_by_id(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "No review found with this id"}), 400

    return jsonify(review.serialize()), 200 

@api.route("/review/<int:review_id>", methods=["PUT"])
def update_review(review_id):
    body = request.json
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "No review found with this id"}), 400

    review.review = body["review"]
    review.rating = body["rating"]
    review.book_id = body["book_id"]
    review.user_id = body["user_id"]

    db.session.commit()
    return jsonify("review updated"), 200

@api.route("/review", methods=["POST"])
def create_review():
    body = request.json
    new_review = Review(
        review=body["review"],
        rating=body["rating"],
        book_id=body["book_id"],
        user_id=body["user_id"]
    )
    db.session.add(new_review)
    db.session.commit()

    return jsonify({"review": "created"}), 200

@api.route("/review/<int:review_id>", methods=["DELETE"])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "No review found with this id"}), 400

    db.session.delete(review)
    db.session.commit()
    return jsonify("review deleted"), 200

@api.route("/wishlist", methods=['GET'])
def get_all_wishlists():
    wishlists = Wishlist.query.all()
    serialized_wishlists = [wishlist.serialize() for wishlist in wishlists]

    return jsonify(serialized_wishlists), 200  

@api.route("/wishlist/<int:user_id>", methods=['GET'])
def get_one_wishlist_by_id(user_id):
    wishlist = Wishlist.query.get(user_id)
    if not wishlist:
        return jsonify({"error": "No wishlist found for this user id"}), 400

    return jsonify(wishlist.serialize()), 200 

@api.route("/wishlist", methods=["POST"])
def create_wishlist():
    body = request.json
    new_wishlist = Wishlist(
        book_id=body["book_id"],
        user_id=body["user_id"]
    )
    db.session.add(new_wishlist)
    db.session.commit()

    return jsonify({"wishlist": "created"}), 200

@api.route("/wishlist/<int:user_id>", methods=["DELETE"])
def delete_wishlist(user_id):
    wishlist = Wishlist.query.get(user_id)
    if not wishlist:
        return jsonify({"error": "No wishlist found for this user id"}), 400

    db.session.delete(wishlist)
    db.session.commit()
    return jsonify("wishlist deleted"), 200

@api.route("/transaction", methods=['GET'])
def get_all_transactions():
    transactions = Transaction.query.all()
    serialized_transactions = [transaction.serialize() for transaction in transactions]

    return jsonify(serialized_transactions), 200  

@api.route("/transaction/<int:user_id>", methods=['GET'])
def get_one_transaction_by_id(user_id):
    transaction = Transaction.query.get(user_id)
    print(transaction.payment_methods.value)
    if not transaction:
        return jsonify({"error": "No transaction found for this user id"}), 400

    return jsonify(transaction.serialize()), 200 

@api.route("/transaction", methods=["POST"])
def create_transaction():
    body = request.json
    new_transaction = Transaction(
        book_id=body["book_id"],
        user_id=body["user_id"],
        payment_methods=body["payment_methods"]
    )
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({"transaction": "created"}), 200