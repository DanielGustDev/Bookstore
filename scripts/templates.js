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

// 1. Datenbereinigung & Fallback-Werte
function getCleanBookData(singleBook) {
  return {
    name: singleBook.name || "unknown title",
    author: singleBook.author || "unknown author",
    publishedYear: singleBook.publishedYear || "unknown",
    genre: singleBook.genre || "unknown",
    likes: typeof singleBook.likes === "number" ? singleBook.likes : 0,
    price: getFormattedPrice(singleBook.price),
    likeClass: getLikeClass(singleBook.liked),
    commentsHtml: renderComments(singleBook.comments),
  };
}

// 2. HTML-Teilbereich: Meta-Informationen (Tabelle)
function renderBookMetaTable(book) {
  return `
    <table class="info-table">
      <tr><td><strong>Author</strong></td><td>: ${book.author}</td></tr>
      <tr><td><strong>Published</strong></td><td>: ${book.publishedYear}</td></tr>
      <tr><td><strong>Genre</strong></td><td>: ${book.genre}</td></tr>
    </table>
  `;
}

// 3. HTML-Teilbereich: Like-Sektion
function renderLikeSection(likes, likeClass, bookIndex) {
  return `
    <p class="likes">
      ${likes} 
      <button class="heart-icon ${likeClass}" onclick="toggleLike(${bookIndex})">
        <img src="./assets/icons/heart.svg" alt="like button">
      </button>
    </p>
  `;
}

// 4. HTML-Teilbereich: Kommentar-Sektion (Liste + Formular)
function renderCommentsSection(commentsHtml, bookIndex) {
  return `
    <div class="comments-section">
      <h3>Comments:</h3>
      <div class="comments-list">
        ${commentsHtml}
      </div>
      
      <form class="comment-input-box" onsubmit="addComment(event, ${bookIndex})">
        <input type="text" placeholder="Add your comment ..." required>
        <button type="submit">
          <img src="./assets/icons/send-icon.svg" alt="send button">
        </button>
      </form>
    </div>
  `;
}

// 5. Hauptfunktion: Zusammensetzung der Card-Template
function createBookCardTemplate(singleBook, bookIndex) {
  const book = getCleanBookData(singleBook);

  return `
    <article class="book-card">
      <h2>${book.name}</h2>
      <div class="divider"></div>
      
      <div class="book-cover">
        <img src="./assets/icons/book.svg" alt="${book.name}">
      </div>
      <div class="divider"></div>

      <div class="book-meta">
        <p class="price">${book.price}</p>
        ${renderBookMetaTable(book)}
        ${renderLikeSection(book.likes, book.likeClass, bookIndex)}
      </div>
      <div class="divider"></div>

      ${renderCommentsSection(book.commentsHtml, bookIndex)}
    </article>
  `;
}
