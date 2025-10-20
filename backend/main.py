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
book = BookDb()
book.load('books.json')


@app.get("/")
def read_root():
    return {}


@app.get("/search/name/{book_name}")
def search_book_name(book_name: str):
    return book.get_by_name(book_name)


@app.get("/search/length_rng/{min}_{max}")
def search_book_length(min: int, max: int):
    return book.get_by_length(min, max)


@app.get("/search/author/{author_name}")
def search_book_author(author_name: str):
    return book.get_by_author(author_name)
