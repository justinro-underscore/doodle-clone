class User
{
  //Takes in a string userName; a string password; and a boolean isAdmin
  constructor(userName, password, isAdmin)
  {
    this.userName = userName;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  //getters
  get userName()
  {
    return this.userName;
  }

  get password()
  {
    return this.password;
  }

  get isAdmin()
  {
    this.isAdmin;
  }
}
