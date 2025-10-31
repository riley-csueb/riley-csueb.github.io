let loggedIn = false;

/*  Utility function for making queryies to the backend fastapi server
 *    query     - the actual query (this should be the endpoint with whatever information required)
 *    onreceive - callback function pointer, this is called with the response when/if it is received
 */
function makeQuery(query, onreceive, onerror) {
    fetch(`http://127.0.0.1:8001/${query}`).then(res => {
        if (!res.ok) {
            console.error('invalid response')
            return
        }
        return res.json();
    }).then(data => {
        onreceive(data);
    }).catch(err => {
      if (onerror) {
        onerror(err)
      }
    })
}

function closeCovers() {
  let entries = document.body.querySelectorAll('.book-entry')
  for (let entry of entries) {
    entry.querySelector('.info-block').style.display = 'none'
    entry.classList.remove('info')
  }
}

function setupCoverEvents(cover_dom) {
  cover_dom.addEventListener('click', (event) => {
    closeCovers()

      // toggle this dom
      cover_dom.classList.toggle('info')
      const display = cover_dom.querySelector('.info-block').style.display
      if (display === 'block') {
          cover_dom.querySelector('.info-block').style.display = 'none'
      }
      else {
          cover_dom.querySelector('.info-block').style.display = 'block'
      }
  });
}

function setupSearchEventListener() {
    // Search bar behavior
    let searchbar = document.body.querySelector('#search-bar')
    let filterName = document.body.querySelector('#filter-name')
    let filterAuthor = document.body.querySelector('#filter-author')
    let filterLength = document.body.querySelector('#filter-length')
    searchbar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let query = ''
            if (filterName.checked == true) {
                query = `search/name/${searchbar.value}`
            }
            else if (filterAuthor.checked == true) {
                query = `search/author/${searchbar.value}`
            }
            else if (filterLength.checked == true) {
                console.log('length search unimplemented')
            }

            console.log(query)
            makeQuery(query, (data) => {
                console.log(data)
            })
        }
    });
}

function setupLoginEventListeners() {
    // Login Behavior
    let usernameField = document.body.querySelector('#login-username')
    let passwordField = document.body.querySelector('#login-password')
    let loginBtn      = document.body.querySelector('#login-btn')
    let loginNotif    = document.body.querySelector('#login-notif')
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (!loggedIn) {
            let query = `login/${usernameField.value}_${passwordField.value}`

            makeQuery(query, (data) => {
                if (data.status === 'ok') {
                    loginBtn.innerText = `Logout`;
                    loggedIn = true;
                    loginNotif.innerText = 'Logged in!'
                    loggedInUsername = data.username;
                    console.log(data.books)
                    setTimeout(() => {
                        loginNotif.innerText = `Hello ${loggedInUsername}`
                    }, 1000);
                }
                else {
                  loginNotif.innerText = 'Invalid credentials'
                    setTimeout(() => {
                        loginNotif.innerText = ''
                    }, 1000);
                }
            })
        }
        else {
            loginBtn.innerText = `Login`;
            loggedIn = false;
            loginNotif.innerText = 'Logged out!'
            setTimeout(() => {
                loginNotif.innerText = ``
            }, 1000);
        }
    })
}

/*
 * conf format
 * {
 *   "title": "bookname"
 *   "coverurl": "url"
 * }
 *
 * resulting dom
 * <div class="book-entry">
 *   <div class="main-block">
 *      <img class="cover" src={name}>
 *   </div>
 *   <div class="info-block">
 *      <h3>{title}</h3>
 *      <h4>{author}</h4>
 *   </div>
 * </div>
 */
function createBookEntryDOM(conf) {
    const parent_ = document.createElement('div')
    parent_.classList.add('book-entry')

    // main-block dom
    const main_block_ = document.createElement('div')
    main_block_.classList.add('main-block')
    // const main_block_info = document.createElement('div')
    // main_block_info.classList.add('info')
    const main_block_cover = document.createElement('img')
    main_block_cover.classList.add('cover')
    main_block_cover.setAttribute('src', conf.coverurl)

    // main_block_.appendChild(main_block_info);
    main_block_.appendChild(main_block_cover);

    // info-block dom
    const info_block_ = document.createElement('div')
    info_block_.classList.add('info-block')
    const info_block_title = document.createElement('h3')
    info_block_title.innerText = conf.title;
    const info_block_author = document.createElement('h4')
    info_block_author.innerText = conf.author;
    const info_block_return_btn = document.createElement('button')
    info_block_return_btn.addEventListener('click', (e) => {
    });
    info_block_return_btn.innerText = 'Return'

    info_block_.appendChild(info_block_title);
    info_block_.appendChild(info_block_author);
    info_block_.appendChild(info_block_return_btn);

    parent_.appendChild(main_block_);
    parent_.appendChild(info_block_);

    return parent_;
}
