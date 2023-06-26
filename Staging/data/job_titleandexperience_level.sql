select distinct experience_level from global_salaries;
drop table if exists experience_levels;
create table experience_levels (
experience_level VARCHAR NOT NULL,
experience_rank int,
description VARCHAR NOT NULL
);
delete from experience_levels;
insert into experience_levels (experience_level, experience_rank, description)
VALUES
('EN', 1, 'Entry Level'),
('MI', 2, 'Mid Level'),
('SE', 3, 'Senior Level'),
('EX',4,'Executive');

select * from experience_levels;

drop table if exists jot_titles;
create table job_titles (
job_title VARCHAR NOT NULL,
job_rank int
);

delete from job_titles;
insert into job_titles VALUES
('Machine Learning Infrastructure Engineer',1),
('Machine Learning Engineer',1),
('Head of Machine Learning',3),
('Director of Data Science',4),
('Data Scientist',1),
('Computer Vision Engineer',1),
('Lead Data Analyst',2),
('Data Engineering Manager',3),
('Big Data Architect',3),
('Data Analytics Lead',2),
('Machine Learning Scientist',1),
('Analytics Engineer',1),
('Product Data Analyst',1),
('Lead Machine Learning Engineer',2),
('Data Science Manager',3),
('Machine Learning Manager',3),
('Data Science Consultant',1),
('BI Data Analyst',1),
('Applied Data Scientist',1),
('Data Analyst',1),
('Staff Data Scientist',2),
('Data Specialist',1),
('Marketing Data Analyst',1),
('Lead Data Engineer',2),
('Data Analytics Manager',3),
('Cloud Data Engineer',1),
('ETL Developer',1),
('Data Analytics Engineer',1),
('Head of Data Science',3),
('ML Engineer',1),
('Financial Data Analyst',1),
('AI Scientist',1),
('NLP Engineer',1),
('Computer Vision Software Engineer',1),
('Big Data Engineer',1),
('Data Architect',3),
('Lead Data Scientist',2),
('Research Scientist',1),
('Data Engineer',1),
('Head of Data',3),
('Principal Data Scientist',3),
('Finance Data Analyst',1),
('Data Science Engineer',1),
('Director of Data Engineering',4),
('3D Computer Vision Researcher',1),
('Principal Data Analyst',1),
('Principal Data Engineer',1),
('Applied Machine Learning Scientist',1),
('Business Data Analyst',1),
('Machine Learning Developer',1);
select * from job_titles;

delete from job_titles where job_title in ( select distinct job_title from global_salaries where work_year in (2020,2021,2022)
and job_title not in 
(select distinct job_title from global_salaries where work_year = 2022)
);