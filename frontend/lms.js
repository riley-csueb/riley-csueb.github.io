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

  login(username, password, update_ui_callback) {
    console.assert(username !== undefined, "username must be defined")
    console.assert(password !== undefined, "username must be defined")
    console.assert(username.length > 0, "username must not be empty")
    console.assert(password.length > 0, "username must not be empty")
    Util.MakeBackendQuery(`login/${username}_${password}`, (data) => {
      if (data.status === 'ok') {
        this.activeUser.username = data.username;
        this.activeUser.loggedIn = true;
        update_ui_callback({
          state: 'loggedin',
          activeUser: this.activeUser,
        })
      }
      else {
        this.activeUser = this.emptyActiveUser()
        update_ui_callback({
          state: 'fail',
          activeUser: this.activeUser,
        })
      }
    })
  }

  logout(update_ui_callback) {
    console.assert(this.activeUser.username !== undefined, "activeUser.username must be defined")
    if (!this.activeUser) {
      update_ui_callback({
        state: 'fail',
        message: 'No active user'
      })
      return;
    }
    Util.MakeBackendQuery(`logout/${this.activeUser.username}`, (data) => {
      if (data.status === 'ok') {
        update_ui_callback({
          state: 'loggedout',
          activeUser: this.activeUser
        })
        this.activeUser = this.emptyActiveUser()
      }
      else {
        update_ui_callback({
          state: 'fail'
        })
      }
    })
  }
  isLoggedin() {
    return this.activeUser.loggedIn;
  }
}
