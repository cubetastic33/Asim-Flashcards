import os
import bcrypt
import certifi
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


def get_user(email, password_hash):
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    return db.users.find_one({'email': email, 'hash': password_hash})


def login_user(email, password):
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    user = db.users.find_one({'email': email})
    if user is None:
        return 'Error: Invalid credentials'
    password_hash = user['hash']
    if bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
        return password_hash
    return 'Error: Invalid credentials'


def create_user(name, email, password):
    # Validate the password
    if len(password) < 8:
        return 'Error: Password too short'
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    # Make sure the email isn't used yet
    if db.users.count_documents({'email': email}) > 0:
        return 'Error: Email already used'
    # Generate password hash
    salt = bcrypt.gensalt()
    password_hash = str(bcrypt.hashpw(password.encode('utf-8'), salt), 'utf-8')
    db.users.insert_one({
        'name': name,
        'email': email,
        'hash': password_hash
    })
    return password_hash


def update_user(new_name, new_email, email, password_hash):
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    result = db.users.update_one({'email': email, 'hash': password_hash},
                                 {'$set': {'name': new_name, 'email': new_email}})
    if result.matched_count == 0:
        return 'Error: Not logged in'
    return 'Success'


def update_password(new_password, current_password, email, password_hash):
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    user = db.users.find_one({'email': email, 'hash': password_hash})
    if user is None:
        return 'Error: Not logged in'
    if not bcrypt.checkpw(current_password.encode('utf-8'), password_hash.encode('utf-8')):
        return 'Error: Current password is incorrect'
    # Generate password hash
    salt = bcrypt.gensalt()
    new_hash = str(bcrypt.hashpw(new_password.encode('utf-8'), salt), 'utf-8')
    db.users.update_one({'email': email, 'hash': password_hash}, {'$set': {'hash': new_hash}})
    return new_hash


def get_deck(deck_name):
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    return db.decks.find_one({'deck_name': deck_name})


def create_deck(deck_name):
    # Validate deck name
    if len(deck_name) < 0:
        return 'Error: Deck name is empty'
    # Create new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    # Check if deck exists
    if db.decks.count_documents({'deck_name': deck_name}) > 0:
        return 'Error: Deck already exists'
    # Add deck to db
    db.decks.insert_one({
        'deck_name': deck_name
    })
    return deck_name


def add_flashcard_to_deck(deck_name, front, back):
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    flashcards = db['flashcards']
    flashcards.insert_one({
        'deck_name': deck_name,
        'front': front,
        'back': back
    })


def get_flashcards_from_deck(deck_name):
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    flashcards = db['flashcards']
    matching_flashcards = []
    for flashcard in list(flashcards.find({})):
        if flashcard['deck_name'] == deck_name:
            matching_flashcards.append({'front': flashcard['front'], 'back': flashcard['back']})
    return matching_flashcards
