let modalOpenTime = Date.now();

function closeCovers() {
  let entries = document.body.querySelectorAll('.book-entry')
  for (let entry of entries) {
    entry.querySelector('.info-block').style.display = 'none'
    entry.classList.remove('info')
  }
}

function setupCoverEvents(cover_dom) {
  const modal = document.body.querySelector('#book-info-modal-container')
  cover_dom.addEventListener('click', (event) => {
    // toggle this dom
    const display = modal.style.display
    if (display === 'block') {
      modal.style.display = 'none'
    }
    else {
      modal.style.display = 'block'
      modal.querySelector('#title').innerText = cover_dom.dataset.title;
      modal.querySelector('#author').innerText = cover_dom.dataset.author;
      modal.querySelector('#count').innerText = cover_dom.dataset.count;
      modal.querySelector('#isbn').innerText = cover_dom.dataset.isbn
      modal.querySelector('#cover_img').setAttribute('src', cover_dom.dataset.coverurl)
    }
  });
}

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

  // console.log(conf)
    parent_.setAttribute('data-title', conf.title)
    parent_.setAttribute('data-author', conf.author)
    parent_.setAttribute('data-coverurl', conf.coverurl)
    parent_.setAttribute('data-count', conf.count)
    parent_.setAttribute('data-isbn', conf.isbn)

    parent_.appendChild(main_block_);
    // parent_.appendChild(info_block_);

    return parent_;
}
