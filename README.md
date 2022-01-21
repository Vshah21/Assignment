# Assignment
Simple SPA using Javascript, Node, PostgresSql ,Postman to display users favourite movies using the OMDB API (https://www.omdbapi.com)

## Assumptions
The website will need a server/webserver to communicate with the database and send data to the front-end

The frontend will need to fetch data from the OMDB API and the database and display to the webpage. 

SPA - Single Page Application, should use a single page and not redirect to load an entire new page.

## Technology Choice
PostgresSql - Arrays can be used, it was easier to structure and extract data general. 

Nodejs - It is easier to use and understand in my opinion.

Javascript - It is a simple and easy to understand. I tried to use React but need to understand how it is used and practice more using react. 

## Solution

- Created a login page. If login details are correct it displays the favourite movies for the user logged in.

## Struggle
- Struggled with understanding promises and how to use the async and await method in javascript.


- Tried to use react as an alternative for the front-end. Managed to authenticate and log the user in but could not fetch the data from the api.


## Testing

- Postman API platform- used to send requests and retrieve data to and from the database in a JSON format for testing purposes.

## Next Steps
- Convert the front-end from Javascript to React.

- Add a Register feature to allow new users to access the website.

- Add feature that adds the movie to the users favourites.

-The web page needs routing to different pages but still following the SPA rule. A react router dom dependency can be used in react.

- Even though pg-promise is a good interface for nodejs, it only allows PostgresSql as a database which can be restricting if you would like to use another database. There are other tools such as knex.js, pg to connect and send requests to the database.

## Security issues

- The password is not encrytpted in the database. Bcrypt Hashing function is useful in this situation or other encrypting dependencies.

- The array can add duplicates using the add method in the backend.

