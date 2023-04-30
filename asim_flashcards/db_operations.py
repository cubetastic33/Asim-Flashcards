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
    # Create a new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    # Return the deck that matches the deck_name
    return db.decks.find_one({'deck_name': deck_name})


def get_all_decks(email, password_hash):
    # Create new client and connect to the server
    print("hi")
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']

    # Get user
    user = db.users.find_one({'email': email, 'hash': password_hash})
    user_id = user.get('_id')

    # Find all decks for the user
    decks = db.decks.find({'user_id': user_id})

    # Extract deck information into a list
    deck_list = [{'deck_name': deck['deck_name'],
                  'new_cards': deck.get('new_cards', 0),
                  'review_cards': deck.get('review_cards', 0)}
                 for deck in decks]

    print(f"User: {user}")
    print(f"Decks: {list(decks)}")
    print(f"Deck List: {deck_list}")

    return deck_list


def delete_deck(email, password_hash, deck_name):
    # Create new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']

    # Get user
    user = db.users.find_one({'email': email, 'hash': password_hash})
    user_id = user.get('_id')

    # Delete deck
    db.decks.delete_one({'user_id': user_id, 'deck_name': deck_name})

    return 'Success'


def create_deck(deck_name, email, password_hash):
    # Validate deck name
    if len(deck_name) < 1:
        return 'Error: Deck name is empty'
    # Create new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    # Get user
    user = db.users.find_one({'email': email, 'hash': password_hash})
    user_id = user.get('_id')
    # Check if deck exists
    if db.decks.count_documents({'deck_name': deck_name, 'user_id': user_id}) > 0:
        return 'Error: Deck already exists'
    # Add deck to db
    db.decks.insert_one({
        'deck_name': deck_name,
        'user_id': user_id,
        'new_cards': 0,
        'review_cards': 0
    })
    return deck_name


def add_flashcard_to_deck(deck_name, email, password_hash, front, back):
    # Create new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    # Get user and deck id
    user = db.users.find_one({'email': email, 'hash': password_hash})
    user_id = user.get('_id')
    deck = db.decks.find_one({'user_id': user_id, 'deck_name': deck_name})
    deck_id = deck.get('_id')

    # Get the current number of new cards
    new_cards = deck.get('new_cards', 0)

    # Add flashcard to a deck
    flashcards = db['flashcards']
    flashcards.insert_one({
        'deck_name': deck_name,
        'front': front,
        'back': back,
        'deck_id': deck_id,
        'new_cards': new_cards
    })
    print(new_cards)

    # Update the deck's new cards count
    db.decks.update_one({'_id': deck_id}, {'$set': {'new_cards': new_cards + 1}})


def get_flashcards_from_deck(deck_name, email, password_hash):
    # Create new client and connect to the server
    client = MongoClient(os.environ['MONGODB_URI'], server_api=ServerApi('1'),
                         tlsCaFile=certifi.where())
    db = client['asim-flashcards']
    # Get user and deck id
    user = db.users.find_one({'email': email, 'hash': password_hash})
    user_id = user.get('_id')
    deck = db.decks.find_one({'user_id': user_id})
    deck_id = deck.get('_id')
    # Get all flashcard for the deck
    flashcards = db['flashcards']
    matching_flashcards = []
    for flashcard in list(flashcards.find({})):
        if flashcard['deck_name'] == deck_name and flashcard['deck_id'] == deck_id:
            matching_flashcards.append({'front': flashcard['front'], 'back': flashcard['back']})
    return matching_flashcards
