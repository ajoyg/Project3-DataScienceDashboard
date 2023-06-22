# Import the dependencies.

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime
import psycopg2

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
# engine = create_engine('postgresql+psycopg2://brandon_reed_srg:postgres@localhost:5342/Salaries')
engine = create_engine("postgresql+psycopg2://postgres:postgres@localhost:5432/DataScience_Jobs")

# reflect an existing database into a new model
# Base = automap_base()

# # reflect the tables
# Base.prepare(autoload_with=engine)

# # Save references to each table
# salaries = Base.classes.global_salaries
# sector_list = Base.classes.sectors

# # Create our session (link) from Python to the DB
# session = Session(engine)


#################################################
# Flask Setup
#################################################
app = Flask(__name__)



#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    session=Session(engine)
    results_exp = engine.execute('SELECT distinct experience_level FROM global_salaries where work_year=2022')
    results_job = engine.execute('SELECT distinct job_title FROM global_salaries where work_year=2022')
    experience_list = []
    job_title_list = []
    for experience, job_title in results:
        experience_list.append(experience)
        job_title_list.append(job_title)
        data = [experience_list, job_title_list]
    session.close()
    

    return render_template('index.html', exp_job_data=data)
        # f"Available Routes:<br/>"
        # f"/api/v1.0/bytitlechart<br/>"
        # f"/api/v1.0/byexperiencelevel<br/>"
        # f"/api/v1.0/byyear<br/>"
        # f"/api/v1.0/countbysector<br/>"
        # f"/api/v1.0/bubblemap<br/>"
        # 
@app.route('/CountBySector')
def countBySector:

    return render_template('Count.html')


@app.route("/api/v1.0/bytitlechart")
def bytitlechart():

    session=Session(engine)
    results = engine.execute("SELECT AVG(salary_in_usd), job_title, experience_level FROM global_salaries GROUP BY job_title,experience_level")
    session.close()
    results_list=[]
    for salary, job, experience in results:
        dict={}
        dict['salary']= round(float(salary),2)
        dict['job_title']= job
        dict['experience_level']= experience
        results_list.append(dict)
    return jsonify(results_list)


@app.route("/api/v1.0/byexperiencelevel")
def experiencelevel():

    session=Session(engine)
    results = engine.execute("SELECT experience_level, AVG(salary_in_usd) AS average_salary FROM global_salaries GROUP BY experience_level")
    session.close()
    results_list= []
    for experience, salary in results:
        dict={}
        dict['experience_level']= experience
        dict['salary']= round(float(salary),2)
        results_list.append(dict)
    return jsonify(results_list)



@app.route("/api/v1.0/byyear")
def yearchart():

    session=Session(engine)
    results = engine.execute("SELECT avg(salary_in_usd), work_year, employee_residence FROM global_salaries GROUP BY work_year, employee_residence")
    session.close()
    results_list= []
    for salary, year, country in results:
        dict={}
        dict['salary']= round(float(salary),2)
        dict['year']= int(year)
        dict['country']= country
        results_list.append(dict)
    return jsonify(results_list)


@app.route("/api/v1.0/countbysector")
def countsector():

    session=Session(engine)
    results = engine.execute("SELECT industry, COUNT(industry) FROM sectors GROUP BY industry ORDER BY COUNT(industry) DESC")
    session.close()
    results_list= []
    for industry, count in results:
        dict={}
        dict['industry']= industry
        dict['count']= int(count)
        results_list.append(dict)
    return jsonify(results_list)


@app.route("/api/v1.0/bubblemap")
def bubblemap():

    session=Session(engine)
    results = engine.execute('SELECT experience_level, job_title, avg(salary), salary_currency,avg(salary_in_usd), company_location, avg(latitude), avg(longitude) FROM global_salaries where work_year=2022 GROUP BY experience_level, job_title, company_location, salary_currency')
    session.close()

    results_list=[]
    for experience, job, salary, currency, usd, location, latitude, longitude in results:
        dict={}
        dict['experience']= experience
        dict['job_title']= job
        dict['average_salary']= round(float(salary),2)
        dict['salary_currency']= currency
        dict['salary_in_usd']= round(float(usd),2)
        dict['company_location']= location
        dict['latitude']= latitude
        dict['longitude']= longitude
        results_list.append(dict)

    return jsonify(results_list)



if __name__ == '__main__':
    app.run(debug=True)
