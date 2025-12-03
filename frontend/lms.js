class LibraryManagementSystem {
  constructor() {
    this.activeUser = this.emptyActiveUser()
  }

  emptyActiveUser() {
    return {
      loggedIn: false,
      username: undefined
    }
  }

  isLoggedin() {
    return this.activeUser.loggedIn;
  }
}
