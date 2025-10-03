function setupEventListeners() {
    let entries = document.body.querySelectorAll('.book-entry')
    console.log(entries)
    for (let entry of entries) {
        entry.addEventListener('click', (event) => {
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
}
