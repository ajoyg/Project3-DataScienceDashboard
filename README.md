# Project3- Data Science Jobs and Salaries

## Contributors: Ajay Gopalkrishna, Harman Malhi, Sarah Kim, Portia Pray, Brandon Reed

### Problem Overview
Navigating the job search process can be time-consuming and challenging, particularly when it comes to determining suitable roles and setting realistic salary expectations especially for careers in data science.

### Introduction
Our goal is to create a dynamic dashboard that offers job seekers in the data science field the ability to explore a wide range of roles tailored to their specific preferences and priorities. By incorporating customizable filters, users can personalize their search based on factors such as work experience level, job title, location, and availability of remote work option. This tool will enable job seekers to approach job interviews with informed salary expectations and help them make more informed career decisions. 

### Data Sources
https://www.kaggle.com/datasets/ruchi798/data-science-job-salaries?select=ds_salaries.csv 

https://www.kaggle.com/datasets/rashikrahmanpritom/data-science-job-posting-on-glassdoor?select=Uncleaned_DS_jobs.csv

### Data Science Salary Dashboard
The dashboard has the following charts:
1. Average salary in US dollars by experience level (EN- Entry Level, MI- Mid Level, SE- Senior Level, EX - Executive). The data is aggregated from 2020 to 2022.across all countries and job titles.
2. Average salary by country from 2020 to 2022, filtered by country.
3. Average salary by job title from 2020 to 2022, filtered by experience level.
4. Top 10 sectors for data science jobs in the United States.
5. Average salary in 2022 by company location filtered by experience level and job title.

![Dashboard](https://github.com/ajoyg/Project3-DataScienceDashboard/blob/main/images/DataScienceSalaryDashboard.jpg)

### Directions: 
- To run the Flask app, you will need to create the necessary SQL databases in pgAdmin. 
- Open the Staging folder and then the data folder, where you’ll find two .sql scripts to run in pgAdmin. Once your tables are created, import the two CSV files into the database. 
- Open the Flask folder and run the Flask app (app.py). 
- When you open your local server, add “/SalaryDashboard” to the URL to view the Data Salary Jobs Dashboard. 
