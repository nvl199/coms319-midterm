document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json') 
        .then(response => response.json())
        .then(data => {
            const forumsList = document.getElementById('forums-list');
            data.forums.forEach(forum => {
                let listItem = document.createElement('li');
                listItem.innerHTML = `<img src="${forum.avatar}" alt="${forum.name} Avatar" class="avatar-icon"> <a href="${forum.url}">${forum.name}</a>`;
                forumsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading avatars:', error));
});
