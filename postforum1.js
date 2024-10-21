document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const postTitleInput = document.querySelector('.post-title');
    const postBodyInput = document.querySelector('.post-body');
    const postButton = document.querySelector('.post-button');
    const mainContent = document.querySelector('.main-content');

    // Add styles for the post header layout
    const styles = document.createElement('style');
    styles.textContent = `
        .saved-post {
            background-color: white;
            border: 1px solid #ddd;
            margin-top: 15px;
            margin-bottom: 15px;
            font-size: 12px;
            /* Remove padding-bottom as we'll handle this differently */
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
            /* Create a container for the button */
            overflow: hidden;  /* Contain the floated button */
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

    // Create posts container
    let postsContainer = document.querySelector('.posts-container');
    if (!postsContainer) {
        postsContainer = document.createElement('div');
        postsContainer.className = 'posts-container';
        mainContent.appendChild(postsContainer);
    }

    // Function to display posts
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

    // Function to save post
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

    // Function to delete post
    function deletePost(id) {
        const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        const updatedPosts = posts.filter(post => post.id !== id);
        localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
        displayPosts();
    }

    // Event listeners
    postButton.addEventListener('click', savePost);

    // Handle placeholder text
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

    // Make delete function globally available
    window.deletePost = deletePost;

    // Initial display
    displayPosts();
});