document.addEventListener('DOMContentLoaded', function() {
    const postTitleInput = document.querySelector('.post-title');
    const postBodyInput = document.querySelector('.post-body');
    const postButton = document.querySelector('.post-button');
    const mainContent = document.querySelector('.main-content');

    const styles = document.createElement('style');
    styles.textContent = `
        .saved-post {
            background-color: white;
            border: 1px solid #ddd;
            margin-top: 15px;
            margin-bottom: 15px;
            font-size: 12px;
        }
        
        .saved-post-header {
            padding: 10px;
            background-color: #f8f8f8;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .saved-post-header h3 {
            margin: 0;
            font-size: 14px;
            color: #333;
        }
        
        .timestamp {
            color: #888;
            font-size: 11px;
        }
        
        .saved-post-body {
            padding: 10px;
            line-height: 1.4;
        }

        .post-footer {
            padding: 0 10px 10px 10px;
            overflow: hidden;
        }
        
        .delete-button {
            background-color: #3b5998;
            color: white;
            border: none;
            padding: 3px 8px;
            cursor: pointer;
            font-size: 12px;
            float: right;
            min-width: 60px;
        }

        .delete-button:hover {
            background-color: #2d4373;
        }

        .posts-container {
            width: 100%;
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(styles);

    let postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) {
        postsContainer = document.createElement('div');
        postsContainer.className = 'posts-container';
        mainContent.appendChild(postsContainer);
    }

    function displayPosts() {
        try {
            const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
            postsContainer.innerHTML = '';
            
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'saved-post';
                
                const date = new Date(post.timestamp);
                const formattedDate = date.toLocaleString();
                
                postElement.innerHTML = `
                    <div class="saved-post-header">
                        <h3>${post.title}</h3>
                        <span class="timestamp">${formattedDate}</span>
                    </div>
                    <div class="saved-post-body">${post.body}</div>
                    <div class="post-footer">
                        <button onclick="deletePost(${post.id})" class="delete-button">Delete</button>
                    </div>
                `;
                
                postsContainer.appendChild(postElement);
            });
        } catch (e) {
            console.error('Error displaying posts:', e);
        }
    }

    function savePost() {
        const title = postTitleInput.innerText;
        const body = postBodyInput.innerText;
        
        if (title.trim() && body.trim() && 
            title !== 'Title' && 
            body !== 'Lorem ipsum or something') {
            
            const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
            
            const newPost = {
                id: Date.now(),
                title: title,
                body: body,
                timestamp: new Date().toISOString()
            };
            
            posts.unshift(newPost);
            localStorage.setItem('forumPosts', JSON.stringify(posts));
            
            postTitleInput.innerText = 'Title';
            postBodyInput.innerText = 'Lorem ipsum or something';
            
            displayPosts();
        }
    }

    function deletePost(id) {
        const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        const updatedPosts = posts.filter(post => post.id !== id);
        localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
        displayPosts();
    }

    postButton.addEventListener('click', savePost);

    [postTitleInput, postBodyInput].forEach(element => {
        element.addEventListener('focus', function() {
            if (this.innerText === 'Title' || 
                this.innerText === 'Lorem ipsum or something') {
                this.innerText = '';
            }
        });

        element.addEventListener('blur', function() {
            if (!this.innerText.trim()) {
                this.innerText = this === postTitleInput ? 'Title' : 'Lorem ipsum or something';
            }
        });
    });

    window.deletePost = deletePost;

    displayPosts();
});

document.querySelector('.post-button').addEventListener('click', function() {
    const postTitle = document.querySelector('.post-title').textContent.trim();
    const postBody = document.querySelector('.post-body').textContent.trim();

    if (postTitle === '' || postBody === '') {
        alert('Please enter both a title and body for the post.');
        return;
    }

    const newPost = document.createElement('div');
    newPost.classList.add('post-area');

    if (document.body.classList.contains('dark-mode')) {
        newPost.style.backgroundColor = '#2d2d2d';
        newPost.style.color = '#fff';
        newPost.style.borderColor = '#404040';
    } else {
        newPost.style.backgroundColor = 'white';
        newPost.style.color = 'black';
        newPost.style.borderColor = '#ddd';
    }

    newPost.innerHTML = `<div class="post-title">${postTitle}</div>
                         <div class="post-body">${postBody}</div>`;

    document.querySelector('.main-content').appendChild(newPost);

    document.querySelector('.post-title').textContent = '';
    document.querySelector('.post-body').textContent = '';
});
