// @ts-nocheck

function createSingleCommentTemplate(singleComment) {
  if (!singleComment) {
    return "";
  }

  const authorName = getAuthorName(singleComment);
  const commentText = getCommentText(singleComment);

  return `
    <div class="comment-item">
      <p class="comment-author">[${authorName}]: </p>
      <p class="comment-text">${commentText}</p>
    </div>
  `;
}

function createBookCardTemplate(singleBook, bookIndex) {
  let bookName = singleBook.name;
  if (!bookName) {
    bookName = "unknown title";
  }

  let bookAuthor = singleBook.author;
  if (!bookAuthor) {
    bookAuthor = "unknown author";
  }

  let publishedYear = singleBook.publishedYear;
  if (!publishedYear) {
    publishedYear = "unknown";
  }

  let bookGenre = singleBook.genre;
  if (!bookGenre) {
    bookGenre = "unknown";
  }

  let bookLikes = singleBook.likes;
  if (typeof bookLikes !== "number") {
    bookLikes = 0;
  }

  const formattedPrice = getFormattedPrice(singleBook.price);
  const likeClass = getLikeClass(singleBook.liked);
  const commentsHtml = renderComments(singleBook.comments);

  return `
    <article class="book-card">
      <h2>${bookName}</h2>
      <div class="divider"></div>
      
      <div class="book-cover">
        <img src="./assets/icons/book.svg" alt="${bookName}">
      </div>
      <div class="divider"></div>

      <div class="book-meta">
        <div class="price-like-row">
          <p class="price">${formattedPrice}</p>
          <p class="likes">
            ${bookLikes} 
            <button class="heart-icon ${likeClass}" onclick="toggleLike(${bookIndex})"><img src="./assets/icons/heart.svg" alt="like button"></button>
          </p>
        </div>
        
        <table class="info-table">
          <tr><td><strong>Author</strong></td><td>: ${bookAuthor}</td></tr>
          <tr><td><strong>Published</strong></td><td>: ${publishedYear}</td></tr>
          <tr><td><strong>Genre</strong></td><td>: ${bookGenre}</td></tr>
        </table>
      </div>
      <div class="divider"></div>

      <div class="comments-section">
        <h3>Comments:</h3>
        <div class="comments-list">
          ${commentsHtml}
        </div>
        
        <form class="comment-input-box" onsubmit="addComment(event, ${bookIndex})">
          <input type="text" placeholder="Add your comment ..." required>
          <button type="submit"><img src="./assets/icons/send-icon.svg" alt="send button"></button>
        </form>
      </div>
    </article>
  `;
}
