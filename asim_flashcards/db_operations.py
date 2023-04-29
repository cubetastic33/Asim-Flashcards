import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


def get_user(username, password_hash):
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'))
    db = client['asim-flashcards']
    return db.users.find_one({'username': username, 'hash': password_hash})
