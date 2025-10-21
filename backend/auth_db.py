# NOTE: I am aware that this auth is not good
# It is a mock auth, because I don't want to pay for
# real auth
import json


class AuthDb:
    def __init(self):
        self.dbfile = None
        self.db = {}

    def load(self, dbfile: str):
        self.dbfile = dbfile
        try:
            with open(self.dbfile, "r") as f:
                self.db = json.load(f)
        except FileNotFoundError:
            print(f"File {dbfile}, not found")
        except json.JSONDecodeError:
            print("Failed to decode json")
    
    def check_auth(self, username: str, password: str) -> bool:
        entry = list(filter(lambda user: user['username'] == username, self.db))
        if len(entry) == 1 and entry[0]['password'] == password:
            return { 'status': 'ok', 'username': username }
        return { 'status': 'fail' }
