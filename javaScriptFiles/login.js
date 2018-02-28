function login() {
    let inputUsername = document.getElementById("username").value;
    let inputPassword = document.getElementById("password").value;
    if(validateLogin(inputUsername, inputPassword)){
       location.href = 'index.html'; //maybe rename login and index html files
    }
    else{
        alert("Incorrect username/password");
    }
}