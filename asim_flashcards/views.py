import os
from asim_flashcards import app
from flask import render_template, send_from_directory, send_file


@app.route('/')
def get_index():
    return render_template('home.html', name='test value')

@app.route('/navbar')
def get_navbar():
    return render_template('navbar.html', name='test value')

@app.route('/start')
def get_start():
    return render_template('start.html', name='test value')

@app.route('/calendar')
def get_calendar():
    return render_template('calendar.html', name='test value')

@app.route('/flashcards')
def get_flashcards():
    return render_template('flashcards.html', name='test value')

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
