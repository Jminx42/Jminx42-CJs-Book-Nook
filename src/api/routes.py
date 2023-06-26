"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import datetime
import bcrypt
import cloudinary
import cloudinary.uploader

from api.models import db, User, Book, Review, Wishlist, Transaction, Support, PaymentMethod, TransactionItem, BookFormat
from api.utils import APIException, generate_sitemap

api = Blueprint('api', __name__)    

@api.route("/create/user", methods=["POST"])
def create_user():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None) 
    full_name = body.get("full_name", None)

    if not all([email, password, full_name]):
        return jsonify({"error": "Missing credentials"}), 400

    if "@" not in email: 
        return jsonify({"error": "Please enter a valid email, e.g., user@gmail.com"}), 400

    if len(password) < 5:
        return jsonify({"error": "Your password must have more than 5 characters"}), 400

    already_exist = User.query.filter_by(email=email).first()
    if already_exist:
        return jsonify({"error": "Email already exists in the database"}), 409

    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(
        email=email,
        password_hash=password_hash,
        full_name=full_name,
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name
        }
    }), 200

@api.route("/user/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email).first() #gives the whole user, including the id
    if not user and not bcrypt.checkpw(password.encode('utf-8'), user.password_hash):
        return jsonify ({"error": "Invalid credentials"}), 300        
    
    access_token = create_access_token(identity=user.id, expires_delta = datetime.timedelta(minutes=90))
    return jsonify({"access_token": access_token}), 200

@api.route("/user/validate", methods=["GET"])
@jwt_required()
def validate_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    return jsonify({"user": user.serialize()}), 200
    

# @api.route("/user/all", methods=['GET'])
# def get_all_users():
#     users = User.query.all()
#     serialized_users = [user.serialize() for user in users]

#     return jsonify(serialized_users), 200  

@api.route("/user", methods=['GET'])
@jwt_required()
def get_user_by_id():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "No user found with this id"}), 404

    return jsonify({"user": user.serialize()}), 200

@api.route("/user/update", methods=["PUT"])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "No user found with this id"}), 404

    body = request.json

    if "password" in body:
        password = body.get("password", "").strip()

        if len(password) < 5 or not password:
            return jsonify({"error": "Your password should be at least 5 characters long and not be empty"}), 400

        user.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    if "full_name" in body:
        user.full_name = body["full_name"]

    db.session.commit()

    return jsonify({"message": "User updated"}), 200

@api.route('/user/image', methods=['POST'])
@jwt_required()
def handle_upload_image():
    user_id = get_jwt_identity()

    if 'profile_image' not in request.files:
        raise APIException('Missing profile_image in the request form data', 400)

    uploaded_file = request.files['profile_image']
    if uploaded_file.filename == '':
        raise APIException('No selected file', 400)

    # Upload file to Cloudinary
    result = cloudinary.uploader.upload(uploaded_file)

    # Fetch the user
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "No user found with this id"}), 404

    # Update the user with the Cloudinary image URL
    user.profile_picture = result['secure_url']
    db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/book", methods=['GET'])
def get_all_books():
    books = Book.query.all()
    serialized_books = [book.serialize() for book in books]

    return jsonify({"books": serialized_books}), 200  

@api.route("/book/<int:isbn>", methods=['GET'])
def get_one_book_by_id(isbn):
    book = Book.query.filter_by(isbn = isbn).first()
    if not book:

        return jsonify({"error": "No book found with this ISBN"}), 400


    return jsonify({"book": book.serialize()}), 200 

# @api.route("/review", methods=['GET'])
# def get_all_reviews():
#     reviews = Review.query.all()
#     serialized_reviews = [review.serialize() for review in reviews]

#     return jsonify({"reviews": serialized_reviews}), 200

@api.route("/user_reviews", methods=['GET'])
@jwt_required()
def get_user_reviews():
    user_id = get_jwt_identity()
    reviews = Review.query.filter_by(user_id=user_id).all()
    serialized_reviews = [review.serialize() for review in reviews]

    return jsonify({"reviews": serialized_reviews}), 200
 

# @api.route("/review/<int:review_id>", methods=['GET'])
# def get_one_review_by_id(review_id):
#     review = Review.query.get(review_id)
#     if not review:
#         return jsonify({"error": "No review found with this id"}), 400

#     return jsonify(review.serialize()), 200 

@api.route("/edit-review", methods=["PUT"]) #Why don't we need the /<int:book_id>
@jwt_required()
def update_review_endpoint():
    user_id = get_jwt_identity()
    body = request.json
    review = Review.query.filter_by(book_id=body["book_id"]).first()
    if not review:
        return jsonify({"error": "Please post your review first"}), 400

    review.review = body["review"]
    review.rating = body["rating"]
    

    db.session.commit()
    return jsonify({"review": "Review was updated successfully"}), 200

