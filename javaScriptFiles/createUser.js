function createUser() {
    "use strict";
    let inputUsername = document.getElementById("username").value;
    let inputPassword = document.getElementById("password").value;
    let inputIsAdmin = false;
    //make sure there is a username and password
    if(inputUsername === ""){
        alert("You need a username");
        return false;
    }
    if(inputPassword === ""){
        alert("You need a password");
        return false;
    }
    if($('#isAdmin').is(':checked')){
        inputIsAdmin = true;
    }
    //make sure the usename isn't already taken
    if(getUser(inputUsername) != undefined){
        alert("The username is already taken");
        return false;
    }
    //create user object
    let inputUserObject = {username:inputUsername, password:inputPassword, isAdmin:inputIsAdmin};
    //post it to the google sheets
    postUser(inputUserObject);
    //tell the user that the account was created
    alert("User " + inputUsername + " created!");
    //go back to the login page after successful create user
    location.href = 'login.html';
}