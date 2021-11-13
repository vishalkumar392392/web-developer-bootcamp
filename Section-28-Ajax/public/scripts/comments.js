const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchComments() {
  const postId = loadCommentsBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const data = await response.json();
  const commentsListElements = createCommentList(data);
  commentSectionElement.innerHTML = "";
  commentSectionElement.appendChild(commentsListElements);
}

async function saveComment(event) {
  event.preventDefault();
  const title = commentTitleElement.value;
  const text = commentTextElement.value;
  const postId = loadCommentsBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ title: title, text: text }),
    headers:{
      'Content-Type':'application/json'
    }
  });
  fetchComments();
}

loadCommentsBtnElement.addEventListener("click", fetchComments);
commentsFormElement.addEventListener("submit", saveComment);
