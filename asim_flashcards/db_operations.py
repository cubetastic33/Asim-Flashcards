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
        return 'Error: Invalid credentials'
    password_hash = user['hash']
    if bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
        return password_hash
    return 'Error: Invalid credentials'

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

def get_deck(deck_name):
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'))
    db = client['asim-flashcards']
    return db.decks.find_one({'deck_name': deck_name})

def create_deck(deck_name):
    #Validate deck name
    if len(deck_name) < 0:
        return 'Error: Deck name is empty'
    # Create new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'))
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
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'))
    db = client['asim-flashcards']
    flashcards = db['flashcards']
    flashcards.insert_one({
        'deck_name': deck_name,
        'front': front,
        'back': back
    })
    

def get_flashcards_from_deck(deck_name):
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'))
    db = client['asim-flashcards']
    flashcards = db['flashcards']
    matching_flashcards = []
    for flashcard in list(flashcards.find({})):
        if flashcard['deck_name'] == deck_name:
            matching_flashcards.append({'front': flashcard['front'], 'back': flashcard['back']})
    return matching_flashcards