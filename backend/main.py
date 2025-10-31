from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth_db import AuthDb
from book_db import BookDb

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


@app.get("/")
def read_root():
    return {}


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
    return auth.check_auth(username, password)


@app.get("/logout/{username}")
def logout(username: str):
    return auth.logout(username)


@app.get("/books/{username}")
def get_books(username: str):
    return auth.get_books(username)
