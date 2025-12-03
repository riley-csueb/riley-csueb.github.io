from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth_db import AuthDb
from book_db import BookDb
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods="*",
        allow_headers="*")
auth = AuthDb()
books = BookDb()

auth.load('db/auth.json')
books.load('db/books.json')


class BookCheckout(BaseModel):
    username: str
    isbn: str


@app.get("/")
def read_root():
    return {}


@app.get("/book_checkout_isbn/{username}_{isbn}")
def checkout_book(username: str, isbn: str):
    return auth.checkout_book(username, isbn, books)


@app.get("/search/name/{book_name}")
def search_book_name(book_name: str):
    return books.get_by_name(book_name)


@app.get("/search/length_rng/{min}_{max}")
def search_book_length(min: int, max: int):
    return books.get_by_length(min, max)


@app.get("/search/author/{author_name}")
def search_book_author(author_name: str):
    return books.get_by_author(author_name)


@app.get("/login/{username}_{password}")
def login(username: str, password: str):
    return auth.login(username, password)


@app.get("/logout/{username}")
def logout(username: str):
    return auth.logout(username)


@app.get("/books/{username}")
def get_books(username: str):
    return auth.get_books(username)


@app.get("/books/debug/all")
def get_all_books():
    return books.get_all()


@app.get("/books/debug/some/{offset}_{count}")
def get_some_books(offset: int, count: int):
    return books.get_some(offset, count)
