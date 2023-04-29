import os
import bcrypt
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


def get_user(username, password_hash):
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'))
    db = client['asim-flashcards']
    return db.users.find_one({'username': username, 'hash': password_hash})


def login_user(username, password):
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'))
    db = client['asim-flashcards']
    user = db.users.find_one({'username': username})
    if user is None:
        return 'Error: Invalid username'
    return 'Success'

def create_user(username, password):
    # Validate the password
    if len(password) < 8:
        return 'Error: Password too short'
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'))
    db = client['asim-flashcards']
    # Make sure the username isn't used yet
    if db.users.count_documents({'username': username}) > 0:
        return 'Error: Username already used'
    # Generate password hash
    salt = bcrypt.gensalt()
    password_hash = str(bcrypt.hashpw(password.encode('utf-8'), salt), 'utf-8')
    db.users.insert_one({
        'username': username,
        'hash': password_hash
    })
    return password_hash
