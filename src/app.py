"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap, retrieve_books, generate_formats
from api.models import db, Book, BookFormat, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager



#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
jwt = JWTManager(app)

app.config["STRIPE_PUBLIC_KEY"] = "pk_test_51NOm30LDriABBO71EslVAUR52crSoSLYDfGJgAF61S1HyL5sxQ63PGMxS2xffxW2x9ugJm1sPSuNfhNibLoODb6M00SiS5BrMT"
app.config["STRIPE_SECRET_KEY"] = "sk_test_51NOm30LDriABBO719nhvoZuy8msaKkmkekKWuLucfqiLlWMxYAdiuPKvGjUi8XIqrtsJ8UW5NUcMFboDWROSV1fS00mXbmKzvJ"


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

#Table initialization
# User table
# def user_initialize():
#     if len(User.query.all()) == 0:
#         with open ("src/table_initial_values/user_initialization.json") as file:
#             data = json.load(file)
#         users = [User(**item) for item in data]
#         db.session.bulk_save_objects(users)
#         db.session.commit()

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if len(Book.query.all()) == 0:
        populate_books = retrieve_books()
        for x in populate_books:
            print(isinstance (x, Book))
            db.session.add(x)

        db.session.commit()
    if len(BookFormat.query.all()) == 0:
        populate_formats = generate_formats()
        for x in populate_formats:
            print(isinstance (x, BookFormat))
            db.session.add(x)

        db.session.commit()
    if ENV == "development":
        #table initialization
        # user_initialize()
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# This is your test secret API key.
# Stripe.api_key = 'sk_test_51NOm30LDriABBO719nhvoZuy8msaKkmkekKWuLucfqiLlWMxYAdiuPKvGjUi8XIqrtsJ8UW5NUcMFboDWROSV1fS00mXbmKzvJ'
# @app.route('/transaction')
# def stripe_transaction():

#   session = stripe.checkout.Session.create({
#     payment_method_types=['card'],
#     line_items: [{
#       # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
#       price: 'price_1NOmITLDriABBO71zYhNNV1c',
#       quantity: 1,
#     },
#     {
#       # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
#       price: 'price_1NOmITLDriABBO71zYhNNV1c',
#       quantity: 1,
#     }],
#     mode: 'payment',
#     success_url: 'https://carolina-hora-curly-engine-44679qp76gxfj6rq-3000.preview.app.github.dev' + '/success' + '?session_id={CHECKOUT_SESSION_ID}',
#     cancel_url: 'https://carolina-hora-curly-engine-44679qp76gxfj6rq-3000.preview.app.github.dev' + '/cancel',
#   })
# return (checkout_session_id=session['id'],
#         checkout_public_key="pk_test_51NOm30LDriABBO71EslVAUR52crSoSLYDfGJgAF61S1HyL5sxQ63PGMxS2xffxW2x9ugJm1sPSuNfhNibLoODb6M00SiS5BrMT")
#   redirect session.url, 303

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
