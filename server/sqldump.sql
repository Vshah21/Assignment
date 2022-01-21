CREATE TABLE users (
  id serial primary key,
  firstName varchar(255)  NOT NULL,
  lastName varchar(255)  NOT NULL,
  email varchar(255)  NOT NULL,
  password varchar(255)  NOT NULL
);

INSERT INTO users (id,firstName,lastName,email,password)
    VALUES
        (1,'Anona','Cruz','anona@gmail.com','1234'),
        (2,'Camilla','Sayer','camilla@gmail.com','1234'),
        (3,'Ganesh','Zentai','ganesh@gmail.com','1234'),
        (4,'Vivien','Straub','vivien@gmail.com','1234'),
        (5,'Bernardita','Bishop','bernardita@gmail.com','1234');

CREATE TABLE favourite_movies (
 
   favourites varchar(255)[] NOT NULL,
   user_id integer references users (id)
);

INSERT INTO favourite_movies (favourites,user_id)
    VALUES
        ('{"tt0848228","tt4154756","tt2395427","tt4154796"}',1),
        ('{"tt4154756","tt10515848","tt0120575"}',2),
        ('{"tt0287871","tt2975590","tt0103776","tt4116284","tt2313197"}',3),
        ('{"tt0926084","tt0417741"}',4),
        ('{"tt0389860"}',5);



-- add into array
update favourite_movies 
set favourites = array_append(favourites, 'tt3245430')
where user_id=1;


--removie from array
update favourite_movies
set favourites = array_remove(favourites,'tt3245430')
where user_id=1;