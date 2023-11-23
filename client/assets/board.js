function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";
    post.id = data['id']

    const header = document.createElement("h2");
    header.textContent = data["title"];
    post.appendChild(header);

    const content = document.createElement("p");
    content.textContent = data["content"];
    post.appendChild(content);

    const deleteDiv = document.createElement('div');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.id = 'loginButton';
    deleteDiv.classList.add('board-btn');
    post.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteButton);

    deleteButton.addEventListener('click', async (e) => {
        try {
            console.log(e)
            const postId = (e.target.parentNode.id);
            
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'DELETE',
            });
    
            if (response.status === 204) {
                console.log('Post deleted successfully');
                location.reload()
            } else if (response.status === 404) {
                console.error('Post not found');
            } else {
                console.error('Unexpected error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })

    return post;
}

document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            content: form.get("content")
        })
    }

    const result = await fetch("http://localhost:3000/posts", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

async function loadPosts () {

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/posts", options);

    if (response.status == 200) {
        const posts = await response.json();
        console.log(posts)
    
        const container = document.getElementById("posts");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }

}

document.getElementById('logout').addEventListener('click', async () => {
    const options = {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };
    const response = await fetch('http://localhost:3000/users/logout', options);
    const data = await response.json();
  
    if (response.status === 200) {
      localStorage.removeItem('token');
      window.location.assign('./login.html');
    } else {
      alert(data.error);
    }
  });

loadPosts();
