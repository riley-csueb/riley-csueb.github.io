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

    def get_some(self, offset: int, count: int):
        return self.db[offset:count]

    def get_by_name(self, book_name: str):
        # use lav dist and return books within a certain threshold
        self.db.sort(key=lambda book: book['title'].lower().count(book_name.lower()), reverse=True)
        filter(lambda book: book[''], self.db)
        return self.db[0:10]

    def get_by_author(self, author_name: str):
        self.db.sort(key=lambda book: book['author'].lower().count(author_name.lower()), reverse=True)
        return self.db[0:10]

    def get_by_length(self, min: int, max: int):
        return list(filter(lambda book: book['length'] >= min and book['length'] <= max, self.db))
