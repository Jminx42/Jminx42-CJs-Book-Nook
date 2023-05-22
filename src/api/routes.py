"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Book, Review, Wishlist, Transaction, Support, PaymentMethod 
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# @api.route("/token", methods=["POST"])
# def create_token():
    
#     if email != "test" or password != "test":
#         return jsonify({"msg": "Bad email or password"}), 401

    

@api.route("/user", methods=["POST"])
def create_user():
    body = request.json
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    full_name = request.json.get("full_name", None)
    new_user = User(
        email=body["email"],
        password=body["password"],
        full_name=body["full_name"],
    )
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200
    # return jsonify({"user": "created"}), 200

@api.route("/user/login", methods=["POST"])
def login():
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@")
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email, password=password).first() #gives the whole user, including the id

    if not user:
        return jsonify ({"error": "invalid credentials"}), 300
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200

@api.route("/user/validate", methods=["GET"])
@jwt_required()
def validate_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify ({"error": "invalid credentials"}), 300
    return jsonify({"user": user.serialize()})
    

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
@jwt_required()
def get_wishlist():
    user_id = get_jwt_identity()
    wishlist = Wishlist.query.get(user_id)
    if not wishlist:
        return jsonify({"error": "No wishlist found"}), 400

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

@api.route("/wishlist", methods=["DELETE"])
# @jwt_required()
def delete_wishlist():
    wishlist = Wishlist.query.get()
    if not wishlist:
        return jsonify({"error": "No wishlist found for this user id"}), 400

    db.session.delete(wishlist)
    db.session.commit()
    return jsonify("wishlist deleted"), 200


@api.route("/transaction", methods=['GET'])
# @jwt_required()
def get_one_transaction_by_id(user_id):
    transaction = Transaction.query.get(user_id)
  
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

@api.route("/payment-method", methods=['GET'])
def get_all_payment_methods():
    payment_methods = PaymentMethod.query.all()
    serialized_payment_methods = [payment_methods.serialize() for payment_methods in payment_methods]

    return jsonify(serialized_payment_methods), 200  

@api.route("/user/payment-method/<int:user_id>", methods=['GET'])
def get_one_payment_method_by_id(user_id):
    payment_method = PaymentMethod.query.get(user_id)


    if not payment_method:
        return jsonify({"error": "No payment method found for this user id"}), 400

    return jsonify(payment_method.serialize()), 200 

@api.route("/user/payment-method", methods=["POST"])
def create_payment_method():
    body = request.json
    new_payment_method = PaymentMethod(
        user_id=body["user_id"],
        payment_methods=body["payment_methods"],
        card_number=body["card_number"],
        card_name=body["card_name"],
        cvc=body["cvc"],
        expiry_date=body["expiry_date"]
    )
    db.session.add(new_payment_method)
    db.session.commit()

    return jsonify({"payment method": "created"}), 200

@api.route("/user/payment-method/<int:user_id>", methods=["DELETE"])
def delete_payment_method(user_id):
    payment_method = PaymentMethod.query.get(user_id)
    if not payment_method:
        return jsonify({"error": "No payment method found for this user id"}), 400

    db.session.delete(payment_method)
    db.session.commit()
    return jsonify("payment method deleted"), 200

@api.route("/support", methods=['GET'])
def get_all_support():
    support = Support.query.all()
    serialized_support = [support.serialize() for support in support]

    return jsonify(serialized_support), 200  

@api.route("/support/<int:ticket_id>", methods=['GET'])
def get_one_support_by_id(ticket_id):
    support = Support.query.get(ticket_id)

    if not support:
        return jsonify({"error": "No support found for this ticket id"}), 400

    return jsonify(support.serialize()), 200 

@api.route("/support", methods=["POST"])
def create_support():
    body = request.json
    new_support = Support(
        user_id=body["user_id"],
        enquiry=body["enquiries"],
        book_id=body["book_id"],
        transaction_id=body["transaction_id"]
    )
    db.session.add(new_support)
    db.session.commit()

    return jsonify({"support": "created"}), 200