from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class UserCategory (enum.Enum):
    standard = "standard"
    platinum = "platinum"

class BookCategory (enum.Enum):
    paperback = "paperback"
    hardcover = "hardcover"
    ebook = "ebook"
    audiobook = "audiobook"

class Genre (enum.Enum):
    romance = "romance"
    non_fiction = "non_fiction"
    science_fiction = "science_fiction"
    mystery_crime = "mystery_crime"
    thrillers = "thrillers"
    fantasy = "fantasy"

class PaymentMethods (enum.Enum):
    paypal = "paypal"
    visa = "visa"
    mastercard = "mastercard"
    american_express = "american_express"

    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(120), unique=False, nullable=True)
    user_category = db.Column(db.Enum(UserCategory), server_default="standard")
    payment_methods_id = db.Column(db.Integer, db.ForeignKey('paymentmethods.id'), nullable=False)
    wishlist = db.relationship("Wishlist", backref= "user")
    reviews = db.relationship("Reviews", backref= "user")
    transactions = db.relationship("Transactions", backref= "user")
    # how can we add a profile_image to our database
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "payment_methods_id": self.payment_methods_id,
            # do not serialize the password, its a security breach
        }

class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), unique=False, nullable=False)
    author = db.Column(db.String(120), unique=False, nullable=False)
    isbn = db.Column(db.Integer, unique=True, nullable=True)
    book_cover = db.Column(db.String(250), unique=False, nullable=False) # same problem as profile picture
    genre = db.Column(db.Enum(Genre), server_default="thrillers")
    description = db.Column(db.Text, unique=False, nullable=True)
    external_review = db.Column(db.Integer, db.ForeignKey('externalreviews.id'), nullable=True)
    wishlist = db.relationship("Wishlist", backref= "books")
    reviews = db.relationship("Reviews", backref= "books")
    transactions = db.relationship("Transactions", backref= "books")
    
    def __repr__(self):
        return f'<Books {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "isbn": self.isbn,
            "book_cover": self.book_cover,
            "description": self.description,
            "external_review": self.external_review,
        }

class Reviews (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, unique=False, nullable=True)
    rating = db.Column(db.Integer, unique=False, nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    
    def __repr__(self):
        return f'<Reviews {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "review": self.review,
            "rating": self.rating,
            "book_id": self.book_id,
            "user_id": self.user_id,
        }

class ExternalReviews (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    external_review = db.Column(db.Text, unique=False, nullable=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=True)
    
    def __repr__(self):
        return f'<ExternalReviews {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "external_review": self.external_review,
            "book_id": self.book_id,
        }

class Wishlist (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    
    def __repr__(self):
        return f'<Wishlist {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
        }
    
class Transactions (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    payment =  db.Column(db.Enum(PaymentMethods), server_default="visa")
    
    def __repr__(self):
        return f'<Reviews {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
        }

class PaymentMethods (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    paypal = db.Column(db.Integer, unique=True, nullable=True)
    visa = db.Column(db.Integer, unique=True, nullable=True)
    mastercard = db.Column(db.Integer, unique=True, nullable=True)
    american_express = db.Column(db.Integer, unique=True, nullable=True)
    user = db.relationship("User", backref= "paymentmethods")
    
    def __repr__(self):
        return f'<Reviews {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            #Serializing the payment methods is probably a security breach right?
        }
    
class Support (db.Model):
    ticket_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    enquiries = db.Column(db.Text, unique=False, nullable=False)
    resolved = db.Column(db.Boolean, unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Reviews {self.ticket_id}>'

    def serialize(self):
        return {
            "ticket_id": self.ticket_id,
            "user_id": self.user_id,
            "enquiries": self.enquiries,
            "resolved": self.resolved,
        }