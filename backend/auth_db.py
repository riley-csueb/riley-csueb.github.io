# NOTE: I am aware that this auth is not good
# It is a mock auth, because I don't want to pay for
# real auth
import json
from book_db import BookDb

class AuthDb:
    def __init__(self):
        self.dbfile = None
        self.db = {}
        self.loggedin = []

    def load(self, dbfile: str):
        self.dbfile = dbfile
        try:
            with open(self.dbfile, "r") as f:
                self.db = json.load(f)
        except FileNotFoundError:
            print(f"File {dbfile}, not found")
        except json.JSONDecodeError:
            print("Failed to decode json")

    def save(self):
        with open(self.dbfile, "w") as f:
            json.dump(self.db, f, sort_keys=True, indent=4, default=list)

    def check_auth(self, username: str, password: str) -> object:
        entry = list(filter(lambda user: user['username'] == username, self.db))
        if len(entry) == 1 and entry[0]['password'] == password:
            return { 'status': 'ok', 'username': username, 'books': entry[0]['books']}
        return { 'status': 'fail' }

    def login(self, username: str, password: str) -> object:
        print(self.loggedin)
        if self.isloggedin(username):
            print("LOGIN: Already logged in")
            return { 'status': 'error', 'reason': f'User {username} already logged in' }
        result = self.check_auth(username, password)
        if result['status'] == 'fail':
            print("LOGIN: Failed to check auth")
            return result
        self.loggedin.append(username)
        print(f"LOGIN: ${self.loggedin}")
        return result

    def logout(self, username: str) -> object:
        print(self.loggedin, username)
        if not self.isloggedin(username):
            print("Something is very wrong. A user tried to log out that never logged in")
            return { 'status': 'error', 'reason': f'User {username} tried to log out, but they never logged in' }
        self.loggedin.remove(username)
        return { 'status': 'ok' }

    def isloggedin(self, username: str) -> bool:
        return username in self.loggedin

    def get_books(self, username: str) -> []:
        if not self.isloggedin(username):
            return { 'status': 'fail', 'reason': f'{username} not logged in'}
        print(self.db)
        user = list(filter(lambda user: user['username'] == username, self.db))
        return user[0]['books']

    def does_user_have_book(self, username: str, isbn: int) -> bool:
        sisbn = f'${isbn}'
        user = list(filter(lambda user: user['username'] == username, self.db))
        userbooks = user[0]['books']
        isbn = list(filter(lambda book: book['isbn'] == isbn, userbooks))
        return len(isbn) != 0

    def checkout_book(self, username: str, isbn: str, book_db: BookDb):
        book = book_db.get_by_isbn(isbn)
        if book is None:
            return {'status': 'fail', 'reason': f'could not find book with isbn {isbn}'}
        if (self.does_user_have_book(username, isbn)):
            return {'status': 'fail', 'reason': f'user {username} already has {isbn} checked out'}
        user = list(filter(lambda user: user['username'] == username, self.db))
        user[0]['books'].append({'isbn': isbn})
        self.save()

        return {'status': 'ok', 'book': book}