@api.route("/review", methods=["POST"])
@jwt_required()
def create_review():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json
       
        if "review" not in body or not user:
            return jsonify({"error": "Missing required fields"}), 400
        
        review = Review.query.filter_by(book_id=body["book_id"], user_id=user_id).first()
        if not review:
            new_review = Review(
                book_id=body["book_id"],
                user_id=user_id,
                review=body["review"],
                rating=body["rating"],
            )
            db.session.add(new_review)
            db.session.commit()

            review_data = {
                "book_id": new_review.book_id,
                "user_id": new_review.user_id,
                "review": new_review.review,
                "rating": new_review.rating,
            }
            return jsonify({"review": review_data}), 200
        return jsonify({"error": "You can only submit one review for each book"}), 400
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route("/review/<int:review_id>", methods=["DELETE"])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "No review found with this id"}), 400

    db.session.delete(review)
    db.session.commit()
    return jsonify("review deleted"), 200

@api.route("/wishlist", methods=["POST"])
@jwt_required()
def create_wishlist():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json
       
        if "book_id" not in body or not user:
            return jsonify({"error": "Missing required fields"}), 400
        
        wishlist = Wishlist.query.filter_by(book_id=body["book_id"], user_id=user_id).first()
        if not wishlist:
            new_wishlist = Wishlist(
                book_id=body["book_id"],
                user_id=user_id
            )
            db.session.add(new_wishlist)
            db.session.commit()

            wishlist_data = {
                "book_id": new_wishlist.book_id,
                "user_id": new_wishlist.user_id
            }
            return jsonify({"wishlist": wishlist_data}), 200
        else:
            db.session.delete(wishlist)
            db.session.commit()
            return jsonify({"wishlist": "book deleted from wishlist"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("/transaction", methods=['GET'])
# @jwt_required()
def get_one_transaction_by_id(user_id):
    transaction = Transaction.query.get(user_id)
  
    if not transaction:
        return jsonify({"error": "No transaction found for this user id"}), 400

    return jsonify(transaction.serialize()), 200 

@api.route("/checkout", methods=["POST"])
@jwt_required()
def add_item_to_cart():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    try:
        body = request.json
        print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       
        if "book_id" not in body or not user:
            return jsonify({"error": "Missing required fields"}), 400
        
        item = TransactionItem.query.filter_by(book_id=body["book_id"], user_id=user_id, book_format_id=body["book_format_id"]).first()
        if not item:
            new_item = TransactionItem(
                book_id=body["book_id"],
                user_id=user_id,
                book_format_id=body["book_format_id"],
                unit = body["unit"]
            )
            db.session.add(new_item)
            db.session.commit()
        else:
            db.session.delete(item)
            db.session.commit()
            return jsonify({"item": "book deleted from cart"}), 200

       
        return jsonify({"transaction": new_item.serialize()}), 200
           
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    


@api.route("/bookformat", methods=['GET'])
def get_book_format():
    book_formats = BookFormat.query.all()
    serialized_book_formats = [book_format.serialize() for book_format in book_formats]
  
    if not book_formats:
        return jsonify({"error": "There was an error fetching the data you requested"}), 400

    return jsonify({"book_formats": serialized_book_formats}), 200 


@api.route("/user/payment-method", methods=["POST"])
@jwt_required()
def create_payment_method():
    user_id = get_jwt_identity()
    data = request.json


    required_fields = ["card_type", "card_number", "card_name", "cvc", "expiry_date"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400


    card_number = data["card_number"]
    cvc = data["cvc"]

  
    card_number_hash = bcrypt.hashpw(card_number.encode("utf-8"), bcrypt.gensalt())
    cvc_hash = bcrypt.hashpw(cvc.encode("utf-8"), bcrypt.gensalt())


    new_payment_method = PaymentMethod(
        user_id=user_id,
        card_type=data["card_type"],
        card_number_hash=card_number_hash,
        card_name=data["card_name"],
        cvc_hash=cvc_hash,
        expiry_date=data["expiry_date"]
    )

    try:
        db.session.add(new_payment_method)
        db.session.commit()
        return jsonify({"payment-method": "created"}), 200
    except Exception as e:
         return jsonify({"error": str(e)}), 500
    
@api.route("/user/payment-method/update", methods=["PUT"])

@jwt_required()
def update_payment_method():
    user_id = get_jwt_identity()
    data = request.get_json()

    payment_method = PaymentMethod.query.filter_by( user_id=user_id).first()

    if not payment_method:
        return jsonify({"error": "Payment method not found or unauthorized"}), 404

    if "card_type" in data:
        payment_method.card_type = data["card_type"]
    if "card_number" in data:

        payment_method.card_number_hash = bcrypt.hashpw(data["card_number"].encode("utf-8"), bcrypt.gensalt())
    if "card_name" in data:
        payment_method.card_name = data["card_name"]
    if "cvc" in data:
        payment_method.cvc_hash = bcrypt.hashpw(data["cvc"].encode("utf-8"), bcrypt.gensalt())

    if "expiry_date" in data:
        payment_method.expiry_date = data["expiry_date"]

    try:
        db.session.commit()
        return jsonify({"message": "Payment method updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route("/user/payment-method/remove", methods=["DELETE"])
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
@jwt_required()
def create_support():
    user_id = get_jwt_identity()
    body = request.json
    if not body:
        return jsonify({"error": "missing requirements"}), 400
    else:
        new_support = Support(
            user_id=user_id,
            subject=body["subject"],
            message=body["message"],
            
        )
        db.session.add(new_support)
        db.session.commit()

        return jsonify({"support": "created"}), 200
    