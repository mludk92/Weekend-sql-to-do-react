CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task varchar(255),
	priority varchar(10)
);

insert into todo (task, priority)
values('Create a Todo App', 'High')