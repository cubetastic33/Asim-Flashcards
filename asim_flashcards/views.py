import os
from asim_flashcards import app
from flask import render_template, send_from_directory, send_file


@app.route('/')
def get_index():
    return render_template('index.html', name='test value')

@app.route('/home')
def get_home():
    return render_template('home.html', name='test value')

@app.route('/navbar')
def get_navbar():
    return render_template('navbar.html', name='test value')

@app.route('/navbar.js')
def get_navbarjs():
    return render_template('navbar.js')

@app.route('/timer.js')
def get_timerjs():
    return render_template('timer.js')

@app.route('/start')
def get_start():
    return render_template('start.html', name='test value')

@app.route('/calendar')
def get_calendar():
    return render_template('calendar.html', name='test value')

@app.route('/calendar.js')
def get_calendarjs():
    return render_template('calendar.js')

@app.route('/flashcards')
def get_flashcards():
    return render_template('flashcards.html', name='test value')

<<<<<<< HEAD
@app.route('/about')
def get_about():
    return render_template('about.html', name='test value')

@app.route('/login')
def get_login():
    return render_template('login.html', name='test value')

@app.route('/study')
def get_study():
    return render_template('study.html', name='test value')

@app.route('/get_sound')
def get_sound():
    return send_file('templates/complete.wav', mimetype='audio/wav')

@app.route('/styles/<path:path>')
def send_styles(path):
    return send_from_directory('../static/styles', path)

@app.route('/settings')
def get_setting():
    return render_template('settings.html', name='test value')

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('../static/images', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('../static/js', path)