
from flask import Flask, request, jsonify, after_this_request, render_template, redirect, url_for
from flask_cors import CORS
import pandas as pd
from flask_restful import Resource, Api
import os

app = Flask(__name__, static_folder='static')
from app import routes
CORS(app)


if __name__ == '__main__':
	# add to correctly run on heroku
    port = int(os.getenv('PORT'))
    app.run(port=port)
