function setupEventListeners() {
    // Book entry behavior
    let entries = document.body.querySelectorAll('.book-entry')
    console.log(entries)
    for (let entry of entries) {
        entry.querySelectorAll('.cover')[0].addEventListener('click', (event) => {
            // fold other open dom
            let open = [...entries].filter(entry => entry.querySelector('.info-block').style.display === 'block')
            for (let i of open) {
                if (i == entry) continue;
                i.querySelector('.info-block').style.display = 'none'
                i.classList.remove('info')
            }

            // toggle this dom
            entry.classList.toggle('info')
            const display = entry.querySelector('.info-block').style.display
            if (display === 'block') {
                entry.querySelector('.info-block').style.display = 'none'
            }
            else {
                entry.querySelector('.info-block').style.display = 'block'
            }
        });
    }

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
            fetch(`http://127.0.0.1:8000/${query}`).then(res => {
                if (!res.ok) {
                    console.error('invalid response')
                    return
                }
                return res.json();
            }).then(data => {
                console.log("result -> ", data)
            }).catch(err => console.error(`error: ${err}`))
        }
    });
}

/*
 * conf format
 * {
 *   "name": "bookname"
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
    info_block_title.innerText = conf.name;
    const info_block_author = document.createElement('h4')
    info_block_author.innerText = conf.author;

    info_block_.appendChild(info_block_title);
    info_block_.appendChild(info_block_author);

    parent_.appendChild(main_block_);
    parent_.appendChild(info_block_);

    return parent_;
}
