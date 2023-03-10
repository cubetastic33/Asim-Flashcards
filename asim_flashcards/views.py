from asim_flashcards import app
from flask import render_template, send_from_directory


@app.route('/')
def get_index():
    return render_template('index.html', name='test value')


@app.route('/styles/<path:path>')
def send_styles(path):
    return send_from_directory('../static/styles', path)
