document.addEventListener('DOMContentLoaded', () => {
    let forumsData = [];
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            forumsData = data.forums;
        })
        .catch(error => console.error('Error fetching forum data:', error));

    const searchBar = document.getElementById('search-bar');
    const searchResults = document.getElementById('search-results');

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchResults.innerHTML = ''; 

        if (searchTerm) {
            const filteredForums = forumsData.filter(forum => 
                forum.name.toLowerCase().includes(searchTerm)
            );

            filteredForums.forEach(forum => {
                const forumItem = document.createElement('div');
                forumItem.classList.add('forum-item');
                forumItem.innerHTML = `
                    <img src="${forum.avatar}" alt="${forum.name} Avatar" class="avatar-icon">
                    <a href="${forum.url}">${forum.name}</a>
                `;
                searchResults.appendChild(forumItem);
            });
        }
    });
});
