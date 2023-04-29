import json
from asim_flashcards import app
from flask import render_template, send_from_directory, send_file, request, redirect, make_response
from asim_flashcards.db_operations import get_user, login_user, create_user, get_deck, create_deck, get_flashcards_from_deck, add_flashcard_to_deck


@app.route('/')
def get_index():
    username = request.cookies.get('username')
    password_hash = request.cookies.get('password_hash')
    if get_user(username, password_hash):
        return render_template('home.html', name='test value')
    return redirect('/login')

@app.route('/start')
def get_start():
    return render_template('start.html', name='test value')

@app.route('/calendar')
def get_calendar():
    return render_template('calendar.html', name='test value')

@app.route('/about')
def get_about():
    return render_template('about.html', name='test value')

@app.route('/login')
def get_login():
    return render_template('login.html', name='test value')

@app.route('/signup')
def get_signup():
    return render_template('signup.html', name='test value')

@app.route('/study')
def get_study():
    return render_template('study.html', name='test value')

@app.route('/settings')
def get_settings():
    return render_template('settings.html', name='test value')

@app.route('/get_sound')
def get_sound():
    return send_file('../static/complete.wav', mimetype='audio/wav')

@app.route('/styles/<path:path>')
def send_styles(path):
    return send_from_directory('../static/styles', path)

@app.route('/scripts/<path:path>')
def send_js(path):
    return send_from_directory('../static/scripts', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('../static/images', path)

@app.route('/login_user', methods=['POST'])
def post_login_user():
    result = login_user(request.form['username'].strip(), request.form['password'].strip())
    if result.startswith('Error'):
        # There was an error logging in
        return json.dumps(result)
    # The user credentials were correct
    resp = make_response(json.dumps('Success'))
    resp.set_cookie('username', request.form['username'].strip())
    resp.set_cookie('password_hash', result)
    return resp

@app.route('/signup_user', methods=['POST'])
def signup_user():
    if request.form['password'] != request.form['confirm_password']:
        return json.dumps('Error: Passwords should match')
    result = create_user(request.form['username'].strip(), request.form['password'].strip())
    if result.startswith('Error'):
        # There was an error creating the user
        return json.dumps(result)
    # The user has been created
    resp = make_response(json.dumps('Success'))
    resp.set_cookie('username', request.form['username'].strip())
    resp.set_cookie('password_hash', result)
    return resp


@app.route('/create_deck', methods=['POST'])
def post_create_deck():
    result = create_deck(request.form['name'])
    if 'Error' in result:
        return json.dumps(result)
    # Added deck
    resp = make_response(json.dumps('Success'))
    return resp

@app.route('/create_flashcard', methods=['POST'])
def post_create_flashcard():
    deck_name = request.form['name']
    front = request.form['front']
    back = request.form['back']
    add_flashcard_to_deck(deck_name, front, back)
    resp = make_response(json.dumps('Success'))
    return resp

@app.route('/get_flashcards', methods=['GET'])
def post_get_flashcards():
    deck_name = request.args.get('name')
    return json.dumps(get_flashcards_from_deck(deck_name))
    
