import os
import requests

from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import requests

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


@app.route("/")
def index():
	# res = requests.get("https://www.goodreads.com/book/review_counts.json", params={"key": "Y3TmEiIcidSCkmc66KQ", "isbns": "9781632168146"})
	# print(res.json())
	return render_template("index.html")

@app.route("/login", methods = ["GET", "POST"])
def login():

	"""Log user in"""
	# Forget any user_info
	session.clear()
	# User reached route via POST (as by submitting a form via POST)
	if request.method == "POST":

		# Ensure username was submitted
		if not request.form.get("username"):
			return render_template("error.html", error = "Please give a username")

		# Ensure password was submitted
		elif not request.form.get("password"):
			return render_template("error.html", error = "Please give a password")

		# Query database for username
		user = request.form.get("username")
		rows = db.execute(("SELECT * FROM users WHERE username = :username"),{"username": user}).fetchall()

		# Ensure username exists and password is correct
		if len(rows) != 1 or not rows[0]["password"] == request.form.get("password"):
			return render_template("error.html", error = "That password is incorrect")

		# Remember which user has logged in
		session["user_id"] = rows[0]["id"]

		# Redirect user to home page
		return redirect("/search")

	# User reached route via GET (as by clicking a link or via redirect)
	return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return render_template("error.html", error = "please provide a username")
        elif not request.form.get("password"):
            return render_template("error.html", error = "must provide password")
        elif request.form.get("password") != request.form.get("password confirm"):
            return render_template("error.html",error = "Passwords do not match")
        else:
            user = request.form.get("username")
            print(user)
            rows = db.execute(("SELECT * FROM users WHERE username = :username"),{"username": user}).fetchall()
            db.commit()
            print(rows)
            if len(rows) != 0:
                return render_template("error.html", error = "That username is already taken")
            else:
                passw = request.form.get("password")
                db.execute(("INSERT INTO users (username, password) VALUES (:username, :password)"),{"username": user, "password": passw})
                db.commit()
                return redirect("/")
    else:
        return render_template("register.html")

@app.route("/logout")
def logout():
	"""Log user out"""

	# Forget any user_id
	session.clear()

	# Redirect user to login form
	return redirect("/")

@app.route("/search", methods = ["GET", "POST"])
def search():
	"""Search for books"""
	if request.method == "POST":
		result = None
		if not request.form.get("query"):
			return render_template("error.html", error = "Please provide the search information")
		if request.form.get("searchlist") == "isbn":
			isbn = request.form.get("query")
			isbn = "%"+isbn+"%"
			result = db.execute(("SELECT * FROM books WHERE isbn LIKE :isbn"), {"isbn": isbn}).fetchall()
		if request.form.get("searchlist") == "author":
			author = request.form.get("query")
			author = "%"+author+"%"
			result = db.execute(("SELECT * FROM books WHERE author LIKE :author"), {"author": author}).fetchall()
		if request.form.get("searchlist") == "title":
			title = request.form.get("query")
			title = "%"+title+"%"
			result = db.execute(("SELECT * FROM books WHERE title LIKE :title"), {"title": title}).fetchall()
		print(result)
		if len(result) == 0:
			return render_template("error.html", error = "There were no results for your search")
		return render_template("searchresult.html", books = result)
	return render_template("search.html")

@app.route("/book/<book>", methods = ["GET", "POST"])
def book(book):
	if request.method == "POST":
		if not request.form.get("text"):
			return render_template("error.html", error = "Please leave a review")
		if not request.form.get("rating"):
			return render_template("error.html", error = "Please leave a rating")
		result = db.execute(("SELECT * FROM reviews_submitted WHERE user_id = :user_id AND book_isbn = :book_isbn"), {"user_id": session["user_id"], "book_isbn": book}).fetchall()
		if len(result) != 0:
			return render_template("error.html", error = "You have already submitted a review")
		rating = request.form.get("rating")
		textr = request.form.get("text")
		db.execute(("INSERT INTO reviews (rating, text, book_id) VALUES (:rating, :textr, :book_id)"), {"rating": rating, "textr": textr, "book_id": book})
		db.execute(("INSERT INTO reviews_submitted (user_id, book_isbn) VALUES (:user_id, :book_isbn)"), {"user_id": session["user_id"], "book_isbn": book})
	result = db.execute(("SELECT * FROM books WHERE isbn = :isbn"), {"isbn": book}).fetchall()
	reviews = db.execute(("SELECT * FROM reviews WHERE book_id = :isbn"), {"isbn": book}).fetchall()
	response = requests.get("https://www.goodreads.com/book/review_counts.json?isbns="+book+"&key=Y3TmEiIcidSCkmc66KQ")
	response = response.json()
	print(response)
	ratings = response["books"][0]["ratings_count"]
	avgrating = response["books"][0]["average_rating"]
	db.commit()
	book = "/book/" + book
	return render_template("book.html", book = result, reviews = reviews, route = book, avgrating = avgrating, ratings = ratings)

@app.route("/api/<book>")
def api(book):
	result = db.execute(("SELECT * FROM books WHERE isbn = :isbn"), {"isbn": book}).fetchall()
	if len(result) == 0:
		return render_template("error.html", error = "Book Not Found"), 404
	response = requests.get("https://www.goodreads.com/book/review_counts.json?isbns="+book+"&key=Y3TmEiIcidSCkmc66KQ")
	response = response.json()
	ratings = response["books"][0]["ratings_count"]
	avgrating = response["books"][0]["average_rating"]
	return jsonify(title=result[0]["title"],
		author=result[0]["author"],
 		year=result[0]["year"],
 		isbn = book,
 		review_count = ratings,
 		average_score = avgrating)









