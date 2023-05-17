from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class UserCategory(enum.Enum):
    name = "user_category"
    standard = "standard"
    platinum = "platinum"

class BookCategory(enum.Enum):
    name = "book_category"
    paperback = "paperback"
    hardcover = "hardcover"
    ebook = "ebook"
    audiobook = "audiobook"

class Genre(enum.Enum):
    name = "genre"
    romance = "romance"
    non_fiction = "non_fiction"
    science_fiction = "science_fiction"
    mystery_crime = "mystery_crime"
    thrillers = "thrillers"
    fantasy = "fantasy"

class PaymentMethods(enum.Enum):
    name = "payment_methods"
    paypal = "paypal"
    visa = "visa"
    mastercard = "mastercard"
    american_express = "american_express"

class User(db.Model):
    __tablename__ = 'user'

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


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
        }

class Book(db.Model):
    __tablename__ = 'book'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    isbn = db.Column(db.Integer, unique=True, nullable=True)
    book_cover = db.Column(db.String(250), nullable=False)
    genre = db.Column(db.Enum(Genre), server_default=Genre.thrillers.value)
    description = db.Column(db.Text, nullable=True)
    external_reviews = db.relationship("ExternalReview", backref="book")
    wishlist = db.relationship("Wishlist", backref="book")
    reviews = db.relationship("Review", backref="book")
    transactions = db.relationship("Transaction", backref="book")

    def __repr__(self):
        return f'<Book {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "isbn": self.isbn,
            "book_cover": self.book_cover,
            "description": self.description,
        }

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Integer, nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Review {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "review": self.review,
            "rating": self.rating,
            "book_id": self.book_id,
            "user_id": self.user_id,
        }

class ExternalReview(db.Model):
    __tablename__ = 'external_review'

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
    __tablename__ = 'wishlist'

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
    __tablename__ = 'transaction'

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    payment_methods = db.Column(db.Enum(PaymentMethods), server_default=PaymentMethods.visa.value)

    def __repr__(self):
        return f'<Transaction {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
        }

class PaymentMethod(db.Model):
    __tablename__ = 'payment_method'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    paypal = db.Column(db.Integer, unique=True, nullable=True)
    visa = db.Column(db.Integer, unique=True, nullable=True)
    mastercard = db.Column(db.Integer, unique=True, nullable=True)
    american_express = db.Column(db.Integer, unique=True, nullable=True)

    def __repr__(self):
        return f'<PaymentMethods {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            # Serializing the payment methods is probably a security breach, so you can exclude it
        }

class Support(db.Model):
    __tablename__ = 'support'

    ticket_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    enquiries = db.Column(db.Text, nullable=False)
    resolved = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Support {self.ticket_id}>'

    def serialize(self):
        return {
            "ticket_id": self.ticket_id,
            "user_id": self.user_id,
            "enquiries": self.enquiries,
            "resolved": self.resolved,
        }