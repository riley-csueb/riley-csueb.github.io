import json

class BookDb():
    def __init__(self):
        self.dbfile = None
        self.db = None

    def load(self, dbfile):
        self.dbfile = dbfile
        try:
            with open(self.dbfile, "r") as f:
                self.db = json.load(f)
        except FileNotFoundError:
            print(f"File {dbfile}, not found")
        except json.JSONDecodeError:
            print("Failed to decode json")

    def get_all(self):
        return self.db

    def get_by_name(self, book_name: str):
        return list(filter(lambda book: book['title'] == book_name, self.db))

    def get_by_author(self, author_name: str):
        return list(filter(lambda book: book['author'] == author_name, self.db))

    def get_by_length(self, min: int, max: int):
        return list(filter(lambda book: book['length'] >= min and book['length'] <= max, self.db))
