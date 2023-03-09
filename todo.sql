--drop table todo

CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task varchar(255),
	priority_Lev varchar(10),
	status_Comp boolean not null
);

insert into todo (task, priority_Lev, status_Comp)
values('Create a Todo App', 'High', true)

select * from todo