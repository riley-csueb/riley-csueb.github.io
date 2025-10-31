# NOTE: I am aware that this auth is not good
# It is a mock auth, because I don't want to pay for
# real auth
import json


class AuthDb:
    def __init(self):
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

    def check_auth(self, username: str, password: str) -> object:
        entry = list(filter(lambda user: user['username'] == username, self.db))
        if len(entry) == 1 and entry[0]['password'] == password:
            return { 'status': 'ok', 'username': username, 'books': entry[0]['books']}
        return { 'status': 'fail' }

    def login(self, username: str, password: str) -> object:
        if self.isloggedin(username):
            return { 'status': 'error', 'reason': f'User {username} already logged in' }
        result = self.check_auth(username, password)
        if result['status'] == 'fail':
            return result
        self.loggedin.append(username)
        return result

    def logout(self, username: str) -> object:
        if not self.isloggedin(username):
            print("Something is very wrong. A user tried to log out that never logged in")
            return { 'status': 'error', 'reason': f'User {username} tried to log out, but they never logged in' }
        self.loggedin.remove(username)
        return { 'status': 'ok' }
