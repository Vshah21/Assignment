const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();

// connection to database
const cn = 'postgres://postgres:test@127.0.0.1:5432/postgres';
const db = pgp(cn);


const app = express()
const port = 3000

// middleware
app.use(cors()); //connect frontend and backend
//Body parser
app.use(express.json());



app.get('/:id', (req, res)=>{
   const { id } = req.params

   db.any("SELECT unnest(favourites) as movietitle from favourite_movies where user_id=$1",[id])
   .then(rows =>{
       res.json(rows)
      
   })
   .catch(error =>{
      res.status(404).json(error)
   })
})


app.post('/signin', (req,res) =>{
   try {
      const { email , password} =req.body

      if(email && password){
         db.any("SELECT * FROM users where email=$1",[email] )
         .then( data =>{
            
            // if password is the same
            if(password == data[0].password){
               
               return res.json(data[0])
            }
            
         })
      }
   } catch (err) {
      console.error(err.message.red);
      res.status(500).send("Server Error");
   }
})


// not implemented in the front-end but functioning using postman
app.post('/register', (req,res) =>{

   try{
      const { firstname , lastname, email, password} =req.body

      if(!firstname || !lastname || !email|| !password ){
         return res.status(400).json('Incorrect form submission')
      }else{

         db.any("INSERT INTO users (firstname, lastname, email,password) VALUES($1, $2, $3, $4)",[firstname,lastname,email,password])
         
         .then( data =>{
            // console.log(data)
            // res.json(data[0])
            res.json("success")
         })
         .catch(err => res.status(400).json('unable to register'))

      }
   } catch (err) {
      console.error(err.message.red);
      res.status(500).send("Server Error");
   }
   
})

// not implemented in the front-end but functioning using postman
app.post('/addmovie', (req,res) =>{

   const { title, id} = req.body

   db.any("select * from favourite_movies where user_id=$1", [id])
   .then( data =>{
     
      //if no users found in the favourite_movies table
      if(data == ''){
         console.log("empty")
         db.any("INSERT INTO favourite_movies (favourites,user_id) VALUES($1, $2)", ['{'+title+'}',id])
         .then( data=> res.json(data[0]))
      }else{
         // if user exists add into the array
         db.any("UPDATE favourite_movies set favourites = array_append(favourites, $1) where user_id= $2 ",[title,id])
         .then( data=> res.json(data[0]))
         console.log("favourites movies updated")
      }
   })

})

app.post('/deletemovie', (req, res)=>{
   const {title, id} = req.body
   db.any("UPDATE favourite_movies set favourites= array_remove(favourites, $1) where user_id=$2", [title, id])
   .then( data=> res.json(data[0]))
         console.log("movie deleted")
         
})

app.listen(port, ()=>{
    console.log(`Example app listening at http:/localhost:${port}`)
})