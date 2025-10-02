let entries = document.body.querySelectorAll('.book-entry')
for (let entry of entries) {
    entry.addEventListener('click', (event) => {
        entry.classList.toggle('info')
        const display = entry.querySelector('.info-block').style.display
        entry.querySelector('.info-block').style.display = display === 'block' ? 'none' : 'block'
    });
}
