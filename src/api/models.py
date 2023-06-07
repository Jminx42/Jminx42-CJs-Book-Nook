from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import BIGINT
import enum

db = SQLAlchemy()

class UserCategory(enum.Enum):
    standard = "standard"
    platinum = "platinum"

class BookCategory(enum.Enum):

    paperback = "paperback"
    hardcover = "hardcover"
    ebook = "ebook"
    audiobook = "audiobook"

class Genre(enum.Enum):
   
    romance = "romance"
    fiction = "fiction"
    non_fiction = "non_fiction"
    science_fiction = "science_fiction"
    mystery_crime = "mystery_crime"
    thrillers = "thrillers"
    fantasy = "fantasy"

class PaymentMethods(enum.Enum):
 
    visa = "visa"
    mastercard = "mastercard"
    american_express = "american_express"

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    full_name = db.Column(db.String(120), nullable=True)
    user_category = db.Column(db.Enum(UserCategory), server_default=UserCategory.standard.value)
    payment_method = db.relationship("PaymentMethod", uselist=False, backref="user")
    wishlist = db.relationship("Wishlist", backref="user")
    reviews = db.relationship("Review", backref="user")
    transactions = db.relationship("Transaction", backref="user")
    support = db.relationship("Support", backref="user")
    profile_picture = db.Column(db.String(250), unique=True, nullable=True)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "profile_picture": self.profile_picture,
            "password": ""
        }

class Book(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    isbn = db.Column(BIGINT(unsigned=True), unique=True, nullable=True)
    book_cover = db.Column(db.String(250), nullable=True) #this comes from the NY API, and sometimes is null, but has better resolution
    book_cover_b = db.Column(db.String(250), nullable=True) #this comes from the google book API, is always populated but has less resolution
    book_category = db.Column(db.Enum(BookCategory), server_default=BookCategory.paperback.value)
    publisher = db.Column(db.String(100), unique=False, nullable=True)
    genre = db.Column(db.String(100), unique=False, nullable=True)
    description = db.Column(db.Text, nullable=True)
    year = db.Column(db.String(60), unique=False, nullable=True)
    average_rating = db.Column(db.Float, unique=False, nullable=True)
    ratings_count = db.Column(db.Integer, unique=False, nullable=True)
    pages = db.Column(db.Integer, unique=False, nullable=True)
    preview = db.Column(db.String(250), nullable=True)
    price = db.Column(db.Float, unique=False, nullable=True)
    external_reviews = db.relationship("ExternalReview", backref="book")
    wishlist = db.relationship("Wishlist", backref="book")
    transactions = db.relationship("Transaction", backref="book")
    support = db.relationship("Support", backref="book")

    def __repr__(self):
        return f'<Book {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "isbn": self.isbn,
            "book_cover": self.book_cover,
            "book_cover_b": self.book_cover_b,
            "description": self.description,
            "book_category": self.book_category.value,
            # "genre": self.genre, # We need to see how to access the values of genre
            "publisher": self.publisher,
            "year": self.year,
            "price": self.price,
            "average_rating": self.average_rating,
            "ratings_count": self.ratings_count,
            "pages": self.pages,
            "preview": self.preview,
        }

class Review(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Integer, nullable=False)
    book_isbn = db.Column(BIGINT(unsigned=True), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Review {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "review": self.review,
            "rating": self.rating,
            "book_isbn": self.book_isbn,
            "user_id": self.user_id,
        }

class ExternalReview(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    external_review = db.Column(db.Text, nullable=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)

    def __repr__(self):
        return f'<ExternalReview {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "external_review": self.external_review,
            "book_id": self.book_id,
        }

class Wishlist(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Wishlist {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
        }

class Transaction(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    payment_methods = db.Column(db.Enum(PaymentMethods), server_default=PaymentMethods.visa.value)
    support = db.relationship("Support", backref="transaction")

    def __repr__(self):
        return f'<Transaction {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
            "payment_methods": self.payment_methods.value,
        }

class PaymentMethod(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    payment_methods = db.Column(db.Enum(PaymentMethods), server_default=PaymentMethods.visa.value)
    card_number = db.Column(BIGINT(unsigned=True), unique=True, nullable=False)
    card_name = db.Column(db.String(100), unique=False, nullable=False)
    cvc = db.Column(db.Integer, unique=False, nullable=False)
    expiry_date = db.Column(db.Date, unique=False, nullable=False)

    def __repr__(self):
        return f'<PaymentMethods {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "payment_methods": self.payment_methods.value,
            "card_name": self.card_name,
            "expiry_date": self.expiry_date
            # Serializing the payment methods is probably a security breach, so you can exclude it
        }

class Support(db.Model):

    ticket_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    enquiries = db.Column(db.Text, nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=True)
    transaction_id = db.Column(db.Integer, db.ForeignKey('transaction.id'), nullable=True)

    def __repr__(self):
        return f'<Support {self.ticket_id}>'

    def serialize(self):
        return {
            "ticket_id": self.ticket_id,
            "user_id": self.user_id,
            "enquiries": self.enquiries,
            "book_id": self.book_id,
            "transaction_id": self.transaction_id
        }