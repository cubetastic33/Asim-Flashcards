from asim_flashcards import app
from flask import render_template, send_from_directory


@app.route('/')
def get_index():
    return render_template('index.html', name='test value')


@app.route('/home')
def get_home():
    return render_template('home.html', name='test value')


@app.route('/start')
def get_start():
    return render_template('start.html', name='test value')


@app.route('/flashcards')
def get_flashcards():
    return render_template('flashcards.html', name='test value')


@app.route('/styles/<path:path>')
def send_styles(path):
    return send_from_directory('../static/styles', path)
