import numpy as np
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime
import psycopg2
from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################

engine = create_engine("postgresql+psycopg2://postgres:postgres@localhost:5432/DataScience_Jobs")

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available API routes."""
    return render_template('index.html')


@app.route("/api/v1.0/byexperiencelevel")
def experiencelevel():
    session = Session(engine)

    results = session.execute("SELECT experience_level, AVG(salary_in_usd) AS average_salary FROM global_salaries GROUP BY experience_level")

    results_list = []
    for experience, salary in results:
        dict = {'experience_level': experience, 'ave_salary': round(float(salary), 2)}
        results_list.append(dict)

    return jsonify(results_list)


if __name__ == '__main__':
    app.run(debug=True)

