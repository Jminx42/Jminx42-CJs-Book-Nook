from flask import jsonify, url_for
import requests
from api.models import Book, BookFormat
import numbers

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"
def generate_formats():
    print ("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    list_formats = [{"book_format": "eBook", "book_price": 10.99},
             {"book_format": "Paperback", "book_price": 15.99},
             {"book_format": "Hardcover", "book_price": 20.99}, 
             {"book_format": "Audiobook", "book_price": 24.99} ]
    
    format_to_add = [BookFormat(book_format = format["book_format"],
                                book_price = format["book_price"]) for format in list_formats]
    
    return format_to_add
    

def retrieve_books ():
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    result = requests.get('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=emRJGQrXQ32EXbl6ThvjL8JdJcoicGWf')
    data = result.json()
   
    finalbooks = []
    for booklist in data["results"]["lists"]:
        finalbooks += booklist["books"]
    
    unique_books = []
    for x in finalbooks:
        primary_isbn13 = x.get("primary_isbn13")

        if primary_isbn13 and primary_isbn13.isdigit():
            if primary_isbn13 not in [y.get("primary_isbn13") for y in unique_books]:
                unique_books.append(x)
            

    
    for book in unique_books: 
        result_google = requests.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + book["primary_isbn13"] + '&key=AIzaSyAhG7q0MvYbiWzXeuSBlhqNATkUVSKhFq0')
        data_google = result_google.json()
        if "items" in data_google:
            volume_info= data_google["items"][0]["volumeInfo"]
            # image_links = data_google["items"][0]["volumeInfo"]["imageLinks"]
            # book["thumbnail"]= image_links.get("thumbnail", None)
            book["publishedDate"]= volume_info.get("publishedDate", None)
            book["averageRating"]= volume_info.get("averageRating", None)
            book["ratingsCount"]= volume_info.get("ratingsCount", None)
            book["pageCount"]= volume_info.get("pageCount", None)
            book["previewLink"]= volume_info.get("previewLink", None)
            book["publisher"]= volume_info.get("publisher", None)
            book["categories"] = volume_info.get("categories", [])

    book_to_add = [Book(title = book["title"], 
                        author = book["author"], 
                        isbn = book["primary_isbn13"], 
                        book_cover = book.get("book_image", None), 
                        # book_cover_b = book.get("thumbnail", None), 
                        description = book["description"], 
                        year = book.get("publishedDate", None), 
                        genre = book.get("categories", None),
                        average_rating = book.get("averageRating", None), 
                        ratings_count = book.get("ratingsCount", None), 
                        pages = book.get("pageCount", None), 
                        publisher = book.get("publisher", None),
                        preview = book.get("previewLink", None)) for book in unique_books]

   
 
    return book_to_add

   
    # book = Book(title = booklist[0]["title"], author = booklist[0]["author"], isbn = booklist[0]["primary_isbn13"], book_cover = booklist[0]["book_image"], book_cover_b = data_google["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"], description = booklist[0]["description"], year = data_google["items"][0]["volumeInfo"]["publishedDate"], average_rating = data_google["items"][0]["volumeInfo"]["averageRating"], ratings_count = data_google["items"][0]["volumeInfo"]["ratingsCount"], pages = data_google["items"][0]["volumeInfo"]["pageCount"], preview = data_google["items"][0]["volumeInfo"]["previewLink"])
  
    
    #book_cover, this comes from the NY API, and sometimes is null, but has better resolution
    #book_cover_b, this comes from the google book API, is always populated but has less resolution


   