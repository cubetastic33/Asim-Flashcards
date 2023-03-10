from asim_flashcards import app
from flask import render_template

@app.route('/')
def get_index():
    return render_template('index.html', name='test value')
