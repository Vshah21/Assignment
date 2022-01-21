
const movie = document.getElementById("movie"),
      movieBtn = document.getElementById("search-movie"),
      root =document.getElementById("root"),
      container= document.getElementById("container");


        let getID = sessionStorage.getItem("id")
        let getFirstName = sessionStorage.getItem("firstname")
        console.log(getID);
        console.log(getFirstName);

        let html = `
        
        <form action="" method="post" id="form">
            <div class="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" required>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required>
                    
                <button id="login-btn" type="submit">Login</button>

            </div>
        </form>
      `;
        
        root.innerHTML = html;
    
        const formElement = document.getElementById("form")
        const login =document.getElementById("login-btn");

     
        login.addEventListener("click",(e)=>{
            e.preventDefault();
            username= formElement.username.value
            password= formElement.password.value
            
            
            fetch('http://localhost:3000/signin', {
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    email: username,
                    password: password
                  })
                })
                  .then(response => response.json())
                  .then(user => {
                      alert("Successfully Logged In!")
                      const id = user.id;
                      const firstname= document.createElement("h1")
                      firstname.innerHTML=user.firstname +" Favourite Movies"

                      container.prepend(firstname);
                      
                      getapi(id);
                      document.querySelector("#form").classList.add("active");

                      sessionStorage.setItem("id", id);
                      sessionStorage.setItem("firstname",user.firstname)

                      const signOutBtn = document.createElement('button'); 
                      signOutBtn.classList.add("sign_out-btn");
                      signOutBtn.innerHTML="Sign Out"
                      root.appendChild(signOutBtn);
                      signOutBtn.addEventListener("click",(e)=>{
                          e.preventDefault();
                          sessionStorage.removeItem("firstname")
                          sessionStorage.removeItem("id")
                     
                         location.reload();
                        
                      })
                  })
                  .catch(() => alert("Incorrect Login details"));

        })

    
        const getMovies = async (id) => {
            
            const response = await fetch("http://localhost:3000/"+id);
            const moviedata = await response.json();
            return moviedata
        }

        arr = [];
        async function getapi(id) {
        
            await getMovies(id)
            .then((data)=>{
                data.forEach( (title)=>{
                    arr.push(title.movietitle);
                })
            })
            
            showData(arr)
        }

        const showData = (array) => {
            array.forEach((item)=>{
            
                const movieContainer = document.createElement('div'),
                    movieHeading = document.createElement('h2'),
                    moviedesc = document.createElement('p'),
                    movieposter = document.createElement('img'),
                    removeBtn = document.createElement('button'); 

                fetch("http://www.omdbapi.com/?apikey=81ad03b3&i="+item)
                .then((response)=> response.json())
                .then((data) => {
                            movieHeading.innerHTML = data['Title']
                            moviedesc.innerHTML = data['Plot']
                        
                }).catch(err => console.log(err));
                    
                fetch(" http://img.omdbapi.com/?apikey=81ad03b3&i="+item)
                    .then((data) => 
                    movieposter.setAttribute('src',data['url'])
                )

                removeBtn.classList.add("remove_btn");
                removeBtn.setAttribute("id", item);
                removeBtn.innerHTML="Remove"
                movieContainer.classList.add('movie_container')
                movieContainer.appendChild(movieposter);
                movieContainer.appendChild(movieHeading);
                movieContainer.appendChild(moviedesc);
                movieContainer.appendChild(removeBtn);
                
                root.appendChild(movieContainer);
            })
           
            const onClick = (event) => {
                const id = event.target.id;
                if(id.includes("tt")){
                    console.log(id);
                    fetch('http://localhost:3000/deletemovie', {
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    title: id,
                    id: getID
                  })
                })
                  .then(response => response.json())
                  .then(data => {
                    alert(`${id} Removed`)
                    })
                    .catch(err => console.log(err));
                }
            }
            window.addEventListener('click', onClick);
            
            
        }
        


     