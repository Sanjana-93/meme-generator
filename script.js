document.addEventListener('DOMContentLoaded', () => {
    const templateSelect = document.getElementById('template');

    fetch('https://api.memegen.link/templates')
        .then(response => response.json())
        .then(templates => {
            templates.forEach(template => {
                const option = document.createElement('option');
                option.value = template.id;
                option.textContent = template.name;
                templateSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching templates:', error));
});

document.getElementById('memeForm').addEventListener('submit', event => {
    event.preventDefault();

    const template = document.getElementById('template').value;
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;

    const memeUrl = `https://api.memegen.link/images/${template}/${encodeURIComponent(topText)}/${encodeURIComponent(bottomText)}.png`;

    const memeDisplay = document.getElementById('meme-display');
    memeDisplay.innerHTML = `<img src="${memeUrl}" alt="Generated Meme" class="img-fluid">`;

    saveMeme(memeUrl);
    displayGallery();
});

function saveMeme(url) {
    let memes = JSON.parse(localStorage.getItem('memes')) || [];
    memes.push(url);
    localStorage.setItem('memes', JSON.stringify(memes));
}

function displayGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    const memes = JSON.parse(localStorage.getItem('memes')) || [];
    memes.forEach(url => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `<img src="${url}" class="img-fluid mb-3">`;
        gallery.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', displayGallery);