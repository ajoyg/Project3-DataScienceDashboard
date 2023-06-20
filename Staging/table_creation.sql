-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Sectors" (
    "job_title" varchar   NOT NULL,
    "salary_estimate" varchar   NOT NULL,
    "rating" float   NOT NULL,
    "company_name" varchar   NOT NULL,
    "city" varchar   NOT NULL,
    "state" varchar   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "size" varchar   NOT NULL,
    "type_of_ownership" varchar   NOT NULL,
    "industry" varchar   NOT NULL,
    "sector" varchar   NOT NULL,
    "revenue" varchar   NOT NULL,
    "min_salary" int   NOT NULL,
    "max_salary" int   NOT NULL,
    "avg_salary" int   NOT NULL,
    "job_state" varchar   NOT NULL,
    "same_state" int   NOT NULL,
    "company_age" int   NOT NULL,
    "python" int   NOT NULL,
    "excel" int   NOT NULL,
    "hadoop" int   NOT NULL,
    "spark" int   NOT NULL,
    "aws" int   NOT NULL,
    "tableau" int   NOT NULL,
    "big_data" int   NOT NULL,
    "job_simp" varchar   NOT NULL,
    "seniority" varchar   NOT NULL
);


CREATE TABLE "Global_Salaries" (
    "work_year" int   NOT NULL,
    "experience_level" varchar   NOT NULL,
    "employment_type" varchar   NOT NULL,
    "job_title" varchar   NOT NULL,
    "salary" int   NOT NULL,
    "salary_currency" varchar   NOT NULL,
    "salary_in_usd" int   NOT NULL,
    "employee_residence" varchar   NOT NULL,
    "remote_ratio" int   NOT NULL,
    "company_location" varchar   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "company_size" varchar   NOT NULL
);

select * from "Global_Salaries"
