import csv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import os
# Check for environment variable
if not os.getenv("DATABASE_URL"):
	raise RuntimeError("DATABASE_URL is not set")

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

with open("books.csv", "r") as file:
	reader = csv.DictReader(file)
	for row in reader:
		isbn = row["isbn"]
		title = row["title"]
		author = row["author"]
		year = row["year"]
		db.execute(("INSERT into books (isbn, title, author, year) VALUES (:isbn, :title, :author, :year)"), 
			{"isbn": isbn, "title": title, "author": author, "year": year})
		db.commit()
